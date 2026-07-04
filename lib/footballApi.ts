import { Match, MatchStatus, StandingsTable } from "@/types";

/**
 * Клиент для football-data.org (v4).
 * Ключ API берётся ТОЛЬКО из переменных окружения на сервере — см. .env.local.
 * Никогда не импортируйте этот файл в клиентские компоненты ("use client").
 */

const API_BASE = "https://api.football-data.org/v4";

// Коды турниров football-data.org, которые показываем на лендинге.
const TOURNAMENTS: { code: string; name: string }[] = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "SA", name: "Serie A" },
  { code: "BL1", name: "Bundesliga" },
];

function getApiKey(): string {
  const key = process.env.FOOTBALL_API_KEY;
  if (!key) {
    throw new Error("FOOTBALL_API_KEY is not set in environment variables");
  }
  return key;
}

async function apiFetch(path: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "X-Auth-Token": getApiKey() },
    // Next.js server-side fetch; кэшируем сами через lib/cache.ts,
    // поэтому здесь всегда берём свежие данные с апстрима.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Football API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function mapStatus(apiStatus: string): MatchStatus {
  switch (apiStatus) {
    case "IN_PLAY":
    case "PAUSED":
      return "live";
    case "FINISHED":
      return "finished";
    default:
      return "upcoming";
  }
}

// Минимальные типы для сырого ответа football-data.org — только нужные нам поля.
interface RawMatch {
  id: number;
  utcDate: string;
  status: string;
  minute?: number | null;
  competition: { name: string };
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: {
    fullTime: { home: number | null; away: number | null };
  };
}

interface RawStandingsResponse {
  standings: Array<{
    type: string;
    table: Array<{
      position: number;
      team: { name: string };
      playedGames: number;
      won: number;
      draw: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      points: number;
    }>;
  }>;
}

function mapMatch(raw: RawMatch): Match {
  return {
    id: String(raw.id),
    tournament: raw.competition?.name ?? "Unknown",
    date: raw.utcDate,
    status: mapStatus(raw.status),
    homeTeam: raw.homeTeam?.name ?? "TBD",
    awayTeam: raw.awayTeam?.name ?? "TBD",
    homeScore: raw.score?.fullTime?.home ?? null,
    awayScore: raw.score?.fullTime?.away ?? null,
    minute: raw.minute ?? null,
  };
}

export async function fetchMatchesFromApi(): Promise<Match[]> {
  const data = (await apiFetch(`/matches`)) as { matches: RawMatch[] };
  return (data.matches ?? []).map(mapMatch);
}

export async function fetchStandingsFromApi(): Promise<StandingsTable[]> {
  const results: StandingsTable[] = [];

  for (const tournament of TOURNAMENTS) {
    const data = (await apiFetch(
      `/competitions/${tournament.code}/standings`
    )) as RawStandingsResponse;

    const total = data.standings?.find((s) => s.type === "TOTAL");
    if (!total) continue;

    results.push({
      tournament: tournament.name,
      rows: total.table.map((row) => ({
        position: row.position,
        team: row.team.name,
        played: row.playedGames,
        win: row.won,
        draw: row.draw,
        loss: row.lost,
        goalsFor: row.goalsFor,
        goalsAgainst: row.goalsAgainst,
        points: row.points,
      })),
    });
  }

  return results;
}

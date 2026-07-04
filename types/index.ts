export type MatchStatus = "live" | "upcoming" | "finished";

export interface Match {
  id: string;
  tournament: string;
  date: string; // ISO string
  status: MatchStatus;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  minute: number | null; // only relevant when status === "live"
}

export interface StandingRow {
  position: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface StandingsTable {
  tournament: string;
  rows: StandingRow[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string; // ISO string
  source: string;
}

export type DataSource = "api" | "mock" | "cache";

export interface ApiEnvelope<T> {
  data: T;
  source: DataSource;
  updatedAt: string; // ISO string
  error?: string;
}

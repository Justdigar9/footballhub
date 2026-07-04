import { Match, NewsItem, StandingsTable } from "@/types";

function isoOffset(minutes: number): string {
  return new Date(Date.now() + minutes * 60_000).toISOString();
}

export const mockMatches: Match[] = [
  {
    id: "m1",
    tournament: "Premier League",
    date: isoOffset(-40),
    status: "live",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeScore: 2,
    awayScore: 1,
    minute: 63,
  },
  {
    id: "m2",
    tournament: "La Liga",
    date: isoOffset(-20),
    status: "live",
    homeTeam: "Real Madrid",
    awayTeam: "Sevilla",
    homeScore: 1,
    awayScore: 1,
    minute: 41,
  },
  {
    id: "m3",
    tournament: "Premier League",
    date: isoOffset(120),
    status: "upcoming",
    homeTeam: "Liverpool",
    awayTeam: "Manchester City",
    homeScore: null,
    awayScore: null,
    minute: null,
  },
  {
    id: "m4",
    tournament: "Serie A",
    date: isoOffset(180),
    status: "upcoming",
    homeTeam: "Juventus",
    awayTeam: "Inter",
    homeScore: null,
    awayScore: null,
    minute: null,
  },
  {
    id: "m5",
    tournament: "La Liga",
    date: isoOffset(-500),
    status: "finished",
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    homeScore: 3,
    awayScore: 0,
    minute: null,
  },
  {
    id: "m6",
    tournament: "Bundesliga",
    date: isoOffset(-1000),
    status: "finished",
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    homeScore: 2,
    awayScore: 2,
    minute: null,
  },
  {
    id: "m7",
    tournament: "Premier League",
    date: isoOffset(-1400),
    status: "finished",
    homeTeam: "Tottenham",
    awayTeam: "Newcastle",
    homeScore: 1,
    awayScore: 2,
    minute: null,
  },
  {
    id: "m8",
    tournament: "Serie A",
    date: isoOffset(300),
    status: "upcoming",
    homeTeam: "AC Milan",
    awayTeam: "Napoli",
    homeScore: null,
    awayScore: null,
    minute: null,
  },
];

export const mockStandings: StandingsTable[] = [
  {
    tournament: "Premier League",
    rows: [
      { position: 1, team: "Arsenal", played: 30, win: 22, draw: 5, loss: 3, goalsFor: 61, goalsAgainst: 22, points: 71 },
      { position: 2, team: "Manchester City", played: 30, win: 21, draw: 6, loss: 3, goalsFor: 68, goalsAgainst: 25, points: 69 },
      { position: 3, team: "Liverpool", played: 30, win: 20, draw: 7, loss: 3, goalsFor: 64, goalsAgainst: 28, points: 67 },
      { position: 4, team: "Chelsea", played: 30, win: 17, draw: 6, loss: 7, goalsFor: 55, goalsAgainst: 34, points: 57 },
      { position: 5, team: "Newcastle", played: 30, win: 15, draw: 8, loss: 7, goalsFor: 50, goalsAgainst: 38, points: 53 },
      { position: 6, team: "Tottenham", played: 30, win: 14, draw: 7, loss: 9, goalsFor: 52, goalsAgainst: 42, points: 49 },
    ],
  },
  {
    tournament: "La Liga",
    rows: [
      { position: 1, team: "Real Madrid", played: 29, win: 23, draw: 4, loss: 2, goalsFor: 66, goalsAgainst: 21, points: 73 },
      { position: 2, team: "Barcelona", played: 29, win: 21, draw: 5, loss: 3, goalsFor: 70, goalsAgainst: 27, points: 68 },
      { position: 3, team: "Atletico Madrid", played: 29, win: 18, draw: 7, loss: 4, goalsFor: 54, goalsAgainst: 26, points: 61 },
      { position: 4, team: "Sevilla", played: 29, win: 14, draw: 8, loss: 7, goalsFor: 44, goalsAgainst: 35, points: 50 },
    ],
  },
  {
    tournament: "Serie A",
    rows: [
      { position: 1, team: "Inter", played: 30, win: 24, draw: 4, loss: 2, goalsFor: 63, goalsAgainst: 18, points: 76 },
      { position: 2, team: "Juventus", played: 30, win: 19, draw: 8, loss: 3, goalsFor: 48, goalsAgainst: 24, points: 65 },
      { position: 3, team: "AC Milan", played: 30, win: 18, draw: 6, loss: 6, goalsFor: 55, goalsAgainst: 32, points: 60 },
      { position: 4, team: "Napoli", played: 30, win: 15, draw: 9, loss: 6, goalsFor: 49, goalsAgainst: 33, points: 54 },
    ],
  },
];

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title: "Арсенал выходит вперёд в лондонском дерби",
    summary: "Голы в первом тайме позволили хозяевам захватить контроль над игрой против Челси на Эмirates.",
    date: isoOffset(-40),
    source: "FootballHub",
  },
  {
    id: "n2",
    title: "Реал Мадрид готовится к решающему отрезку сезона",
    summary: "Тренерский штаб ротирует состав перед серией из трёх матчей за девять дней.",
    date: isoOffset(-300),
    source: "FootballHub",
  },
  {
    id: "n3",
    title: "Интер сохраняет отрыв на вершине Серии А",
    summary: "Победная серия миланцев продолжается на фоне борьбы преследователей за второе место.",
    date: isoOffset(-600),
    source: "FootballHub",
  },
  {
    id: "n4",
    title: "Трансферное окно: главные слухи недели",
    summary: "Несколько топ-клубов уже готовят предложения к летнему трансферному периоду.",
    date: isoOffset(-900),
    source: "FootballHub",
  },
];

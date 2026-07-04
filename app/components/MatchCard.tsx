import { Match } from "@/types";

function formatKickoff(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const isToday = d.toDateString() === today.toDateString();
  const time = d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `Сегодня, ${time}`;
  return `${d.toLocaleDateString("ru-RU", { day: "2-digit", month: "short" })}, ${time}`;
}

export function MatchCard({ match }: { match: Match }) {
  const { tournament, status, homeTeam, awayTeam, homeScore, awayScore, minute, date } = match;

  return (
    <div className="rounded-lg border border-line bg-pitch-800/60 p-4 transition-colors hover:border-accent/50">
      <div className="mb-3 flex items-center justify-between text-xs text-chalk/50">
        <span>{tournament}</span>
        {status === "live" ? (
          <span className="flex items-center gap-1.5 text-live">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-live" />
            {minute != null ? `${minute}'` : "LIVE"}
          </span>
        ) : (
          <span>{status === "upcoming" ? formatKickoff(date) : "Матч завершён"}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="flex-1 truncate text-base font-medium text-chalk sm:text-lg">
          {homeTeam}
        </span>

        {status === "upcoming" ? (
          <span className="scoreboard-num shrink-0 font-mono text-sm text-chalk/50">vs</span>
        ) : (
          <span className="scoreboard-num shrink-0 font-display text-2xl tracking-wider text-accent sm:text-3xl">
            {homeScore} : {awayScore}
          </span>
        )}

        <span className="flex-1 truncate text-right text-base font-medium text-chalk sm:text-lg">
          {awayTeam}
        </span>
      </div>
    </div>
  );
}

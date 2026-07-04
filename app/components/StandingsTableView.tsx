import { StandingsTable } from "@/types";

export function StandingsTableView({ table }: { table: StandingsTable }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-pitch-800/60">
      <div className="border-b border-line px-4 py-3">
        <h3 className="font-display text-xl tracking-wide text-chalk">{table.tournament}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-chalk/40">
              <th className="px-4 py-2 font-normal">#</th>
              <th className="px-2 py-2 font-normal">Команда</th>
              <th className="px-2 py-2 text-center font-normal">И</th>
              <th className="px-2 py-2 text-center font-normal">В</th>
              <th className="px-2 py-2 text-center font-normal">Н</th>
              <th className="px-2 py-2 text-center font-normal">П</th>
              <th className="px-2 py-2 text-center font-normal">РМ</th>
              <th className="px-4 py-2 text-center font-normal">Очки</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.team} className="scoreboard-num border-t border-line/60">
                <td className="px-4 py-2 text-chalk/50">{row.position}</td>
                <td className="px-2 py-2 font-medium text-chalk">{row.team}</td>
                <td className="px-2 py-2 text-center text-chalk/70">{row.played}</td>
                <td className="px-2 py-2 text-center text-chalk/70">{row.win}</td>
                <td className="px-2 py-2 text-center text-chalk/70">{row.draw}</td>
                <td className="px-2 py-2 text-center text-chalk/70">{row.loss}</td>
                <td className="px-2 py-2 text-center text-chalk/70">
                  {row.goalsFor - row.goalsAgainst > 0 ? "+" : ""}
                  {row.goalsFor - row.goalsAgainst}
                </td>
                <td className="px-4 py-2 text-center font-display text-lg text-accent">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

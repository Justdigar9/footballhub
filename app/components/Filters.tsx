"use client";

interface FiltersProps {
  tournaments: string[];
  selectedTournament: string;
  onTournamentChange: (t: string) => void;
  selectedDate: string;
  onDateChange: (d: string) => void;
}

export function Filters({
  tournaments,
  selectedTournament,
  onTournamentChange,
  selectedDate,
  onDateChange,
}: FiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="tournament-filter" className="text-sm text-chalk/60">
          Турнир
        </label>
        <select
          id="tournament-filter"
          value={selectedTournament}
          onChange={(e) => onTournamentChange(e.target.value)}
          className="rounded-md border border-line bg-pitch-900 px-3 py-1.5 text-sm text-chalk focus:border-accent"
        >
          <option value="all">Все турниры</option>
          {tournaments.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="date-filter" className="text-sm text-chalk/60">
          Дата
        </label>
        <input
          id="date-filter"
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="rounded-md border border-line bg-pitch-900 px-3 py-1.5 text-sm text-chalk focus:border-accent [color-scheme:dark]"
        />
        {selectedDate && (
          <button
            onClick={() => onDateChange("")}
            className="text-xs text-chalk/50 underline hover:text-accent"
          >
            сбросить
          </button>
        )}
      </div>
    </div>
  );
}

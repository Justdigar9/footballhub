import { Match } from "@/types";
import { MatchCard } from "./MatchCard";
import { UpdatedBadge } from "./UpdatedBadge";
import { DataSource } from "@/types";

interface MatchSectionProps {
  id: string;
  title: string;
  matches: Match[];
  emptyLabel: string;
  updatedAt: string | null;
  source: DataSource | null;
  isLoading: boolean;
}

export function MatchSection({
  id,
  title,
  matches,
  emptyLabel,
  updatedAt,
  source,
  isLoading,
}: MatchSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-8">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-3xl tracking-wide text-chalk sm:text-4xl">{title}</h2>
        <UpdatedBadge updatedAt={updatedAt} source={source} />
      </div>

      {isLoading && matches.length === 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-pitch-800/40" />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-sm text-chalk/50">
          {emptyLabel}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      )}
    </section>
  );
}

import { DataSource } from "@/types";

function formatTime(iso: string | null): string {
  if (!iso) return "—:—";
  const d = new Date(iso);
  return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function UpdatedBadge({
  updatedAt,
  source,
}: {
  updatedAt: string | null;
  source: DataSource | null;
}) {
  const isMock = source === "mock";

  return (
    <div className="flex items-center gap-2 text-xs text-chalk/50">
      <span className="scoreboard-num font-mono">
        Обновлено: {formatTime(updatedAt)}
      </span>
      {isMock && (
        <span className="rounded-sm border border-accent/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
          Тестовые данные
        </span>
      )}
    </div>
  );
}

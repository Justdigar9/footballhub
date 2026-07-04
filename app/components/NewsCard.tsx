import { NewsItem } from "@/types";

export function NewsCard({ item }: { item: NewsItem }) {
  const d = new Date(item.date);
  const formatted = d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long" });

  return (
    <article className="rounded-lg border border-line bg-pitch-800/60 p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-chalk/40">
        <span>{item.source}</span>
        <span>{formatted}</span>
      </div>
      <h3 className="mb-1 font-display text-xl leading-tight tracking-wide text-chalk">
        {item.title}
      </h3>
      <p className="text-sm text-chalk/70">{item.summary}</p>
    </article>
  );
}

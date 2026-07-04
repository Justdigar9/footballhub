"use client";

import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Filters } from "./components/Filters";
import { MatchSection } from "./components/MatchSection";
import { StandingsTableView } from "./components/StandingsTableView";
import { NewsCard } from "./components/NewsCard";
import { ErrorBanner } from "./components/ErrorBanner";
import { useAutoRefresh } from "@/lib/useAutoRefresh";
import { Match, NewsItem, StandingsTable } from "@/types";

export default function Home() {
  const matchesState = useAutoRefresh<Match[]>("/api/matches");
  const standingsState = useAutoRefresh<StandingsTable[]>("/api/standings");
  const newsState = useAutoRefresh<NewsItem[]>("/api/news");

  const [tournament, setTournament] = useState("all");
  const [date, setDate] = useState("");

  const allMatches = matchesState.data ?? [];

  const tournaments = useMemo(
    () => Array.from(new Set(allMatches.map((m) => m.tournament))).sort(),
    [allMatches]
  );

  const filtered = useMemo(() => {
    return allMatches.filter((m) => {
      if (tournament !== "all" && m.tournament !== tournament) return false;
      if (date) {
        const matchDate = new Date(m.date).toISOString().slice(0, 10);
        if (matchDate !== date) return false;
      }
      return true;
    });
  }, [allMatches, tournament, date]);

  const live = filtered.filter((m) => m.status === "live");
  const upcoming = filtered
    .filter((m) => m.status === "upcoming")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const finished = filtered
    .filter((m) => m.status === "finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const liveCount = allMatches.filter((m) => m.status === "live").length;

  return (
    <main className="min-h-screen font-body">
      <Header />

      {/* Hero: живое табло — самое характерное для футбольного хаба состояние */}
      <section className="border-b border-line/60 bg-pitch-lines bg-pitch-900/40 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 flex items-center gap-2 text-live">
            <span className="live-dot h-2 w-2 rounded-full bg-live" />
            <span className="text-sm font-medium uppercase tracking-widest">
              {liveCount > 0 ? `${liveCount} матча в прямом эфире` : "Сейчас нет live-матчей"}
            </span>
          </div>
          <h1 className="font-display text-5xl leading-none tracking-wide text-chalk sm:text-7xl">
            СЧЁТ. РАСПИСАНИЕ.{" "}
            <span className="text-accent">ТАБЛИЦЫ.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-chalk/60 sm:text-base">
            Все главные турниры в одном месте. Обновляется каждые пять минут — сами не нажимайте F5.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(matchesState.error || standingsState.error) && (
          <div className="pt-6">
            <ErrorBanner message={matchesState.error ?? standingsState.error ?? ""} />
          </div>
        )}

        <div className="pt-6">
          <Filters
            tournaments={tournaments}
            selectedTournament={tournament}
            onTournamentChange={setTournament}
            selectedDate={date}
            onDateChange={setDate}
          />
        </div>

        <MatchSection
          id="live"
          title="Live-матчи"
          matches={live}
          emptyLabel="Сейчас нет матчей в прямом эфире по выбранным фильтрам."
          updatedAt={matchesState.updatedAt}
          source={matchesState.source}
          isLoading={matchesState.isLoading}
        />

        <MatchSection
          id="upcoming"
          title="Ближайшие матчи"
          matches={upcoming}
          emptyLabel="Нет предстоящих матчей по выбранным фильтрам."
          updatedAt={matchesState.updatedAt}
          source={matchesState.source}
          isLoading={matchesState.isLoading}
        />

        <MatchSection
          id="results"
          title="Результаты"
          matches={finished}
          emptyLabel="Нет завершённых матчей по выбранным фильтрам."
          updatedAt={matchesState.updatedAt}
          source={matchesState.source}
          isLoading={matchesState.isLoading}
        />

        <section id="standings" className="scroll-mt-20 py-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide text-chalk sm:text-4xl">
              Турнирные таблицы
            </h2>
            <div className="text-xs text-chalk/50">
              {standingsState.updatedAt && (
                <span className="scoreboard-num font-mono">
                  Обновлено:{" "}
                  {new Date(standingsState.updatedAt).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {(standingsState.data ?? []).map((table) => (
              <StandingsTableView key={table.tournament} table={table} />
            ))}
          </div>
        </section>

        <section id="news" className="scroll-mt-20 py-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-wide text-chalk sm:text-4xl">
              Новости
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(newsState.data ?? []).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-line/60 py-8 text-center text-xs text-chalk/40">
        FootballHub — демо-проект по PRD. Данные © соответствующих правообладателей и football-data.org.
      </footer>
    </main>
  );
}

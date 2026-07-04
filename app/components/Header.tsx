export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-pitch-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="font-display text-2xl leading-none tracking-wide text-chalk sm:text-3xl">
            FOOTBALL<span className="text-accent">HUB</span>
          </span>
        </div>
        <nav className="hidden gap-6 text-sm text-chalk/70 sm:flex">
          <a href="#live" className="hover:text-accent">Live</a>
          <a href="#upcoming" className="hover:text-accent">Расписание</a>
          <a href="#results" className="hover:text-accent">Результаты</a>
          <a href="#standings" className="hover:text-accent">Таблицы</a>
          <a href="#news" className="hover:text-accent">Новости</a>
        </nav>
      </div>
    </header>
  );
}

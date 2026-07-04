# FootballHub

Веб-сайт с футбольными новостями, live-матчами, расписанием, результатами и турнирными таблицами. Данные обновляются автоматически раз в 5 минут без перезагрузки страницы.

## Стек
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- football-data.org API (сервер), с in-memory кэшем (TTL 5 мин) и mock-fallback

## Запуск локально

```bash
npm install
cp .env.local.example .env.local
# впишите свой ключ в .env.local
npm run dev
```

Откройте http://localhost:3000

Если ключ API не указан или запрос к football-data.org падает — сайт автоматически покажет тестовые данные с пометкой «Тестовые данные».

## Структура проекта

```
app/
  api/matches/route.ts     — матчи: кэш → API → mock
  api/standings/route.ts   — таблицы: кэш → API → mock
  api/news/route.ts        — новости (курируемые данные MVP)
  components/              — UI-компоненты
  page.tsx                 — лендинг (единственная страница)
lib/
  cache.ts                 — in-memory кэш с TTL
  footballApi.ts           — клиент football-data.org
  mockData.ts              — тестовые данные
  useAutoRefresh.ts        — клиентский хук автообновления
types/                     — общие типы (Match, StandingRow, NewsItem)
```

## Деплой

Проще всего — Vercel:
1. Импортируйте репозиторий на vercel.com/new
2. Добавьте переменную окружения `FOOTBALL_API_KEY` в настройках проекта
3. Deploy

## Дальнейшие итерации (не в MVP)
- Страница отдельного матча со статистикой и составами
- Push-уведомления о голах
- Избранные команды/турниры
- Многоязычность

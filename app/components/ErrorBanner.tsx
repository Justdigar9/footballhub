export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-md border border-live/40 bg-live/10 px-4 py-3 text-sm text-chalk"
    >
      <span className="font-semibold text-live">Не удалось обновить данные с сервера.</span>{" "}
      Показываем последние доступные или тестовые данные. Причина: {message}
    </div>
  );
}

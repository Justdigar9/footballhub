import type { Metadata } from "next";
import { Teko, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const teko = Teko({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FootballHub — live-счёт, расписание и таблицы",
  description:
    "Футбольные новости, live-матчи, расписание, результаты и турнирные таблицы в реальном времени.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${teko.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}

import { NextResponse } from "next/server";
import { getCached, setCached } from "@/lib/cache";
import { mockNews } from "@/lib/mockData";
import { ApiEnvelope, NewsItem } from "@/types";

const CACHE_KEY = "news";

/**
 * В PRD новостной источник не специфицирован (стек указывает только Football API
 * для матчей/таблиц). В MVP отдаём курируемый список; при подключении реального
 * новостного API — замените блок ниже на реальный fetch и оставьте try/catch
 * с fallback на mockNews по аналогии с /api/matches.
 */
export async function GET() {
  const cached = getCached<NewsItem[]>(CACHE_KEY);
  if (cached) {
    const body: ApiEnvelope<NewsItem[]> = {
      data: cached.value,
      source: "cache",
      updatedAt: new Date(cached.updatedAt).toISOString(),
    };
    return NextResponse.json(body);
  }

  setCached(CACHE_KEY, mockNews);
  const body: ApiEnvelope<NewsItem[]> = {
    data: mockNews,
    source: "mock",
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(body);
}

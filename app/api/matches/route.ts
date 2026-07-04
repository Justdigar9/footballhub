import { NextResponse } from "next/server";
import { getCached, getStale, setCached } from "@/lib/cache";
import { fetchMatchesFromApi } from "@/lib/footballApi";
import { mockMatches } from "@/lib/mockData";
import { ApiEnvelope, Match } from "@/types";

const CACHE_KEY = "matches";

export async function GET() {
  // 1. Свежий кэш — отдаём сразу, не трогая внешний API (см. PRD п.5, TTL 5 мин)
  const cached = getCached<Match[]>(CACHE_KEY);
  if (cached) {
    const body: ApiEnvelope<Match[]> = {
      data: cached.value,
      source: "cache",
      updatedAt: new Date(cached.updatedAt).toISOString(),
    };
    return NextResponse.json(body);
  }

  // 2. Пробуем внешний API
  try {
    const matches = await fetchMatchesFromApi();
    setCached(CACHE_KEY, matches);
    const body: ApiEnvelope<Match[]> = {
      data: matches,
      source: "api",
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(body);
  } catch (err) {
    // 3. Ошибка API — пробуем отдать протухший кэш, иначе mock
    const stale = getStale<Match[]>(CACHE_KEY);
    const body: ApiEnvelope<Match[]> = {
      data: stale?.value ?? mockMatches,
      source: stale ? "cache" : "mock",
      updatedAt: stale ? new Date(stale.updatedAt).toISOString() : new Date().toISOString(),
      error: err instanceof Error ? err.message : "Unknown error",
    };
    return NextResponse.json(body);
  }
}

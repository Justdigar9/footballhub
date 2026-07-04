import { NextResponse } from "next/server";
import { getCached, getStale, setCached } from "@/lib/cache";
import { fetchStandingsFromApi } from "@/lib/footballApi";
import { mockStandings } from "@/lib/mockData";
import { ApiEnvelope, StandingsTable } from "@/types";

const CACHE_KEY = "standings";

export async function GET() {
  const cached = getCached<StandingsTable[]>(CACHE_KEY);
  if (cached) {
    const body: ApiEnvelope<StandingsTable[]> = {
      data: cached.value,
      source: "cache",
      updatedAt: new Date(cached.updatedAt).toISOString(),
    };
    return NextResponse.json(body);
  }

  try {
    const standings = await fetchStandingsFromApi();
    setCached(CACHE_KEY, standings);
    const body: ApiEnvelope<StandingsTable[]> = {
      data: standings,
      source: "api",
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(body);
  } catch (err) {
    const stale = getStale<StandingsTable[]>(CACHE_KEY);
    const body: ApiEnvelope<StandingsTable[]> = {
      data: stale?.value ?? mockStandings,
      source: stale ? "cache" : "mock",
      updatedAt: stale ? new Date(stale.updatedAt).toISOString() : new Date().toISOString(),
      error: err instanceof Error ? err.message : "Unknown error",
    };
    return NextResponse.json(body);
  }
}

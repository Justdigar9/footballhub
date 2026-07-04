"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiEnvelope } from "@/types";

interface AutoRefreshState<T> {
  data: T | null;
  source: ApiEnvelope<T>["source"] | null;
  updatedAt: string | null;
  error: string | null;
  isLoading: boolean;
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 минут, см. PRD п.4.7

/**
 * Опрашивает указанный endpoint каждые 5 минут и при возврате во вкладку.
 * Не делает запросов, пока вкладка неактивна (document.hidden).
 */
export function useAutoRefresh<T>(endpoint: string) {
  const [state, setState] = useState<AutoRefreshState<T>>({
    data: null,
    source: null,
    updatedAt: null,
    error: null,
    isLoading: true,
  });

  const isMounted = useRef(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json: ApiEnvelope<T> = await res.json();
      if (!isMounted.current) return;
      setState({
        data: json.data,
        source: json.source,
        updatedAt: json.updatedAt,
        error: json.error ?? null,
        isLoading: false,
      });
    } catch (err) {
      if (!isMounted.current) return;
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Unknown error",
        isLoading: false,
      }));
    }
  }, [endpoint]);

  useEffect(() => {
    isMounted.current = true;
    load();

    const interval = setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_INTERVAL_MS);

    const onVisibility = () => {
      if (!document.hidden) load();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load]);

  return { ...state, refresh: load };
}

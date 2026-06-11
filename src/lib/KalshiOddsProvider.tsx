"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export interface MatchOddsData {
  homeP: number
  drawP: number
  awayP: number
  homeVol: number
  drawVol: number
  awayVol: number
  ticker: string
}

interface KalshiOddsContextValue {
  odds: Record<string, MatchOddsData>
  loading: boolean
  error: string | null
  lastUpdated: number | null
  refresh: () => void
}

const KalshiOddsContext = createContext<KalshiOddsContextValue>({
  odds: {},
  loading: true,
  error: null,
  lastUpdated: null,
  refresh: () => {},
})

export function KalshiOddsProvider({ children }: { children: ReactNode }) {
  const [odds, setOdds] = useState<Record<string, MatchOddsData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  const fetchOdds = useCallback(async () => {
    try {
      const res = await fetch("/api/kalshi")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setOdds(data)
      setError(null)
      setLastUpdated(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch odds")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOdds()
    const interval = setInterval(fetchOdds, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchOdds])

  return (
    <KalshiOddsContext.Provider value={{ odds, loading, error, lastUpdated, refresh: fetchOdds }}>
      {children}
    </KalshiOddsContext.Provider>
  )
}

export function useKalshiOdds() {
  return useContext(KalshiOddsContext)
}

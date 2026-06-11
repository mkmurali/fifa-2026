import { matchToKalshi } from "@/data/kalshiMapping"
import type { Match } from "@/data/matches"
import { matches } from "@/data/matches"

interface KalshiMarket {
  ticker: string
  yes_sub_title?: string
  last_price_dollars: string
  volume_fp: string
}

interface KalshiEvent {
  event_ticker: string
  title: string
  markets: KalshiMarket[]
}

interface MatchOdds {
  homeP: number
  drawP: number
  awayP: number
  homeVol: number
  drawVol: number
  awayVol: number
  ticker: string
}

let cachedData: Record<string, MatchOdds> | null = null
let cacheTime = 0
const CACHE_TTL = 60_000

export async function GET() {
  const now = Date.now()
  if (cachedData && now - cacheTime < CACHE_TTL) {
    return Response.json(cachedData)
  }

  try {
    const url = "https://external-api.kalshi.com/trade-api/v2/events?with_nested_markets=true&series_ticker=KXWCGAME&limit=100&status=open"
    const res = await fetch(url, {
      headers: { "User-Agent": "WorldCup2026/1.0" },
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      throw new Error(`Kalshi API error ${res.status}: ${body.slice(0, 200)}`)
    }

    const data: { events: KalshiEvent[] } = await res.json()
    const tickerToOdds: Record<string, MatchOdds> = {}

    for (const event of data.events) {
      const et = event.event_ticker
      const markets = event.markets
      if (markets.length < 3) continue

      const homeMkt = markets[0]
      const awayMkt = markets[1]
      const tieMkt = markets[2]

      const np = (s: string) => parseFloat(s)
      tickerToOdds[et] = {
        homeP: np(homeMkt.last_price_dollars),
        awayP: np(awayMkt.last_price_dollars),
        drawP: np(tieMkt.last_price_dollars),
        homeVol: np(homeMkt.volume_fp),
        awayVol: np(awayMkt.volume_fp),
        drawVol: np(tieMkt.volume_fp),
        ticker: et,
      }
    }

    const result: Record<string, MatchOdds> = {}
    const groupMatchIds = new Set(matches.filter(m => m.round === "Group Stage").map(m => m.id))

    for (const [mid, ticker] of Object.entries(matchToKalshi)) {
      if (!groupMatchIds.has(mid)) continue
      const odds = tickerToOdds[ticker]
      if (odds) {
        result[mid] = odds
      }
    }

    cachedData = result
    cacheTime = now

    return Response.json(result)
  } catch (err) {
    console.error("Kalshi fetch error:", err)
    if (cachedData) {
      return Response.json(cachedData)
    }
    return Response.json({ error: "Failed to fetch Kalshi odds" }, { status: 502 })
  }
}

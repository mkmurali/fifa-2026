# FIFA World Cup 2026 — Interactive Bracket & Live Prediction Odds

A full-featured FIFA World Cup 2026 visualization app built with Next.js 16, Turbopack, TypeScript, and Tailwind CSS v4.

- **48 teams, 12 groups, 104 matches** — official FIFA draw & schedule
- **Interactive knockout bracket** with SVG bezier connectors, zoom controls, compact center (Final + 3rd Place)
- **Venue map** with Leaflet/OpenStreetMap — 16 stadiums across USA/Canada/Mexico with flag marker pins
- **Live Kalshi prediction market odds** for all 72 group matches — real prices & dollar volume, polls every 5 minutes via server-side API proxy
- **Animated UI** — staggered slide-ups, count-up stats, soccer ball spinner, glow effects
- **Filterable calendar** — filter by team or venue across all 39 match days

All data sourced from FIFA's official draw. Zero external dependencies for icons/animations.

## Stack

- [Next.js 16](https://nextjs.org) with Turbopack
- TypeScript
- Tailwind CSS v4
- Leaflet + react-leaflet (open-source mapping)

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```

Static export with a single dynamic API route (`/api/kalshi`) for live odds proxying.

## Match Time Handling

Kickoff times are stored in **venue local time** (the time at the stadium), matching FIFA's official convention. Each venue has a hardcoded UTC offset (accounting for DST in US/Canada, none in Mexico):

| Venue | Offset |
|---|---|
| East Coast (MetLife, Hard Rock, Mercedes-Atlanta, Linc, Gillette, BMO Field) | UTC-4 |
| Central (AT&T, NRG, Arrowhead) | UTC-5 |
| Mexico (Azteca, Akron, BBVA) | UTC-6 |
| West Coast (SoFi, Levi's, Lumen, BC Place) | UTC-7 |

At render time, `toUTCDate()` converts venue-local time → UTC by applying the offset. Components then use the browser's `toLocaleString()` to display the time in the user's local timezone — no server-side timezone assumption is made. All components that display times are marked `"use client"` to ensure conversion happens in-browser.

The CalendarView groups matches by each user's local date (derived from the converted UTC timestamp), so a 9 PM PDT kickoff on June 12 appears under June 13 for East Coast users, matching the FIFA schedule presentation.

## Prediction Odds

Match outcome probabilities come from two sources, with live market data taking priority:

### Kalshi Exchange (Live)

When available, the app fetches real-time prediction market odds from Kalshi's Trade API (`series_ticker=KXWCGAME`). A server-side proxy at `/api/kalshi` polls every 5 minutes (with 60s in-memory cache) and returns three values per match:

- **homeP / drawP / awayP** — last traded price (probability) for each outcome
- **homeVol / drawVol / awayVol** — total dollar volume traded on each market
- **ticker** — the Kalshi event ticker for identification

The Overview tab displays the sum of all volumes across every available market as a total-volume stat card. The footer links to Kalshi with a jurisdictional disclaimer.

### FIFA Elo Fallback

For matches where no Kalshi data exists (e.g., knockout rounds not yet listed), the app falls back to an Elo-based probability model:

```
expected = 1 / (1 + 10^((rating_away - rating_home) / 400))
draw = min(0.28, 0.10 + 0.18 * e^(-|rating_home - rating_away| / 300))
homeW = max(0, expected - draw / 2)
awayW = max(0, 1 - homeW - draw)
```

Team ratings are sourced from FIFA's official rankings (June 2025) in `src/data/fifaRatings.ts`. The model caps the draw probability at 28% for closely matched teams and tapers it as the rating gap widens.

## How This Was Built

All views, research, and verification done in about an hour using **Gemma 4 (26B, a4b-it, 4-bit)** running locally on a MacBook with the native `mlx-lm` framework, powered by the **OpenCode** agent.

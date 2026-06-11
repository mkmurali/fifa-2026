# FIFA World Cup 2026 — Interactive Bracket & Live Prediction Odds

A full-featured FIFA World Cup 2026 visualization app built with Next.js 16, Turbopack, TypeScript, and Tailwind CSS v4.

- **48 teams, 12 groups, 104 matches** — official FIFA draw & schedule
- **Interactive knockout bracket** with SVG bezier connectors, zoom controls, compact center (Final + 3rd Place)
- **Venue map** with Leaflet/OpenStreetMap — 16 stadiums across USA/Canada/Mexico with flag marker pins
- **Live Kalshi prediction market odds** for all 72 group matches — real prices & dollar volume, polls every 5 minutes via server-side API proxy
- **Animated UI** — staggered slide-ups, count-up stats, soccer ball spinner, glow effects
- **Filterable calendar** — filter by team or venue across all 39 match days

All data sourced from FIFA's official draw. Odds pulled from Kalshi's exchange API. Zero external dependencies for icons/animations.

## Stack

- [Next.js 16](https://nextjs.org) with Turbopack
- TypeScript
- Tailwind CSS v4
- Leaflet + react-leaflet (open-source mapping)
- Kalshi Trade API (prediction markets)

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

## How This Was Built

All views, research, and verification done in about an hour using **Gemma 4 (26B, a4b-it, 4-bit)** running locally on a MacBook with the native `mlx-lm` framework, powered by the **OpenCode** agent.

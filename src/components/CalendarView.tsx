"use client"

import { useState, useMemo } from "react"
import { matches, type Match } from "@/data/matches"
import { venues } from "@/data/venues"
import { teams } from "@/data/teams"
import { getTeamInfo, formatDate, getMatchProb } from "@/lib/utils"
import { useKalshiOdds, type MatchOddsData } from "@/lib/KalshiOddsProvider"

const roundBadge: Record<string, string> = {
  "Group Stage": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Round of 32": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Round of 16": "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "Quarter-finals": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Semi-finals": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Third Place": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Final": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
}

const roundBorder: Record<string, string> = {
  "Group Stage": "border-l-blue-500/40",
  "Round of 32": "border-l-emerald-500/40",
  "Round of 16": "border-l-teal-500/40",
  "Quarter-finals": "border-l-amber-500/40",
  "Semi-finals": "border-l-orange-500/40",
  "Third Place": "border-l-purple-500/40",
  "Final": "border-l-yellow-500/40",
}

function MatchRow({ match, index, kalshiOdds }: { match: Match; index: number; kalshiOdds?: MatchOddsData | null }) {
  const home = getTeamInfo(match.homeTeam)
  const away = getTeamInfo(match.awayTeam)
  const venue = venues.find((v) => v.id === match.venue)
  const isTbd = home.name === "TBD" || away.name === "TBD"
  const rawProb = !isTbd && match.round === "Group Stage" ? getMatchProb(match.homeTeam, match.awayTeam) : null
  const hasKalshi = kalshiOdds && match.round === "Group Stage"
  const prob = hasKalshi ? { homeW: Math.round(kalshiOdds.homeP * 100), draw: Math.round(kalshiOdds.drawP * 100), awayW: Math.round(kalshiOdds.awayP * 100) } : rawProb

  return (
    <div className={`animate-slide-up-sm flex items-center gap-3 px-4 py-2.5 rounded-lg border border-l-2 transition-all duration-200 hover:scale-[1.01] hover:shadow-md hover:shadow-black/15
      ${isTbd ? "border-zinc-700/30 bg-zinc-800/10" : "border-zinc-700/40 bg-zinc-800/20 hover:border-zinc-600/60"}
      ${roundBorder[match.round] ?? "border-l-zinc-700/40"}
    `} style={{ animationDelay: `${index * 20}ms`, animationFillMode: "both" }}>
      <div className="w-16 shrink-0 text-center">
        <div className="text-xs font-semibold text-zinc-300">{match.time}</div>
      </div>
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 w-[120px] justify-end shrink-0">
          <span className={`text-sm font-medium truncate ${home.name === "TBD" ? "text-zinc-500" : "text-zinc-100"}`}>
            {home.shortName}
          </span>
          <span className="text-base">{home.flag}</span>
        </div>
        <div className="text-xs font-semibold text-zinc-500 shrink-0">vs</div>
        <div className="flex items-center gap-2 w-[120px] shrink-0">
          <span className="text-base">{away.flag}</span>
          <span className={`text-sm font-medium truncate ${away.name === "TBD" ? "text-zinc-500" : "text-zinc-100"}`}>
            {away.shortName}
          </span>
        </div>
        {prob && (
          <div className="w-24 shrink-0">
            <div className="flex h-1 rounded-full overflow-hidden bg-zinc-800">
              <div style={{ width: `${prob.homeW}%` }} className="h-full bg-blue-500/60" />
              <div style={{ width: `${prob.draw}%` }} className="h-full bg-zinc-600/60" />
              <div style={{ width: `${prob.awayW}%` }} className="h-full bg-red-500/60" />
            </div>
            <div className="text-[9px] font-mono text-zinc-500 tabular-nums text-center mt-0.5">
              {prob.homeW}% / {prob.draw}% / {prob.awayW}%
            </div>
          </div>
        )}
        {hasKalshi && (
          <span className="text-sm font-mono font-bold text-yellow-400 tabular-nums shrink-0">
            ${(kalshiOdds.homeVol + kalshiOdds.drawVol + kalshiOdds.awayVol).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        )}
      </div>
      <div className="hidden md:block w-48 shrink-0">
        <div className="text-xs text-zinc-400 truncate">{venue?.name ?? match.venue}</div>
        <div className="text-[11px] text-zinc-500 truncate">{venue?.city}</div>
      </div>
      <div className="w-24 shrink-0 text-right">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${roundBadge[match.round] ?? "bg-zinc-500/20 text-zinc-400"}`}>
          {match.round === "Group Stage" && match.group ? `Group ${match.group}` : match.round}
        </span>
      </div>
    </div>
  )
}

export function CalendarView() {
  const { odds } = useKalshiOdds()
  const [teamFilter, setTeamFilter] = useState<string>("all")
  const [venueFilter, setVenueFilter] = useState<string>("all")

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (teamFilter !== "all" && m.homeTeam !== teamFilter && m.awayTeam !== teamFilter) return false
      if (venueFilter !== "all" && m.venue !== venueFilter) return false
      return true
    })
  }, [teamFilter, venueFilter])

  const groupedByDate = useMemo(() => {
    const map = new Map<string, Match[]>()
    for (const m of filtered) {
      const existing = map.get(m.date)
      if (existing) existing.push(m)
      else map.set(m.date, [m])
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Match Calendar</h2>
        <div className="flex gap-3">
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 cursor-pointer min-w-[140px]"
          >
            <option value="all">All Teams</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.flag} {t.shortName}</option>
            ))}
          </select>
          <select
            value={venueFilter}
            onChange={(e) => setVenueFilter(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 cursor-pointer min-w-[160px]"
          >
            <option value="all">All Venues</option>
            {venues.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
        <span>{filtered.length} match{filtered.length !== 1 ? "es" : ""} shown</span>
      </div>

      <div className="space-y-6">
        {groupedByDate.map(([date, dayMatches]) => (
          <div key={date}>
            <div className="sticky top-14 z-10 bg-zinc-900/90 backdrop-blur-sm py-2 mb-3 border-b border-zinc-800">
              <h3 className="text-base font-semibold text-white">
                {formatDate(date)}
                <span className="text-zinc-500 font-normal text-sm ml-2">
                  {dayMatches.length} match{dayMatches.length !== 1 ? "es" : ""}
                </span>
              </h3>
            </div>
            <div className="space-y-2">
              {dayMatches.map((m, mi) => (
                <MatchRow key={m.id} match={m} index={mi} kalshiOdds={odds[m.id] ?? null} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

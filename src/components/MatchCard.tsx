"use client"

import type { Match } from "@/data/matches"
import { getTeamInfo, formatMatchDateTime, roundColors, getMatchProb } from "@/lib/utils"
import { getVenue } from "@/data/venues"
import type { MatchOddsData } from "@/lib/KalshiOddsProvider"

const roundAccent: Record<string, string> = {
  "Group Stage": "border-l-blue-500/50",
  "Round of 32": "border-l-emerald-500/50",
  "Round of 16": "border-l-teal-500/50",
  "Quarter-finals": "border-l-amber-500/50",
  "Semi-finals": "border-l-orange-500/50",
  "Third Place": "border-l-purple-500/50",
  "Final": "border-l-yellow-500/50",
}

export function MatchCard({ match, compact = false, showProb = false, kalshiOdds }: { match: Match; compact?: boolean; showProb?: boolean; kalshiOdds?: MatchOddsData | null }) {
  const home = getTeamInfo(match.homeTeam)
  const away = getTeamInfo(match.awayTeam)
  const venue = getVenue(match.venue)
  const isTbd = home.name === "TBD" || away.name === "TBD"
  const isFinished = match.status === "finished"
  const rawProb = showProb && !isTbd ? getMatchProb(match.homeTeam, match.awayTeam) : null
  const hasKalshi = kalshiOdds && showProb
  const prob = hasKalshi ? { homeW: Math.round(kalshiOdds.homeP * 100), draw: Math.round(kalshiOdds.drawP * 100), awayW: Math.round(kalshiOdds.awayP * 100) } : rawProb

  return (
    <div
      className={`
        border border-zinc-700/50 rounded-lg overflow-hidden border-l-2
        ${roundAccent[match.round] ?? "border-l-zinc-700/50"}
        ${isFinished ? "bg-zinc-800/60" : isTbd ? "bg-zinc-800/20" : "bg-zinc-800/40"}
        ${compact ? "text-xs" : "text-sm"}
        transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 hover:border-zinc-500/70
      `}
    >
      <div className="flex items-center justify-between px-2 py-1 bg-zinc-900/50">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${roundColors[match.round]} text-white px-1.5 py-0.5 rounded`}>
          {match.round}
        </span>
        {match.group && <span className="text-[10px] text-zinc-400">Group {match.group}</span>}
      </div>

      <div className={`grid gap-1 ${compact ? "p-2" : "p-3"}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 truncate">
            <span className="text-base">{home.flag}</span>
            <span className={`font-medium truncate ${isFinished && match.homeScore! < match.awayScore! ? "text-zinc-500" : "text-white"}`}>
              {home.shortName}<sup className={`text-[10px] text-zinc-500 ml-0.5 ${isFinished && match.homeScore! < match.awayScore! ? "opacity-40" : ""}`}>{home.rank}</sup>
            </span>
          </span>
          <span className={`font-bold tabular-nums shrink-0 ${isFinished ? "text-white" : "text-zinc-400"}`}>
            {isFinished ? match.homeScore : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 truncate">
            <span className="text-base">{away.flag}</span>
            <span className={`font-medium truncate ${isFinished && match.awayScore! < match.homeScore! ? "text-zinc-500" : "text-white"}`}>
              {away.shortName}<sup className={`text-[10px] text-zinc-500 ml-0.5 ${isFinished && match.awayScore! < match.homeScore! ? "opacity-40" : ""}`}>{away.rank}</sup>
            </span>
          </span>
          <span className={`font-bold tabular-nums shrink-0 ${isFinished ? "text-white" : "text-zinc-400"}`}>
            {isFinished ? match.awayScore : "-"}
          </span>
        </div>
        {prob && (
          <div className="flex items-center gap-1 pt-0.5">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-800 flex">
              <div style={{ width: `${prob.homeW}%` }} className="h-full bg-blue-500/60" />
              <div style={{ width: `${prob.draw}%` }} className="h-full bg-zinc-600/60" />
              <div style={{ width: `${prob.awayW}%` }} className="h-full bg-red-500/60" />
            </div>
            <span className="text-[9px] font-mono text-zinc-500 tabular-nums whitespace-nowrap">
              {prob.homeW}/{prob.draw}/{prob.awayW}
            </span>
          </div>
        )}
        {hasKalshi && (
          <div className="text-xs font-mono font-bold text-yellow-400 text-center pt-1">
            ${(kalshiOdds.homeVol + kalshiOdds.drawVol + kalshiOdds.awayVol).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        )}
      </div>

      <div className="px-2 py-1.5 bg-zinc-900/30 border-t border-zinc-700/30">
        <div className="text-[10px] text-zinc-400 leading-tight">
          <div>{formatMatchDateTime(match.date, match.time, match.venue)}</div>
          {venue && <div className="truncate">{venue.name}, {venue.city}</div>}
        </div>
      </div>
    </div>
  )
}

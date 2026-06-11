"use client"

import { useState } from "react"
import { getMatchesByRound } from "@/data/matches"
import { getTeamInfo } from "@/lib/utils"
import { getVenue } from "@/data/venues"
import { formatMatchDateTime } from "@/lib/utils"

const roundAccent: Record<string, string> = {
  R32: "border-emerald-500/40",
  R16: "border-teal-500/40",
  QF: "border-amber-500/40",
  SF: "border-orange-500/40",
  Final: "border-yellow-500/40",
  "3rd": "border-purple-500/40",
}

const roundConnector: Record<string, string> = {
  R32: "#34d399",
  R16: "#2dd4bf",
  QF: "#f59e0b",
  SF: "#f97316",
  Final: "#eab308",
}

const MATCH_H = 124
const GAP = 32
const SLOT = MATCH_H + GAP
const TOTAL_H = 8 * SLOT

function getCenters(count: number) {
  return Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * TOTAL_H)
}

function BracketConnector({
  fromCount,
  color,
  dir = "ltr",
}: {
  fromCount: number
  color: string
  dir?: "ltr" | "rtl"
}) {
  const toCount = fromCount / 2
  if (toCount < 1) return null
  const w = 36
  const src = getCenters(fromCount)
  const dst = getCenters(toCount)

  return (
    <svg width={w} height={TOTAL_H} className="shrink-0">
      {Array.from({ length: toCount }, (_, j) => {
        const y1a = src[2 * j]
        const y1b = src[2 * j + 1]
        const y2 = dst[j]
        const cx = w * 0.65
        const cx2 = w * 0.35
        return (
          <g key={j}>
            <path
              d={dir === "ltr" ? `M 0 ${y1a} C ${cx} ${y1a}, ${cx} ${y2}, ${w} ${y2}` : `M ${w} ${y1a} C ${cx2} ${y1a}, ${cx2} ${y2}, 0 ${y2}`}
              fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
              opacity={0.5}
            />
            <path
              d={dir === "ltr" ? `M 0 ${y1b} C ${cx} ${y1b}, ${cx} ${y2}, ${w} ${y2}` : `M ${w} ${y1b} C ${cx2} ${y1b}, ${cx2} ${y2}, 0 ${y2}`}
              fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
              opacity={0.5}
            />
          </g>
        )
      })}
    </svg>
  )
}

function BracketMatch({
  label,
  team1,
  team2,
  score1,
  score2,
  date,
  time,
  venueId,
  venue,
  isFinished,
  dir = "ltr",
  showArrow = true,
}: {
  label: string
  team1: { name: string; flag: string; rank: number | null }
  team2: { name: string; flag: string; rank: number | null }
  score1?: number
  score2?: number
  date?: string
  time?: string
  venueId?: string
  venue?: string
  isFinished?: boolean
  dir?: "ltr" | "rtl"
  showArrow?: boolean
}) {
  const accent = roundAccent[label] ?? "border-zinc-700/30"

  return (
    <div
      className={`animate-slide-up-sm border rounded-lg bg-zinc-800/30 min-w-[180px] border-l-2 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-black/20 ${accent}`}
      style={{ animationDelay: "0ms", animationFillMode: "both" }}
    >
      <div className="px-2 py-1 bg-zinc-900/50 border-b border-zinc-700/30">
        <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider">{label}</span>
      </div>
      <div className="p-2 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-xs truncate">
            <span>{team1.flag}</span>
            <span className={`font-medium truncate ${team1.name === "TBD" ? "text-zinc-500" : isFinished && score1! < score2! ? "text-zinc-500" : "text-zinc-100"}`}>
              {team1.name === "TBD" ? "TBD" : team1.name}{team1.rank && <sup className="text-[9px] text-zinc-500 ml-0.5">{team1.rank}</sup>}
            </span>
          </span>
          <span className={`text-xs font-bold tabular-nums shrink-0 ${isFinished ? "text-white" : "text-zinc-500"}`}>
            {isFinished ? score1 : "-"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-xs truncate">
            <span>{team2.flag}</span>
            <span className={`font-medium truncate ${team2.name === "TBD" ? "text-zinc-500" : isFinished && score2! < score1! ? "text-zinc-500" : "text-zinc-100"}`}>
              {team2.name === "TBD" ? "TBD" : team2.name}{team2.rank && <sup className="text-[9px] text-zinc-500 ml-0.5">{team2.rank}</sup>}
            </span>
          </span>
          <span className={`text-xs font-bold tabular-nums shrink-0 ${isFinished ? "text-white" : "text-zinc-500"}`}>
            {isFinished ? score2 : "-"}
          </span>
        </div>
      </div>
      {(date || venue) && (
        <div className="px-2 py-1 bg-zinc-900/30 border-t border-zinc-700/30">
          <div className="text-[9px] text-zinc-500 leading-tight">
            {date && time && venueId ? formatMatchDateTime(date, time, venueId) : date && time ? `${date} ${time}` : ""}
            {venue && <div className="truncate">{venue}</div>}
          </div>
        </div>
      )}
      {showArrow && (
        <div className="flex justify-center py-0.5 border-t border-zinc-700/20">
          <span className="text-zinc-500 text-xs">{dir === "ltr" ? "→" : "←"}</span>
        </div>
      )}
    </div>
  )
}

function MatchColumn({
  matches,
}: {
  matches: { id: string; match: React.ReactElement }[]
}) {
  return (
    <div className="flex flex-col justify-around shrink-0 w-[180px]" style={{ height: TOTAL_H }}>
      {matches.map((m) => (
        <div key={m.id} className="shrink-0" style={{ height: MATCH_H }}>
          {m.match}
        </div>
      ))}
    </div>
  )
}

export function Bracket() {
  const [zoom, setZoom] = useState(0.5)
  const r32 = getMatchesByRound("Round of 32")
  const r16 = getMatchesByRound("Round of 16")
  const qf = getMatchesByRound("Quarter-finals")
  const sf = getMatchesByRound("Semi-finals")
  const third = getMatchesByRound("Third Place")
  const final = getMatchesByRound("Final")

  const mkMatch = (m: typeof r32[0], label: string, dir: "ltr" | "rtl" = "ltr", showArrow = true) => {
    const h = getTeamInfo(m.homeTeam)
    const a = getTeamInfo(m.awayTeam)
    const v = getVenue(m.venue)
    return {
      id: m.id,
      match: (
        <BracketMatch
          label={label}
          team1={{ name: h.shortName, flag: h.flag, rank: h.rank }}
          team2={{ name: a.shortName, flag: a.flag, rank: a.rank }}
          score1={m.homeScore}
          score2={m.awayScore}
          date={m.date}
          time={m.time}
          venueId={m.venue}
          venue={v ? `${v.name.slice(0, 20)}` : undefined}
          isFinished={m.status === "finished"}
          dir={dir}
          showArrow={showArrow}
        />
      ),
    }
  }

  const r32Col1 = r32.slice(0, 8)
  const r32Col2 = r32.slice(8, 16)
  const r16L = r16.slice(0, 4)
  const r16R = r16.slice(4, 8)
  const qfL = qf.slice(0, 2)
  const qfR = qf.slice(2, 4)
  const sfL = sf.slice(0, 1)
  const sfR = sf.slice(1, 2)

  const matchEl = (
    items: typeof r32,
    label: string,
    dir: "ltr" | "rtl" = "ltr"
  ) => items.map((m) => mkMatch(m, label, dir))

  const centerH = TOTAL_H

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Knockout Bracket</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500 font-mono tabular-nums w-8 text-right">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.max(0.15, z - 0.1))}
            className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm flex items-center justify-center border border-zinc-700/50 transition-colors"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={() => setZoom(0.5)}
            className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] flex items-center justify-center border border-zinc-700/50 transition-colors"
            aria-label="Reset zoom"
          >
            R
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
            className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm flex items-center justify-center border border-zinc-700/50 transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-none pb-4">
        <div
          className="flex items-start gap-0 min-w-max origin-top-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >

          {/* ===== LEFT SIDE ===== */}
          <div className="flex flex-col shrink-0">
            <div className="flex mb-2">
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-emerald-400">R32</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-teal-400">R16</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-amber-400">QF</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-orange-400">SF</div>
            </div>
            <div className="flex items-start">
              <MatchColumn matches={matchEl(r32Col1, "R32")} />
              <BracketConnector fromCount={8} color={roundConnector.R32} />
              <MatchColumn matches={matchEl(r16L, "R16")} />
              <BracketConnector fromCount={4} color={roundConnector.R16} />
              <MatchColumn matches={matchEl(qfL, "QF")} />
              <BracketConnector fromCount={2} color={roundConnector.QF} />
              <MatchColumn matches={matchEl(sfL, "SF")} />
            </div>
          </div>

          {/* Connector from left SF to Final + 3rd */}
          <div className="flex flex-col shrink-0">
            <div className="h-[22px]" />
            <svg width={36} height={centerH}>
              <path
                d={`M 0 ${TOTAL_H / 2 - 22} C 24 ${TOTAL_H / 2 - 22}, 24 533, 36 533`}
                fill="none" stroke={roundConnector.SF} strokeWidth="1.5" strokeLinecap="round" opacity={0.5}
              />
              <path
                d={`M 0 ${TOTAL_H / 2 - 22} C 24 ${TOTAL_H / 2 - 22}, 24 693, 36 693`}
                fill="none" stroke="#a855f4" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
                strokeDasharray="4 3"
              />
            </svg>
          </div>

          {/* ===== CENTER: FINAL + 3RD ===== */}
          <div className="flex flex-col shrink-0" style={{ marginTop: "22px", height: TOTAL_H, paddingTop: 445 }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-center mb-1 text-yellow-400 animate-glow">Final</div>
            <div className="flex flex-col justify-around" style={{ height: MATCH_H + 8 }}>
              {final.length > 0 && mkMatch(final[0], "Final", "ltr", false).match}
            </div>
            <div style={{ height: 6 }} />
            <div className="text-[10px] font-semibold uppercase tracking-wider text-center mb-1 text-purple-400">3rd Place</div>
            <div className="flex flex-col justify-around" style={{ height: MATCH_H + 8 }}>
              {third.length > 0 && mkMatch(third[0], "3rd", "ltr", false).match}
            </div>
          </div>

          {/* Connector from right SF to Final + 3rd */}
          <div className="flex flex-col shrink-0">
            <div className="h-[22px]" />
            <svg width={36} height={centerH}>
              <path
                d={`M 36 ${TOTAL_H / 2 - 22} C 12 ${TOTAL_H / 2 - 22}, 12 533, 0 533`}
                fill="none" stroke={roundConnector.SF} strokeWidth="1.5" strokeLinecap="round" opacity={0.5}
              />
              <path
                d={`M 36 ${TOTAL_H / 2 - 22} C 12 ${TOTAL_H / 2 - 22}, 12 693, 0 693`}
                fill="none" stroke="#a855f4" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
                strokeDasharray="4 3"
              />
            </svg>
          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className="flex flex-col shrink-0">
            <div className="flex mb-2">
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-orange-400">SF</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-amber-400">QF</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-teal-400">R16</div>
              <div className="w-[36px]" />
              <div className="w-[180px] text-center text-[10px] font-semibold uppercase tracking-wider text-emerald-400">R32</div>
            </div>
            <div className="flex items-start">
              <MatchColumn matches={matchEl(sfR, "SF", "rtl")} />
              <BracketConnector fromCount={2} color={roundConnector.QF} dir="rtl" />
              <MatchColumn matches={matchEl(qfR, "QF", "rtl")} />
              <BracketConnector fromCount={4} color={roundConnector.R16} dir="rtl" />
              <MatchColumn matches={matchEl(r16R, "R16", "rtl")} />
              <BracketConnector fromCount={8} color={roundConnector.R32} dir="rtl" />
              <MatchColumn matches={matchEl(r32Col2, "R32", "rtl")} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

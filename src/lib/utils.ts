import { getTeam } from "@/data/teams"
import { fifaRatings } from "@/data/fifaRatings"

const rankings = Object.entries(fifaRatings)
  .sort(([, a], [, b]) => b - a)
  .reduce((acc, [id], i) => { acc[id] = i + 1; return acc }, {} as Record<string, number>)

export function getTeamInfo(id: string) {
  if (id.startsWith("winner-") || id.startsWith("runner-up-") || id.startsWith("loser-") || id.startsWith("3rd-")) {
    return { name: "TBD", shortName: "TBD", flag: "🏳️", group: "", rank: null }
  }
  const team = getTeam(id)
  if (!team) return { id, name: id, shortName: id.toUpperCase(), flag: "🏳️", group: "", rank: null }
  return { ...team, rank: rankings[id] ?? null }
}
export type TeamInfo = ReturnType<typeof getTeamInfo>

// UTC offset in minutes for each venue during June-July 2026 (DST in effect for US/Canada, none for Mexico)
const venueUtcOffsets: Record<string, number> = {
  metlife: -240, att: -300, sofi: -420, arrowhead: -300,
  mercedes: -240, nrg: -300, lumen: -420, levis: -420,
  hardrock: -240, linc: -240, gillette: -240,
  bcplace: -420, bmofield: -240,
  azteca: -360, akron: -360, bbva: -360,
}

function toUTCDate(dateStr: string, timeStr: string, venueId: string): Date {
  const offset = venueUtcOffsets[venueId] ?? -240
  const naive = new Date(`${dateStr}T${timeStr}:00Z`)
  return new Date(naive.getTime() - offset * 60_000)
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function formatMatchTime(dateStr: string, timeStr: string, venueId: string): string {
  return toUTCDate(dateStr, timeStr, venueId).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

export function formatMatchDate(dateStr: string, timeStr: string, venueId: string): string {
  return toUTCDate(dateStr, timeStr, venueId).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function matchLocalDateKey(dateStr: string, timeStr: string, venueId: string): string {
  return toUTCDate(dateStr, timeStr, venueId).toLocaleDateString("en-CA")
}

export function formatMatchDateTime(dateStr: string, timeStr: string, venueId: string): string {
  return toUTCDate(dateStr, timeStr, venueId).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  })
}

export const roundColors: Record<string, string> = {
  "Group Stage": "bg-blue-500",
  "Round of 32": "bg-emerald-500",
  "Round of 16": "bg-teal-500",
  "Quarter-finals": "bg-amber-500",
  "Semi-finals": "bg-orange-500",
  "Third Place": "bg-purple-500",
  "Final": "bg-yellow-500",
}

export const roundOrder = [
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Third Place",
  "Final",
]

export function getMatchProb(homeId: string, awayId: string) {
  const rH = fifaRatings[homeId]
  const rA = fifaRatings[awayId]
  if (!rH || !rA) return null
  const expected = 1 / (1 + Math.pow(10, (rA - rH) / 400))
  const draw = Math.min(0.28, 0.10 + 0.18 * Math.exp(-Math.abs(rH - rA) / 300))
  const homeW = Math.max(0, Math.min(1, expected - draw / 2))
  const awayW = Math.max(0, 1 - homeW - draw)
  let h = Math.round(homeW * 100)
  let d = Math.round(draw * 100)
  let a = Math.round(awayW * 100)
  const sum = h + d + a
  if (sum !== 100) {
    const entries = [
      { key: "h" as const, val: h, raw: homeW * 100 },
      { key: "d" as const, val: d, raw: draw * 100 },
      { key: "a" as const, val: a, raw: awayW * 100 },
    ]
    entries.sort((x, y) => Math.abs(y.raw - y.val) - Math.abs(x.raw - x.val))
    if (entries[0].key === "h") h += 100 - sum
    else if (entries[0].key === "d") d += 100 - sum
    else a += 100 - sum
  }
  return { homeW: h, draw: d, awayW: a }
}

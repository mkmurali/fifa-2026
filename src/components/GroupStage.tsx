"use client"

import { groupLabels, getTeamsByGroup } from "@/data/teams"
import { getMatchesByGroup } from "@/data/matches"
import { getTeamInfo } from "@/lib/utils"
import { MatchCard } from "./MatchCard"
import { useKalshiOdds } from "@/lib/KalshiOddsProvider"

const groupAccent: Record<string, string> = {
  A: "border-t-blue-500/60", B: "border-t-emerald-500/60", C: "border-t-amber-500/60",
  D: "border-t-red-500/60", E: "border-t-purple-500/60", F: "border-t-cyan-500/60",
  G: "border-t-pink-500/60", H: "border-t-lime-500/60", I: "border-t-orange-500/60",
  J: "border-t-teal-500/60", K: "border-t-indigo-500/60", L: "border-t-rose-500/60",
}

export function GroupStage() {
  const { odds } = useKalshiOdds()

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Group Stage</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groupLabels.map((group, gi) => {
          const groupTeams = getTeamsByGroup(group)
          const groupMatches = getMatchesByGroup(group)
          return (
            <div
              key={group}
              className="animate-slide-up border border-zinc-700/50 rounded-xl bg-zinc-800/20 overflow-hidden border-t-2 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
              style={{ animationDelay: `${gi * 40}ms`, animationFillMode: "both" }}
            >
              <div className={`bg-zinc-800 px-4 py-2 border-b border-zinc-700/50 ${groupAccent[group] ?? "border-t-transparent"}`}>
                <h3 className="text-lg font-bold text-white">Group {group}</h3>
              </div>
              <div className="p-3">
                <div className="mb-3 space-y-1">
                  {groupTeams.map((team, ti) => {
                    const info = getTeamInfo(team.id)
                    return (
                      <div
                        key={team.id}
                        className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-800/40 transition-all duration-200 hover:bg-zinc-700/40 hover:translate-x-0.5"
                        style={{ animationDelay: `${gi * 40 + ti * 30}ms`, animationFillMode: "both" }}
                      >
                        <span className="text-lg">{info.flag}</span>
                        <span className="text-sm font-medium text-zinc-200">{info.shortName}<sup className="text-[10px] text-zinc-500 ml-0.5">{info.rank}</sup></span>
                      </div>
                    )
                  })}
                </div>
                <div className="space-y-2">
                  {groupMatches.map((match, mi) => {
                    return (
                      <div
                        key={match.id}
                        className="animate-slide-up-sm"
                        style={{ animationDelay: `${gi * 40 + (groupTeams.length + mi) * 30}ms`, animationFillMode: "both" }}
                      >
                        <MatchCard match={match} compact showProb kalshiOdds={odds[match.id] ?? null} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

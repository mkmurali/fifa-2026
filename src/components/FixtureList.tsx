import { matches } from "@/data/matches"
import { MatchCard } from "./MatchCard"

export function FixtureList() {
  const knockoutRounds = ["Round of 32", "Round of 16", "Quarter-finals", "Semi-finals", "Third Place", "Final"]

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Knockout Schedule</h2>
      <div className="space-y-8">
        {knockoutRounds.map((round) => {
          const roundMatches = matches.filter((m) => m.round === round)
          return (
            <div key={round}>
              <h3 className="text-lg font-semibold text-zinc-200 mb-3">{round}</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roundMatches.map((match) => (
                  <MatchCard key={match.id} match={match} compact />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

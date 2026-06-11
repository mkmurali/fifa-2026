import { Tabs } from "@/components/Tabs"
import { StatCard } from "@/components/StatCard"
import { GroupStage } from "@/components/GroupStage"
import { Bracket } from "@/components/Bracket"
import { CalendarView } from "@/components/CalendarView"
import { VenueMap } from "@/components/VenueMap"
import { SoccerBall } from "@/components/SoccerBall"
import { matches } from "@/data/matches"
import { venues } from "@/data/venues"

export default function Home() {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Teams" value="48" />
            <StatCard label="Matches" value={String(matches.length)} />
            <StatCard label="Host Cities" value={String(venues.length)} />
            <StatCard label="Tournament Days" value="39" />
          </div>
          <div className="animate-slide-up border border-zinc-700/50 rounded-xl p-6 bg-gradient-to-br from-zinc-800/30 to-zinc-800/10 text-sm text-zinc-300 leading-relaxed hover:shadow-lg hover:shadow-black/15 transition-all duration-300">
            <p>
              The <strong className="text-white">2026 FIFA World Cup</strong> will be the 23rd edition of the tournament, 
              hosted jointly by the <strong className="text-white">United States</strong>, <strong className="text-white">Canada</strong>, 
              and <strong className="text-white">Mexico</strong>. It will be the first World Cup hosted by three nations and 
              the first to feature <strong className="text-white">48 teams</strong> playing <strong className="text-white">104 matches</strong>.
            </p>
            <p className="mt-2">
              The tournament opens on <strong className="text-white">June 11, 2026</strong> at <strong className="text-sky-300">Estadio Azteca</strong> in Mexico City 
              with <strong className="text-emerald-300">Mexico</strong> vs <strong className="text-amber-300">South Africa</strong>, and concludes with the Final on <strong className="text-white">July 19, 2026</strong> 
              at <strong className="text-yellow-300">MetLife Stadium</strong> in New York/New Jersey.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "groups",
      label: "Groups",
      content: <GroupStage />,
    },
    {
      id: "bracket",
      label: "Bracket",
      content: <Bracket />,
    },
    {
      id: "schedule",
      label: "Schedule",
      content: <CalendarView />,
    },
    {
      id: "venues",
      label: "Venues",
      content: <VenueMap />,
    },
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <header className="border-b border-zinc-800 bg-zinc-900/80 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SoccerBall size={36} />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">FIFA World Cup 2026</h1>
              <p className="text-xs text-zinc-400">USA · Canada · Mexico</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} />
      </main>

      <footer className="border-t border-zinc-800 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-zinc-500">
          FIFA World Cup 2026 Schedule Visualizer. Not affiliated with FIFA.
        </div>
      </footer>
    </div>
  )
}

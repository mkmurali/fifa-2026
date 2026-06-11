"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { venues } from "@/data/venues"

const VenueMapInner = dynamic(() => import("./VenueMapInner"), { ssr: false })

const countryColors: Record<string, string> = {
  USA: "#3b82f6",
  Canada: "#ef4444",
  Mexico: "#22c55e",
}

export function VenueMap() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const filtered = activeCountry ? venues.filter((v) => v.country === activeCountry) : venues

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-4">Host Venues Map</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveCountry(null)}
          className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
            activeCountry === null
              ? "bg-zinc-700 text-white border-zinc-500"
              : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
          }`}
        >
          All
        </button>
        {(["USA", "Canada", "Mexico"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActiveCountry(c)}
            className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
              activeCountry === c
                ? "text-white border-zinc-500"
                : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:border-zinc-500"
            }`}
            style={activeCountry === c ? { backgroundColor: countryColors[c] + "40", borderColor: countryColors[c] } : {}}
          >
            {c === "USA" ? "🇺🇸 USA" : c === "Canada" ? "🇨🇦 Canada" : "🇲🇽 Mexico"}
          </button>
        ))}
      </div>

      <div className="h-[500px] rounded-xl overflow-hidden border border-zinc-700/50">
        <VenueMapInner activeCountry={activeCountry} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {filtered.map((v, i) => {
          const color = countryColors[v.country]
          return (
            <div
              key={v.id}
              className="animate-slide-up-sm border border-zinc-700/50 rounded-lg p-3 bg-zinc-800/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-black/15 hover:border-zinc-600/70"
              style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <div className="font-medium text-sm text-zinc-200">{v.name}</div>
              </div>
              <div className="text-xs text-zinc-400 ml-4">{v.city}, {v.country}</div>
              <div className="text-xs text-zinc-500 ml-4">{v.capacity.toLocaleString()} capacity</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

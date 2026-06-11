import { venues } from "@/data/venues"

export function VenueList() {
  const usa = venues.filter((v) => v.country === "USA")
  const canada = venues.filter((v) => v.country === "Canada")
  const mexico = venues.filter((v) => v.country === "Mexico")

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">Host Venues</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>🇺🇸</span> United States
          </h3>
          <div className="space-y-2">
            {usa.map((v) => (
              <div key={v.id} className="border border-zinc-700/50 rounded-lg p-3 bg-zinc-800/20">
                <div className="font-medium text-sm text-zinc-200">{v.name}</div>
                <div className="text-xs text-zinc-400">{v.city}</div>
                <div className="text-xs text-zinc-500 mt-1">{v.capacity.toLocaleString()} capacity</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>🇨🇦</span> Canada
          </h3>
          <div className="space-y-2">
            {canada.map((v) => (
              <div key={v.id} className="border border-zinc-700/50 rounded-lg p-3 bg-zinc-800/20">
                <div className="font-medium text-sm text-zinc-200">{v.name}</div>
                <div className="text-xs text-zinc-400">{v.city}</div>
                <div className="text-xs text-zinc-500 mt-1">{v.capacity.toLocaleString()} capacity</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span>🇲🇽</span> Mexico
          </h3>
          <div className="space-y-2">
            {mexico.map((v) => (
              <div key={v.id} className="border border-zinc-700/50 rounded-lg p-3 bg-zinc-800/20">
                <div className="font-medium text-sm text-zinc-200">{v.name}</div>
                <div className="text-xs text-zinc-400">{v.city}</div>
                <div className="text-xs text-zinc-500 mt-1">{v.capacity.toLocaleString()} capacity</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

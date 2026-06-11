"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { venues, type Venue } from "@/data/venues"

const coordMap: Record<string, [number, number]> = {
  metlife:    [40.8122, -74.0741],
  att:        [32.7473, -97.0929],
  sofi:       [33.9535, -118.3393],
  arrowhead:  [39.0490, -94.4839],
  mercedes:   [33.7557, -84.4009],
  nrg:        [29.6847, -95.4107],
  lumen:      [47.5952, -122.3316],
  levis:      [37.4031, -121.9700],
  hardrock:   [25.9580, -80.2389],
  linc:       [39.9008, -75.1675],
  gillette:   [42.0909, -71.2643],
  bcplace:    [49.2767, -123.1120],
  bmofield:   [43.6333, -79.4189],
  azteca:     [19.3030, -99.1505],
  akron:      [20.6818, -103.4618],
  bbva:       [25.6695, -100.2440],
}

const flagEmoji: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
}

function VenueMarker({ venue }: { venue: Venue }) {
  const pos = coordMap[venue.id]
  if (!pos) return null

  const icon = L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:1px;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.5))">
      <span style="font-size:24px;line-height:1">${flagEmoji[venue.country]}</span>
    </div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  })

  return (
    <Marker position={pos} icon={icon}>
      <Popup>
        <div className="font-sans text-sm">
          <div className="font-bold">{venue.name}</div>
          <div className="text-zinc-500">{venue.city}</div>
          <div className="text-zinc-400 text-xs mt-1">{venue.country} · {venue.capacity.toLocaleString()} seats</div>
        </div>
      </Popup>
    </Marker>
  )
}

export default function VenueMapInner({ activeCountry }: { activeCountry: string | null }) {
  const vis: [[number, number], [number, number]] = [
    [14.5, -130],
    [52, -60],
  ]

  return (
    <MapContainer bounds={vis} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {venues
        .filter((v) => !activeCountry || v.country === activeCountry)
        .map((v) => (
          <VenueMarker key={v.id} venue={v} />
        ))}
    </MapContainer>
  )
}

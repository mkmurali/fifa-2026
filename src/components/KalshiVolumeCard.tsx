"use client"

import { useKalshiOdds } from "@/lib/KalshiOddsProvider"
import { useEffect, useState, useRef } from "react"

export function KalshiVolumeCard() {
  const { odds, loading } = useKalshiOdds()
  const total = Object.values(odds).reduce((sum, m) => sum + m.homeVol + m.drawVol + m.awayVol, 0)
  const [display, setDisplay] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || total === 0) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const duration = 800
        const start = performance.now()
        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const val = Math.floor(eased * total)
          setDisplay("$" + val.toLocaleString("en-US", { maximumFractionDigits: 0 }))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [total])

  if (loading && total === 0) return null

  return (
    <div
      ref={ref}
      className="animate-slide-up rounded-xl p-4 text-center border bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg"
    >
      <div className="text-2xl font-bold text-yellow-300 tabular-nums">{total > 0 ? (display === "0" ? "$" + total.toLocaleString("en-US", { maximumFractionDigits: 0 }) : display) : "—"}</div>
      <div className="text-xs text-zinc-400 mt-1">Total Volume on Kalshi</div>
    </div>
  )
}

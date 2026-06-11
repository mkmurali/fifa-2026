"use client"

import { useState, useEffect, useRef } from "react"

const accentMap: Record<string, string> = {
  Teams: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
  Matches: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
  "Host Cities": "from-amber-500/20 to-amber-500/5 border-amber-500/30",
  "Tournament Days": "from-purple-500/20 to-purple-500/5 border-purple-500/30",
}

export function StatCard({ label, value }: { label: string; value: string }) {
  const [display, setDisplay] = useState("0")
  const ref = useRef<HTMLDivElement>(null)
  const pureNum = parseInt(value, 10)
  const suffix = isNaN(pureNum) ? "" : value.slice(String(pureNum).length)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (!isNaN(pureNum)) {
          const duration = 800
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplay(String(Math.floor(eased * pureNum)))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        } else {
          setDisplay(value)
        }
        observer.disconnect()
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pureNum, value])

  const accent = accentMap[label] ?? "from-zinc-500/20 to-zinc-500/5 border-zinc-500/30"

  return (
    <div
      ref={ref}
      className={`animate-slide-up rounded-xl p-4 text-center border bg-gradient-to-br transition-all duration-300 hover:scale-[1.05] hover:shadow-lg ${accent}`}
    >
      <div className="text-2xl font-bold text-white tabular-nums">{display}{suffix}</div>
      <div className="text-xs text-zinc-400 mt-1">{label}</div>
    </div>
  )
}

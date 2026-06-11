"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import type { ReactNode } from "react"

interface Tab {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname()
  const active = pathname === "/"
    ? tabs[0]?.id
    : tabs.find((t) => `/${t.id}` === pathname)?.id ?? tabs[0]?.id

  return (
    <>
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={t.id === tabs[0]?.id ? "/" : `/${t.id}`}
            className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 -mb-[1px] ${
              active === t.id
                ? "text-white border-white"
                : "text-zinc-500 border-transparent hover:text-zinc-300 hover:border-zinc-600"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div key={active} className="animate-fade-in">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </>
  )
}

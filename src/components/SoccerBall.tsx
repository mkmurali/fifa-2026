export function SoccerBall({ size = 40 }: { size?: number }) {
  return (
    <div
      className="inline-flex items-center justify-center animate-soccer-spin"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
      >
        {/* Ball outline */}
        <circle cx="50" cy="50" r="48" fill="white" stroke="#333" strokeWidth="1" />

        {/* Center pentagon */}
        <polygon points="50,18 64,30 60,48 40,48 36,30" fill="#222" />

        {/* Top pentagon */}
        <polygon points="50,4 56,10 54,18 46,18 44,10" fill="#222" />

        {/* Left pentagon */}
        <polygon points="8,38 18,30 28,36 24,46 14,48" fill="#222" />

        {/* Right pentagon */}
        <polygon points="92,38 86,30 72,36 76,46 86,48" fill="#222" />

        {/* Bottom-left pentagon */}
        <polygon points="18,82 28,76 36,84 30,94 20,92" fill="#222" />

        {/* Bottom-right pentagon */}
        <polygon points="82,82 72,76 64,84 70,94 80,92" fill="#222" />

        {/* Panel border lines */}
        <path d="M50,18 L50,4" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M64,30 L86,30" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M36,30 L14,30" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M60,48 L72,60" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M40,48 L28,60" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M64,30 L72,36 L72,60" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M36,30 L28,36 L28,60" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M72,60 L82,76" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M28,60 L18,76" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M72,60 L64,74 L64,84" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M28,60 L36,74 L36,84" stroke="#333" strokeWidth="0.6" fill="none" />
        <path d="M50,48 L50,66 L50,74" stroke="#333" strokeWidth="0.6" fill="none" />

        {/* Shine */}
        <ellipse cx="35" cy="28" rx="12" ry="8" fill="white" opacity="0.3" transform="rotate(-20 35 28)" />
      </svg>
    </div>
  )
}

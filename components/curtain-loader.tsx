"use client"

import { useEffect, useState } from "react"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex pointer-events-none overflow-hidden">
      <div
        className="relative w-1/2 h-full animate-[curtain-left_3s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        style={{
          transformOrigin: "left center",
        }}
      >
        {/* Base curtain color */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B6F47] via-[#A0826D] to-[#8B6F47]" />

        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.3) 0px,
              rgba(0, 0, 0, 0.1) 8px,
              transparent 16px,
              rgba(255, 255, 255, 0.15) 24px,
              rgba(255, 255, 255, 0.05) 32px,
              transparent 40px,
              rgba(0, 0, 0, 0.2) 48px,
              rgba(0, 0, 0, 0.1) 56px,
              transparent 64px
            )`,
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "3px 3px",
          }}
        />

        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black/60 via-black/30 to-transparent" />

        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white/25 via-white/10 to-transparent" />

        {/* Top curtain rod shadow */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
      </div>

      <div
        className="relative w-1/2 h-full animate-[curtain-right_3s_cubic-bezier(0.65,0,0.35,1)_forwards]"
        style={{
          transformOrigin: "right center",
        }}
      >
        {/* Base curtain color */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#8B6F47] via-[#A0826D] to-[#8B6F47]" />

        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -90deg,
              rgba(0, 0, 0, 0.3) 0px,
              rgba(0, 0, 0, 0.1) 8px,
              transparent 16px,
              rgba(255, 255, 255, 0.15) 24px,
              rgba(255, 255, 255, 0.05) 32px,
              transparent 40px,
              rgba(0, 0, 0, 0.2) 48px,
              rgba(0, 0, 0, 0.1) 56px,
              transparent 64px
            )`,
          }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(0deg, transparent 0px, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "3px 3px",
          }}
        />

        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/25 via-white/10 to-transparent" />

        {/* Top curtain rod shadow */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />
      </div>

      {/* Logo/Marka ortada fade-out */}
      <div className="absolute inset-0 flex items-center justify-center animate-[fade-out_2.5s_ease-in-out_0.5s_forwards]">
      
      </div>
    </div>
  )
}

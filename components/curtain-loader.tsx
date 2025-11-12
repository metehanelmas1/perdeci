"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-[65vw] animate-curtain-left">
        <div className="relative w-full h-full scale-150">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/realistic-vector-background-golden-flowing-fabric-texture-sCblKeBFb6YqRNhxBB2snUY7jh0UNj.png"
            alt="Sol Perde"
            fill
            className="object-cover object-right"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="absolute top-0 right-0 h-full w-[65vw] animate-curtain-right">
        <div className="relative w-full h-full scale-150">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/realistic-vector-background-golden-flowing-fabric-texture-sCblKeBFb6YqRNhxBB2snUY7jh0UNj.png"
            alt="Sağ Perde"
            fill
            className="object-cover object-left"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}

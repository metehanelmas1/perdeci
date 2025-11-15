"use client"

import { useEffect, useRef, useState } from "react"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const render = () => {
      if (!video.videoWidth || !video.videoHeight) {
        animationId = requestAnimationFrame(render)
        return
      }

      const vw = video.videoWidth
      const vh = video.videoHeight
      const cw = canvas.width
      const ch = canvas.height

      // cover mantığı
      const scale = Math.max(cw / vw, ch / vh)
      const x = (cw - vw * scale) / 2
      const y = (ch - vh * scale) / 2

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(video, x, y, vw * scale, vh * scale)

      // hafif yeşil temizleme filtresi
      try {
        const imageData = ctx.getImageData(0, 0, cw, ch)
        const d = imageData.data

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]

          // YEŞİL HALO TEMİZLEME - maksimum agresif
          const greenDiff = g - Math.max(r, b)
          
          // Hafif yeşil halo - güçlü temizleme
          if (greenDiff > 15 && g > 80) {
            d[i + 3] = Math.floor(d[i + 3] * 0.3)
          }

          // Orta yeşil - çok güçlü temizle
          if (greenDiff > 35 && g > 120) {
            d[i + 3] = Math.floor(d[i + 3] * 0.1)
          }

          // Parlak yeşil - tamamen kaldır
          if (greenDiff > 50 && g > 140 && r < 120 && b < 120) {
            d[i + 3] = 0
          }
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (e) {
        console.warn("alpha process skipped:", e)
      }

      animationId = requestAnimationFrame(render)
    }

    const start = () => {
      video.playbackRate = 3.5
      video.play().then(() => {
        render()
      })
    }

    video.addEventListener("loadedmetadata", start)

    video.addEventListener("ended", () => {
      cancelAnimationFrame(animationId)
      setIsLoading(false)
    })

    if (video.readyState >= 1) start()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <video
        ref={videoRef}
        src="/seffaf_video.webm"
        className="hidden"
        muted
        playsInline
        preload="auto"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}

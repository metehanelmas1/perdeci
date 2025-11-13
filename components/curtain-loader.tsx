"use client"

import { useEffect, useRef, useState } from "react"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const processFrame = () => {
      if (!video || !canvas) return
      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(processFrame)
        return
      }

      const vw = video.videoWidth
      const vh = video.videoHeight
      const cw = canvas.width
      const ch = canvas.height

      ctx.clearRect(0, 0, cw, ch)
      
      // Video'yu OLDUĞU GİBİ çiz - aspect ratio koru, ekranı kapla
      const videoRatio = vw / vh
      const canvasRatio = cw / ch
      
      let drawW, drawH, offsetX, offsetY
      
      if (videoRatio > canvasRatio) {
        // Video daha geniş - yüksekliği eşitle
        drawH = ch
        drawW = ch * videoRatio
        offsetX = (cw - drawW) / 2
        offsetY = 0
      } else {
        // Video daha dar - genişliği eşitle
        drawW = cw
        drawH = cw / videoRatio
        offsetX = 0
        offsetY = (ch - drawH) / 2
      }
      
      ctx.drawImage(video, offsetX, offsetY, drawW, drawH)

      try {
        const imageData = ctx.getImageData(0, 0, cw, ch)
        const d = imageData.data

        // Her pixel için işlem - sadece beyazları temizle
        for (let y = 0; y < ch; y++) {
          for (let x = 0; x < cw; x++) {
            const i = (y * cw + x) * 4
            const r = d[i]
            const g = d[i + 1]
            const b = d[i + 2]
            const a = d[i + 3]

            // BEYAZ ALGILAMA - agresif beyaz temizleme
            let whiteMask = 0
            
            const avg = (r + g + b) / 3
            const maxCh = Math.max(r, g, b)
            const minCh = Math.min(r, g, b)
            const diff = maxCh - minCh
            
            // Beyaz: parlak + renksiz - agresif ama yumuşak
            if (avg > 190 && diff < 30 && minCh > 180) {
              // Çok parlak beyaz
              whiteMask = 1
            } else if (avg > 170 && diff < 35 && minCh > 160) {
              // Parlak beyaz
              const brightness = (avg - 170) / 30
              const colorless = 1 - (diff / 35)
              whiteMask = Math.min(1, brightness * colorless * 0.98)
            } else if (avg > 150 && diff < 40 && minCh > 140) {
              // Açık gri
              const brightness = (avg - 150) / 50
              const colorless = 1 - (diff / 40)
              whiteMask = Math.min(1, brightness * colorless * 0.92)
            } else if (avg > 130 && diff < 45 && minCh > 120) {
              // Orta açık gri
              const brightness = (avg - 130) / 65
              const colorless = 1 - (diff / 45)
              whiteMask = Math.min(1, brightness * colorless * 0.78)
            } else if (avg > 110 && diff < 50 && minCh > 100) {
              // Hafif açık ton
              const brightness = (avg - 110) / 80
              const colorless = 1 - (diff / 50)
              whiteMask = Math.min(1, brightness * colorless * 0.55)
            } else if (avg > 95 && diff < 52 && minCh > 85) {
              // Çok hafif açık ton
              const brightness = (avg - 95) / 95
              const colorless = 1 - (diff / 52)
              whiteMask = Math.min(1, brightness * colorless * 0.32)
            } else if (avg > 82 && diff < 55 && minCh > 72) {
              // Ultra hafif (tam kapanmadaki son beyazlıklar)
              const brightness = (avg - 82) / 110
              const colorless = 1 - (diff / 55)
              whiteMask = Math.min(1, brightness * colorless * 0.15)
            }

            // Alpha güncelle - maksimum temizleme
            d[i + 3] = Math.round(a * (1 - whiteMask * 0.998))
          }
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (err) {
        console.error("Canvas error:", err)
      }

      rafRef.current = requestAnimationFrame(processFrame)
    }

    const onLoaded = () => {
      video.playbackRate = 1.0
      video.play()
        .then(() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(processFrame)
        })
        .catch((e) => console.error("Video play error:", e))
    }

    const onEnded = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setTimeout(() => setIsLoading(false), 300)
    }

    video.addEventListener("loadeddata", onLoaded)
    video.addEventListener("ended", onEnded)

    if (video.readyState >= 2) onLoaded()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      video.removeEventListener("loadeddata", onLoaded)
      video.removeEventListener("ended", onEnded)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <video
        ref={videoRef}
        src="/video-animation.mp4"
        className="hidden"
        muted
        playsInline
        preload="auto"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  )
}

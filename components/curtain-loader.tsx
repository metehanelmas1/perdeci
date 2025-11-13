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

    // HD kalite ayarları - mobil ve desktop
    const setQuality = () => {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
    }
    setQuality()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setQuality()
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

            // BEYAZ ALGILAMA - dengeli köşe temizleme
            let whiteMask = 0
            
            const avg = (r + g + b) / 3
            const maxCh = Math.max(r, g, b)
            const minCh = Math.min(r, g, b)
            const diff = maxCh - minCh
            
            // Beyaz: parlak + renksiz - dengeli
            if (avg > 190 && diff < 32 && minCh > 180) {
              whiteMask = 1
            } else if (avg > 170 && diff < 38 && minCh > 160) {
              const brightness = (avg - 170) / 30
              const colorless = 1 - (diff / 38)
              whiteMask = Math.min(1, brightness * colorless * 0.98)
            } else if (avg > 150 && diff < 43 && minCh > 140) {
              const brightness = (avg - 150) / 50
              const colorless = 1 - (diff / 43)
              whiteMask = Math.min(1, brightness * colorless * 0.92)
            } else if (avg > 130 && diff < 48 && minCh > 120) {
              const brightness = (avg - 130) / 65
              const colorless = 1 - (diff / 48)
              whiteMask = Math.min(1, brightness * colorless * 0.78)
            } else if (avg > 110 && diff < 53 && minCh > 100) {
              const brightness = (avg - 110) / 80
              const colorless = 1 - (diff / 53)
              whiteMask = Math.min(1, brightness * colorless * 0.58)
            } else if (avg > 92 && diff < 57 && minCh > 82) {
              const brightness = (avg - 92) / 95
              const colorless = 1 - (diff / 57)
              whiteMask = Math.min(1, brightness * colorless * 0.35)
            } else if (avg > 78 && diff < 60 && minCh > 68) {
              const brightness = (avg - 78) / 110
              const colorless = 1 - (diff / 60)
              whiteMask = Math.min(1, brightness * colorless * 0.18)
            }

            // Alpha güncelle - dengeli temizleme
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
      
      // Mobil için video oynatma garantisi
      const playVideo = () => {
        video.play()
          .then(() => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(processFrame)
          })
          .catch((e) => {
            console.error("Video play error:", e)
            // Mobilde hata olursa tekrar dene
            setTimeout(playVideo, 100)
          })
      }
      
      playVideo()
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
        autoPlay
        webkit-playsinline="true"
        x5-playsinline="true"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  )
}

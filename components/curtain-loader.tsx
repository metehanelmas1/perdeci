"use client"

import { useEffect, useRef, useState } from "react"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    let animationId: number

    // Mobil/Desktop algılama
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const pixelRatio = window.devicePixelRatio || 1

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Mobilde akıllı çözünürlük - HD kalitede ama optimize
      if (isMobile) {
        // Retina ekranlar için pixel ratio kullan ama sınırla
        const optimalRatio = Math.min(pixelRatio, 2)
        canvas.width = width * optimalRatio
        canvas.height = height * optimalRatio
        // CSS boyutu tam ekran
        canvas.style.width = width + "px"
        canvas.style.height = height + "px"
      } else {
        // Desktop tam çözünürlük
        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio
        canvas.style.width = width + "px"
        canvas.style.height = height + "px"
      }
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

      // Kaliteli render için image smoothing
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"

      // cover mantığı - pixel perfect
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

          // YEŞİL HALO TEMİZLEME - ultra agresif
          const greenDiff = g - Math.max(r, b)
          
          // Hafif yeşil halo - çok güçlü temizleme
          if (greenDiff > 10 && g > 70) {
            d[i + 3] = Math.floor(d[i + 3] * 0.2)
          }

          // Orta yeşil - neredeyse tamamen sil
          if (greenDiff > 25 && g > 100) {
            d[i + 3] = Math.floor(d[i + 3] * 0.05)
          }

          // Parlak yeşil - tamamen kaldır
          if (greenDiff > 40 && g > 120 && r < 130 && b < 130) {
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
      // Mobilde daha hızlı, desktop'ta biraz daha yavaş
      video.playbackRate = isMobile ? 4.0 : 3.5
      video.play().then(() => {
        render()
      })
    }

    video.addEventListener("loadedmetadata", start)

    video.addEventListener("ended", () => {
      cancelAnimationFrame(animationId)
      // Fade-out başlat
      setFadeOut(true)
      // Fade-out sonrası kaldır
      setTimeout(() => setIsLoading(false), 800)
    })

    if (video.readyState >= 1) start()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-700 ease-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
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

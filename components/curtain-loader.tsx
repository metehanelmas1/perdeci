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

    // TANRI GİBİ KALİTE AYARLARI
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
      
      // Video'yu çiz - aspect ratio koru, ekranı kapla
      const videoRatio = vw / vh
      const canvasRatio = cw / ch
      
      let drawW, drawH, offsetX, offsetY
      
      if (videoRatio > canvasRatio) {
        drawH = ch * 1.15
        drawW = drawH * videoRatio
        offsetX = (cw - drawW) / 2
        offsetY = (ch - drawH) / 2
      } else {
        drawW = cw
        drawH = (cw / videoRatio) * 1.15
        offsetX = 0
        offsetY = (ch - drawH) / 2
      }
      
      ctx.drawImage(video, offsetX, offsetY, drawW, drawH)

      try {
        const imageData = ctx.getImageData(0, 0, cw, ch)
        const d = imageData.data

        // Optimize edilmiş beyaz temizleme
        const len = d.length
        for (let i = 0; i < len; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]
          const a = d[i + 3]

          const avg = (r + g + b) * 0.333
          const maxCh = Math.max(r, g, b)
          const minCh = Math.min(r, g, b)
          const diff = maxCh - minCh
          
          let whiteMask = 0
          
          if (avg > 188 && diff < 33 && minCh > 178) {
            whiteMask = 1
          } else if (avg > 168 && diff < 39 && minCh > 158) {
            whiteMask = ((avg - 168) * 0.033) * (1 - diff * 0.026) * 0.98
          } else if (avg > 148 && diff < 44 && minCh > 138) {
            whiteMask = ((avg - 148) * 0.02) * (1 - diff * 0.023) * 0.93
          } else if (avg > 128 && diff < 49 && minCh > 118) {
            whiteMask = ((avg - 128) * 0.015) * (1 - diff * 0.02) * 0.81
          } else if (avg > 108 && diff < 54 && minCh > 98) {
            whiteMask = ((avg - 108) * 0.0125) * (1 - diff * 0.019) * 0.62
          } else if (avg > 90 && diff < 58 && minCh > 80) {
            whiteMask = ((avg - 90) * 0.011) * (1 - diff * 0.017) * 0.4
          } else if (avg > 75 && diff < 61 && minCh > 65) {
            whiteMask = ((avg - 75) * 0.009) * (1 - diff * 0.016) * 0.22
          }

          d[i + 3] = (a * (1 - whiteMask * 0.999)) | 0
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (err) {
        console.error("Canvas error:", err)
      }

      rafRef.current = requestAnimationFrame(processFrame)
    }

    const onLoaded = () => {
      video.playbackRate = 1.60
      
      const playVideo = () => {
        video.play()
          .then(() => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(processFrame)
          })
          .catch((e) => {
            console.error("Video play error:", e)
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
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        src="/video-animation.webm"
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
        style={{
          background: "transparent",
          width: "100vw",
          height: "100vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          objectFit: "cover"
        }}
      />
    </div>
  )
}

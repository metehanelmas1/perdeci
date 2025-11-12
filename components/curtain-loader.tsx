"use client"

import { useEffect, useState, useRef } from "react"

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
      desynchronized: false, // Kalite için sync rendering
    })
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const processFrame = () => {
      if (!video || video.paused || video.ended) {
        rafRef.current = requestAnimationFrame(processFrame)
        return
      }

      if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        const videoAspect = video.videoWidth / video.videoHeight
        const canvasAspect = window.innerWidth / window.innerHeight

        let drawWidth, drawHeight, offsetX, offsetY

        if (videoAspect > canvasAspect) {
          drawHeight = window.innerHeight
          drawWidth = video.videoWidth * (window.innerHeight / video.videoHeight)
          offsetX = (window.innerWidth - drawWidth) / 2
          offsetY = 0
        } else {
          drawWidth = window.innerWidth
          drawHeight = video.videoHeight * (window.innerWidth / video.videoWidth)
          offsetX = 0
          offsetY = (window.innerHeight - drawHeight) / 2
        }

        const dpr = window.devicePixelRatio || 1
        ctx.clearRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr)
        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < data.length; i += 4) {
          const red = data[i]
          const green = data[i + 1]
          const blue = data[i + 2]

          if (green > 100 && green > red * 1.3 && green > blue * 1.3) {
            data[i + 3] = 0
          }
        }

        ctx.putImageData(imageData, 0, 0)
      }

      rafRef.current = requestAnimationFrame(processFrame)
    }

    const handleLoadedData = () => {
      video.playbackRate = 1.5
      video
        .play()
        .then(() => {
          rafRef.current = requestAnimationFrame(processFrame)
        })
        .catch((err) => console.error("Video play error:", err))
    }

    const handleTimeUpdate = () => {
      if (video.currentTime >= 10) {
        video.pause()
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 300)
      }
    }

    const handleEnded = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("ended", handleEnded)

    if (video.readyState >= 2) {
      handleLoadedData()
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-transparent pointer-events-none">
      <video
        ref={videoRef}
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/benj-517y7C8jtvhm0HbHN2E7x0Ktav23IN.mp4"
        className="hidden"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-transparent"
        style={{ background: "transparent" }}
      />
    </div>
  )
}

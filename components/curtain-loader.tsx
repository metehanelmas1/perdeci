"use client"

import { useEffect, useRef, useState } from "react"

type RGB = { r: number; g: number; b: number }

export function CurtainLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const backgroundColorRef = useRef<RGB | null>(null)
  const sampleFrameCountRef = useRef(0)

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

    // Ayarlanabilir parametreler
    const startHole = 0.02         // videonun başında delik genişliği (canvas genişliğine oran, 0..1)
    const maxHole = 0.45           // videonun sonunda delik genişliği (ör: 0.45 => ekranın %45'i ortada delik)
    const featherPx = 60           // delik kenarındaki yumuşatma (piksel)
    const holdAfterEndMs = 300     // video bitince kaç ms bekleyip kaldırılacak
    const sampleBorderRatio = 0.08 // arka plan örneklemesi için kenarlardan alınacak pay
    const backgroundHardCut = 35   // bu mesafenin altı tamamen şeffaf
    const backgroundSoftCut = 80   // bu mesafenin üstü tamamen opak, arası feather
    const sampleWindowSeconds = 1   // ilk X saniye boyunca renk örneklemesi yap
    const maxSampleFrames = 12      // toplam kaç kare örneği alınacak
    const whiteCenterThreshold = 230 // merkezdeki parlak beyaz için minimum RGB
    const centerXRatio = 0.35        // merkez bölgesi yatay yarıçap oranı
    const centerYRatio = 0.6         // merkez bölgesi dikey yarıçap oranı
    const whiteLuminanceThreshold = 0.88
    const whiteSaturationThreshold = 0.18
    const whiteFeather = 0.18
    const centerPreserveFalloff = 0.22

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

      // Draw image (cover)
      let drawW = cw, drawH = ch, dx = 0, dy = 0
      if (vw / vh > cw / ch) {
        drawH = ch
        drawW = (vw * ch) / vh
        dx = (cw - drawW) / 2
      } else {
        drawW = cw
        drawH = (vh * cw) / vw
        dy = (ch - drawH) / 2
      }

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(video, dx, dy, drawW, drawH)

      // get pixels
      try {
        const imageData = ctx.getImageData(0, 0, cw, ch)
        const d = imageData.data

        // progress -> 0..1
        const progress = video.duration && video.duration > 0
          ? Math.min(1, Math.max(0, video.currentTime / video.duration))
          : 1

        // Delik genişliğini video ilerlemesine göre ayarla
        const holeWidthRatio = startHole + (maxHole - startHole) * progress
        const holeHalfPx = (cw * holeWidthRatio) / 2

        const centerX = cw / 2

        // Feather normalizasyon (piksel cinsinden)
        const feather = Math.max(1, featherPx)

        // Kenar renklerini örnekleyerek arka plan rengini tespit et
        if (
          (backgroundColorRef.current === null ||
            (video.currentTime <= sampleWindowSeconds &&
              sampleFrameCountRef.current < maxSampleFrames)) &&
          cw > 0 &&
          ch > 0
        ) {
          const borderSize = Math.max(1, Math.floor(Math.min(cw, ch) * sampleBorderRatio))
          let sumR = 0
          let sumG = 0
          let sumB = 0
          let count = 0

          const samplePixel = (x: number, y: number) => {
            const idx = (y * cw + x) * 4
            sumR += d[idx]
            sumG += d[idx + 1]
            sumB += d[idx + 2]
            count++
          }

          for (let y = 0; y < borderSize; y++) {
            for (let x = 0; x < cw; x++) {
              samplePixel(x, y) // üst
              samplePixel(x, ch - 1 - y) // alt
            }
          }

          for (let x = 0; x < borderSize; x++) {
            for (let y = borderSize; y < ch - borderSize; y++) {
              samplePixel(x, y) // sol
              samplePixel(cw - 1 - x, y) // sağ
            }
          }

          if (count > 0) {
            backgroundColorRef.current = {
              r: sumR / count,
              g: sumG / count,
              b: sumB / count,
            }
            sampleFrameCountRef.current += 1
          }
        }

        const backgroundColor = backgroundColorRef.current
        const softRange = Math.max(1, backgroundSoftCut - backgroundHardCut)

        // Pixel başına alpha güncelle
        const centerY = ch / 2
        const centerRadiusX = cw * centerXRatio
        const centerRadiusY = ch * centerYRatio
        const invCenterRadiusX = centerRadiusX > 0 ? 1 / centerRadiusX : 0
        const invCenterRadiusY = centerRadiusY > 0 ? 1 / centerRadiusY : 0

        for (let y = 0; y < ch; y++) {
          const rowOffset = y * cw * 4
          const normalizedY = Math.abs(y - centerY) * invCenterRadiusY
          for (let x = 0; x < cw; x++) {
            const i = rowOffset + x * 4
            const origA = d[i + 3] // 0..255
            const r = d[i]
            const g = d[i + 1]
            const b = d[i + 2]

            // normalized distance from center (in pixels)
            const distX = Math.abs(x - centerX)
            const normalizedX = distX * invCenterRadiusX
            let holeMask = 0
            let whitenessMask = 0

            if (distX <= holeHalfPx) {
              holeMask = 1
            } else if (distX <= holeHalfPx + feather) {
              const t = (distX - holeHalfPx) / feather // 0..1
              const smooth = 1 - (t * t * (3 - 2 * t))
              holeMask = smooth
            }

            if (backgroundColor) {
              const dr = r - backgroundColor.r
              const dg = g - backgroundColor.g
              const db = b - backgroundColor.b
              const distance = Math.sqrt(dr * dr + dg * dg + db * db)

              if (distance <= backgroundHardCut) {
                whitenessMask = Math.max(whitenessMask, 1)
              } else if (distance <= backgroundSoftCut) {
                const t = (distance - backgroundHardCut) / softRange
                const smooth = 1 - (t * t * (3 - 2 * t))
                whitenessMask = Math.max(whitenessMask, smooth)
              }
            }

            if (
              normalizedX <= 1 &&
              normalizedY <= 1 &&
              r >= whiteCenterThreshold &&
              g >= whiteCenterThreshold &&
              b >= whiteCenterThreshold
            ) {
              const blend = 1 - Math.max(normalizedX, normalizedY) ** 2
              whitenessMask = Math.max(whitenessMask, blend)
            }

            const maxChannel = Math.max(r, g, b)
            const minChannel = Math.min(r, g, b)
            const luminance = maxChannel / 255
            const saturation = maxChannel === 0 ? 0 : (maxChannel - minChannel) / maxChannel

            if (luminance >= whiteLuminanceThreshold && saturation <= whiteSaturationThreshold) {
              const lumFactor = (luminance - whiteLuminanceThreshold) / Math.max(0.0001, 1 - whiteLuminanceThreshold)
              const satFactor = whiteSaturationThreshold <= 0 ? 1 : 1 - Math.min(1, saturation / whiteSaturationThreshold)
              const whiteness = Math.min(1, lumFactor * 0.9 + satFactor * 0.6)
              const excess = Math.max(0, normalizedX - 1)
              const featherAdjust =
                whiteFeather > 0
                  ? Math.max(0, 1 - Math.min(1, excess / whiteFeather))
                  : 1
              whitenessMask = Math.max(whitenessMask, whiteness * featherAdjust)
            }

            const preserveFactor =
              normalizedX <= 1
                ? 1
                : Math.max(
                    0.05,
                    1 - Math.min(1, (normalizedX - 1) / Math.max(0.0001, centerPreserveFalloff))
                  )
            const combinedMask = Math.max(holeMask, whitenessMask * preserveFactor)

            const intensity = 0.92
            d[i + 3] = Math.round(origA * (1 - combinedMask * intensity))
          }
        }

        ctx.putImageData(imageData, 0, 0)
      } catch (err) {
        console.error("getImageData error:", err)
      }

      rafRef.current = requestAnimationFrame(processFrame)
    }

    const onLoaded = () => {
      video.playbackRate = 1.0
      video
        .play()
        .then(() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(processFrame)
        })
        .catch((e) => {
          console.error("Video play failed:", e)
          rafRef.current = requestAnimationFrame(processFrame)
        })
    }

    const onEnded = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setTimeout(() => setIsLoading(false), holdAfterEndMs)
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
        src="/video-animation.webm"
        className="hidden"
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  )
}

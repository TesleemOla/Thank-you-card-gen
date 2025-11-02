"use client"

import type React from "react"

import { useEffect } from "react"

interface CardSettings {
  name: string
  fontSize: number
  fontFamily: string
  textColor: string
  thankYouFontSize: number
}

interface CardPreviewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  imageUrl: string | null
  settings: CardSettings
}

export default function CardPreview({ canvasRef, imageUrl, settings }: CardPreviewProps) {
  useEffect(() => {
    if (!canvasRef.current || !imageUrl) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions (4:5 aspect ratio)
    const width = 400
    const height = 500
    canvas.width = width
    canvas.height = height

    // Load and draw image
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Draw image
      ctx.drawImage(img, 0, 0, width, height)

      // Draw semi-transparent overlay for text readability
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
      ctx.fillRect(0, 0, width, height)

      // Draw "Thank You" text at top
      ctx.font = `bold ${settings.thankYouFontSize}px ${settings.fontFamily}`
      ctx.fillStyle = settings.textColor
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = 10
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2
      ctx.fillText("Thank You", width / 2, 40)

      // Draw name at bottom
      ctx.font = `${settings.fontSize}px ${settings.fontFamily}`
      ctx.fillStyle = settings.textColor
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(settings.name, width / 2, height - 40)
    }
    img.src = imageUrl
  }, [canvasRef, imageUrl, settings])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-sm aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden shadow-xl">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">4:5 Aspect Ratio • Ready to Download</p>
    </div>
  )
}

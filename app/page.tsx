"use client"

import { useState, useRef } from "react"
import ImageSelector from "@/components/image-selector"
import CardPreview from "@/components/card-preview"
import TextCustomizer from "@/components/text-customizer"
import { Button } from "@/components/ui/button"
import { Download, Sparkles } from "lucide-react"

interface CardSettings {
  name: string
  fontSize: number
  fontFamily: string
  textColor: string
  thankYouFontSize: number
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [cardSettings, setCardSettings] = useState<CardSettings>({
    name: "Your Name",
    fontSize: 48,
    fontFamily: "serif",
    textColor: "#ffffff",
    thankYouFontSize: 56,
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleDownload = async () => {
    if (!selectedImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = `thank-you-card-${Date.now()}.png`
    link.click()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Thank You Card Creator</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Design personalized cards with beautiful images
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Selector */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Select Image</h2>
              <ImageSelector onImageSelect={setSelectedImage} />
            </div>

            {/* Text Customizer */}
            {selectedImage && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Customize Text</h2>
                <TextCustomizer settings={cardSettings} onSettingsChange={setCardSettings} />
              </div>
            )}

            {/* Download Button */}
            {selectedImage && (
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Card
              </Button>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Preview</h2>
              <CardPreview canvasRef={canvasRef} imageUrl={selectedImage} settings={cardSettings} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

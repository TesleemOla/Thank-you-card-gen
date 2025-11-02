"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface CardSettings {
  name: string
  fontSize: number
  fontFamily: string
  textColor: string
  thankYouFontSize: number
}

interface TextCustomizerProps {
  settings: CardSettings
  onSettingsChange: (settings: CardSettings) => void
}

const FONT_FAMILIES = [
  { value: "serif", label: "Serif" },
  { value: "sans-serif", label: "Sans Serif" },
  { value: "monospace", label: "Monospace" },
  { value: "cursive", label: "Cursive" },
]

const COLORS = ["#ffffff", "#000000", "#ff6b6b", "#4ecdc4", "#45b7d1", "#ffd93d", "#6bcf7f", "#ff8c42"]

export default function TextCustomizer({ settings, onSettingsChange }: TextCustomizerProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, name: e.target.value })
  }

  const handleFontSizeChange = (value: number[]) => {
    onSettingsChange({ ...settings, fontSize: value[0] })
  }

  const handleThankYouFontSizeChange = (value: number[]) => {
    onSettingsChange({ ...settings, thankYouFontSize: value[0] })
  }

  const handleFontFamilyChange = (family: string) => {
    onSettingsChange({ ...settings, fontFamily: family })
  }

  const handleColorChange = (color: string) => {
    onSettingsChange({ ...settings, textColor: color })
  }

  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          value={settings.name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="mt-2"
          maxLength={30}
        />
      </div>

      {/* Name Font Size */}
      <div>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Name Font Size: {settings.fontSize}px
        </Label>
        <Slider
          value={[settings.fontSize]}
          onValueChange={handleFontSizeChange}
          min={24}
          max={72}
          step={2}
          className="mt-2"
        />
      </div>

      {/* Thank You Font Size */}
      <div>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          "Thank You" Font Size: {settings.thankYouFontSize}px
        </Label>
        <Slider
          value={[settings.thankYouFontSize]}
          onValueChange={handleThankYouFontSizeChange}
          min={32}
          max={96}
          step={2}
          className="mt-2"
        />
      </div>

      {/* Font Family */}
      <div>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Font Style</Label>
        <div className="grid grid-cols-2 gap-2">
          {FONT_FAMILIES.map((font) => (
            <button
              key={font.value}
              onClick={() => handleFontFamilyChange(font.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                settings.fontFamily === font.value
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              style={{ fontFamily: font.value }}
            >
              {font.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div>
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">Text Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-full aspect-square rounded-lg border-2 transition-all ${
                settings.textColor === color
                  ? "border-slate-900 dark:border-white scale-110"
                  : "border-slate-300 dark:border-slate-600"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

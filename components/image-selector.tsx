"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ImageSelectorProps {
  onImageSelect: (url: string) => void
}

export default function ImageSelector({ onImageSelect }: ImageSelectorProps) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchRandomImages = useCallback(async (query = "", pageNum = 1) => {
    setLoading(true)
    try {
      const endpoint = query
        ? `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${pageNum}&per_page=4&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
        : `https://api.unsplash.com/photos/random?count=4&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`

      const response = await fetch(endpoint)
      const data = await response.json()

      if (query) {
        const imageUrls = data.results?.map((img: any) => img.urls.regular) || []
        setImages(imageUrls)
        setHasMore(data.total > pageNum * 4)
      } else {
        const imageUrls = Array.isArray(data) ? data.map((img: any) => img.urls.regular) : [data.urls.regular]
        setImages(imageUrls)
      }
      setPage(pageNum)
    } catch (error) {
      console.error("Failed to fetch images:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      fetchRandomImages(searchQuery, 1)
    }
  }

  const handleRefresh = () => {
    setSearchQuery("")
    setPage(1)
    fetchRandomImages()
  }

  const handleNextPage = () => {
    if (searchQuery.trim()) {
      fetchRandomImages(searchQuery, page + 1)
    }
  }

  const handlePrevPage = () => {
    if (page > 1 && searchQuery.trim()) {
      fetchRandomImages(searchQuery, page - 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </Button>
      </form>

      {/* Refresh Button */}
      <Button onClick={handleRefresh} variant="outline" className="w-full bg-transparent" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {searchQuery ? "Clear Search" : "Get Random Images"}
      </Button>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3">
        {images.map((url, idx) => (
          <button
            key={idx}
            onClick={() => onImageSelect(url)}
            className="relative aspect-video rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg group"
          >
            <Image
              src={url || "/placeholder.svg"}
              alt={`Image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Pagination */}
      {searchQuery && (
        <div className="flex items-center justify-between gap-2">
          <Button onClick={handlePrevPage} variant="outline" size="sm" disabled={page === 1 || loading}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-slate-600 dark:text-slate-400">Page {page}</span>
          <Button onClick={handleNextPage} variant="outline" size="sm" disabled={!hasMore || loading}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Initial Load */}
      {images.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Click "Get Random Images" to start</p>
          <Button onClick={handleRefresh} className="w-full">
            Load Images
          </Button>
        </div>
      )}
    </div>
  )
}

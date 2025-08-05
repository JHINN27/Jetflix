'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play, Info, Volume2, VolumeX } from 'lucide-react'
import { movieApi, getImageUrl } from '@/lib/api'

export default function Hero() {
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const trending = await movieApi.getTrending()
        if (trending && trending.length > 0) {
          const movieDetails = await movieApi.getMovieDetails(trending[0].id)
          setFeaturedMovie(movieDetails)
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMovie()
  }, [])

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-32 left-8 space-y-4">
          <div className="w-96 h-12 bg-gray-800 rounded shimmer" />
          <div className="w-64 h-20 bg-gray-800 rounded shimmer" />
          <div className="flex space-x-4">
            <div className="w-32 h-12 bg-gray-800 rounded shimmer" />
            <div className="w-32 h-12 bg-gray-800 rounded shimmer" />
          </div>
        </div>
      </div>
    )
  }

  if (!featuredMovie) return null

  const formatRuntime = (minutes) => {
    if (!minutes) return ''
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(featuredMovie.backdrop_path, 'original')}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-4 pb-32">
          <div className="max-w-2xl space-y-6 fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {featuredMovie.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium">
                FEATURED
              </span>
              {featuredMovie.release_date && (
                <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
              )}
              {featuredMovie.runtime && (
                <span>{formatRuntime(featuredMovie.runtime)}</span>
              )}
              {featuredMovie.vote_average && (
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{featuredMovie.vote_average.toFixed(1)}</span>
                </span>
              )}
            </div>

            <p className="text-lg text-gray-200 leading-relaxed line-clamp-3">
              {featuredMovie.overview}
            </p>

            {featuredMovie.genres && featuredMovie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {featuredMovie.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
                <Play size={20} fill="currentColor" />
                <span>Play</span>
              </button>

              <button className="flex items-center space-x-2 bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200">
                <Info size={20} />
                <span>More Info</span>
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {featuredMovie.adult !== undefined && (
        <div className="absolute top-24 right-8 bg-yellow-600 text-black px-3 py-1 rounded font-bold text-sm">
          {featuredMovie.adult ? '18+' : '13+'}
        </div>
      )}
    </section>
  )
}
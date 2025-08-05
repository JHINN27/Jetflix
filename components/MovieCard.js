'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react'
import { getImageUrl } from '@/lib/api'

export default function MovieCard({ movie, size = 'normal' }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  if (!movie) return null

  const sizeClasses = {
    small: 'w-32 h-48 md:w-40 md:h-60',
    normal: 'w-40 h-60 md:w-48 md:h-72',
    large: 'w-48 h-72 md:w-56 md:h-84'
  }

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${sizeClasses[size]} flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={imageError ? '/placeholder-movie.jpg' : getImageUrl(movie.poster_path)}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 160px, 192px"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-yellow-400 text-xs flex items-center">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
            {movie.release_date && (
              <span className="text-gray-300 text-xs">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center justify-center w-8 h-8 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200"
              title="Play"
            >
              <Play size={14} fill="currentColor" />
            </Link>
            
            <button
              className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full hover:border-white hover:text-white transition-colors duration-200"
              title="Add to List"
            >
              <Plus size={14} />
            </button>
            
            <button
              className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full hover:border-white hover:text-white transition-colors duration-200"
              title="Like"
            >
              <ThumbsUp size={12} />
            </button>
            
            <Link
              href={`/movie/${movie.id}`}
              className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 text-gray-400 rounded-full hover:border-white hover:text-white transition-colors duration-200 ml-auto"
              title="More Info"
            >
              <ChevronDown size={14} />
            </Link>
          </div>
        </div>
      </div>

      {!movie.poster_path && (
        <div className="absolute inset-0 bg-gray-800 shimmer rounded-lg" />
      )}
    </div>
  )
}
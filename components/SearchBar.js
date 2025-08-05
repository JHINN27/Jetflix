'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { movieApi, getImageUrl } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setShowResults(false)
        return
      }

      setIsLoading(true)
      try {
        const searchResults = await movieApi.searchMovies(query)
        setResults(searchResults.results.slice(0, 6))
        setShowResults(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchMovies, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="w-full bg-gray-900/90 text-white pl-12 pr-12 py-3 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all duration-200"
          />
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-gray-700 max-h-96 overflow-y-auto z-10">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => {
                    setShowResults(false)
                    if (onClose) onClose()
                  }}
                >
                  <div className="relative w-12 h-16 flex-shrink-0">
                    <Image
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      fill
                      className="object-cover rounded"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
                  {movie.vote_average > 0 && (
                    <div className="text-yellow-400 text-sm font-medium">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  )}
                </Link>
              ))}
              
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="block px-4 py-3 text-center text-red-400 hover:text-red-300 border-t border-gray-700 transition-colors duration-200"
                onClick={() => {
                  setShowResults(false)
                  if (onClose) onClose()
                }}
              >
                View all results for "{query}"
              </Link>
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
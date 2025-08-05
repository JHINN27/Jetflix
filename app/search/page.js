'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import MovieCard from '@/components/MovieCard'
import Footer from '@/components/Footer'
import { movieApi } from '@/lib/api'
import { Search } from 'lucide-react'

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 18 }).map((_, index) => (
        <div key={index} className="w-full h-60 md:h-72 bg-gray-800 rounded-lg shimmer" />
      ))}
    </div>
  )
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    const searchMovies = async () => {
      if (!query.trim()) {
        setMovies([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)
      
      try {
        const results = await movieApi.searchMovies(query, currentPage)
        
        if (currentPage === 1) {
          setMovies(results.results)
        } else {
          setMovies(prev => [...prev, ...results.results])
        }
        
        setTotalPages(results.total_pages)
      } catch (error) {
        console.error('Search error:', error)
        setError('Failed to search movies. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    searchMovies()
  }, [query, currentPage])

  useEffect(() => {
    setCurrentPage(1)
    setMovies([])
  }, [query])

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  if (!query.trim()) {
    return (
      <div className="text-center py-16">
        <Search size={64} className="text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Search for Movies</h2>
        <p className="text-gray-400">Enter a movie title to start searching</p>
      </div>
    )
  }

  if (isLoading && movies.length === 0) {
    return <MovieGridSkeleton />
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
        <p className="text-gray-400">
          No movies found for "<span className="text-white">{query}</span>". Try a different search term.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Search results for "<span className="text-red-400">{query}</span>"
        </h1>
        <span className="text-gray-400">
          {movies.length} results
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            size="normal"
          />
        ))}
      </div>

      {currentPage < totalPages && (
        <div className="text-center py-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <Suspense fallback={<MovieGridSkeleton />}>
            <SearchResults />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  )
}
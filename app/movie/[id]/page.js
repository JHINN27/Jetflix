import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Play, Plus, Star, Clock, Calendar } from 'lucide-react'
import Header from '@/components/Header'
import MovieRow from '@/components/MovieRow'
import Footer from '@/components/Footer'
import { movieApi, getImageUrl } from '@/lib/api'

export default async function MovieDetailPage({ params }) {
  const { id } = params
  
  let movie = null
  let similarMovies = []

  try {
    movie = await movieApi.getMovieDetails(id)
    similarMovies = movie.similar?.results || []
  } catch (error) {
    console.error('Error fetching movie details:', error)
    notFound()
  }

  if (!movie) {
    notFound()
  }

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        <Link
          href="/"
          className="absolute top-24 left-8 z-10 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <ArrowLeft size={24} />
          <span>Back to Home</span>
        </Link>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl">
              <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  <div className="relative w-64 h-96 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="256px"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <h1 className="text-4xl lg:text-6xl font-bold">{movie.title}</h1>

                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    {movie.release_date && (
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                    )}
                    {movie.runtime && (
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    )}
                    {movie.vote_average && (
                      <div className="flex items-center space-x-2">
                        <Star size={16} className="text-yellow-400" />
                        <span>{movie.vote_average.toFixed(1)}/10</span>
                      </div>
                    )}
                  </div>

                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-gray-800/80 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-lg text-gray-200 leading-relaxed">
                    {movie.overview}
                  </p>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200">
                      <Play size={20} fill="currentColor" />
                      <span>Watch Now</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200">
                      <Plus size={20} />
                      <span>Add to List</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {movie.credits && movie.credits.cast && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="space-y-2">
                  {movie.credits.cast.slice(0, 8).map((person) => (
                    <div key={person.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        {person.profile_path ? (
                          <Image
                            src={getImageUrl(person.profile_path)}
                            alt={person.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">
                            {person.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{person.name}</p>
                        <p className="text-gray-400 text-sm">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              <div className="space-y-3">
                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div>
                    <span className="text-gray-400">Production: </span>
                    <span className="text-white">
                      {movie.production_companies.map(company => company.name).join(', ')}
                    </span>
                  </div>
                )}
                {movie.budget > 0 && (
                  <div>
                    <span className="text-gray-400">Budget: </span>
                    <span className="text-white">{formatCurrency(movie.budget)}</span>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <span className="text-gray-400">Revenue: </span>
                    <span className="text-white">{formatCurrency(movie.revenue)}</span>
                  </div>
                )}
                {movie.original_language && (
                  <div>
                    <span className="text-gray-400">Language: </span>
                    <span className="text-white">{movie.original_language.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Status: </span>
                  <span className="text-white">{movie.status}</span>
                </div>
                {movie.tagline && (
                  <div>
                    <span className="text-gray-400">Tagline: </span>
                    <span className="text-white italic">"{movie.tagline}"</span>
                  </div>
                )}
                {movie.homepage && (
                  <div>
                    <span className="text-gray-400">Official Site: </span>
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {similarMovies.length > 0 && (
        <MovieRow
          title="Similar Movies"
          movies={similarMovies}
        />
      )}

      <Footer />
    </div>
  )
}
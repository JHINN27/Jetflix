import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MovieRow from '@/components/MovieRow'
import Footer from '@/components/Footer'
import { movieApi } from '@/lib/api'

export default async function HomePage() {
  let moviesData = {
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    actionMovies: [],
    comedyMovies: []
  }

  try {
    const [trending, popular, topRated, upcoming, actionMovies, comedyMovies] = await Promise.all([
      movieApi.getTrending(),
      movieApi.getPopular(),
      movieApi.getTopRated(),
      movieApi.getUpcoming(),
      movieApi.getByGenre(28),
      movieApi.getByGenre(35)
    ])

    moviesData = {
      trending,
      popular,
      topRated,
      upcoming,
      actionMovies,
      comedyMovies
    }
  } catch (error) {
    console.error('Error fetching movies data:', error)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <Hero />

      <div className="relative z-10 -mt-32">
        <MovieRow
          title="Trending Now"
          movies={moviesData.trending}
          size="large"
        />
        
        <MovieRow
          title="Popular Movies"
          movies={moviesData.popular}
        />
        
        <MovieRow
          title="Top Rated"
          movies={moviesData.topRated}
        />
        
        <MovieRow
          title="Action Movies"
          movies={moviesData.actionMovies}
        />
        
        <MovieRow
          title="Comedy Movies"
          movies={moviesData.comedyMovies}
        />
        
        <MovieRow
          title="Coming Soon"
          movies={moviesData.upcoming}
          size="small"
        />
      </div>

      <Footer />
    </div>
  )
}
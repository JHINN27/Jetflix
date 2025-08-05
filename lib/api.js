const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-movie.jpg'
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const movieApi = {
  getTrending: async () => {
    try {
      const response = await api.get('/trending/movie/week')
      return response.data.results
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      throw error
    }
  },

  getPopular: async (page = 1) => {
    try {
      const response = await api.get('/movie/popular', {
        params: { page }
      })
      return response.data.results
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      throw error
    }
  },

  getByGenre: async (genreId, page = 1) => {
    try {
      const response = await api.get('/discover/movie', {
        params: {
          with_genres: genreId,
          page,
          sort_by: 'popularity.desc'
        }
      })
      return response.data.results
    } catch (error) {
      console.error('Error fetching movies by genre:', error)
      throw error
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos,credits,similar'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching movie details:', error)
      throw error
    }
  },

  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false
        }
      })
      return response.data
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    }
  },

  getGenres: async () => {
    try {
      const response = await api.get('/genre/movie/list')
      return response.data.genres
    } catch (error) {
      console.error('Error fetching genres:', error)
      throw error
    }
  },

  getUpcoming: async () => {
    try {
      const response = await api.get('/movie/upcoming')
      return response.data.results
    } catch (error) {
      console.error('Error fetching upcoming movies:', error)
      throw error
    }
  },

  getTopRated: async () => {
    try {
      const response = await api.get('/movie/top_rated')
      return response.data.results
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      throw error
    }
  }
}
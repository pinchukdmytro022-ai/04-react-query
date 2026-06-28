import axios from 'axios';
import type { Movie } from '../types/movie';

axios.defaults.baseURL = `https://api.themoviedb.org/3`;
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<Movie[]> {
  const { data } = await axios.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data.results;
}

export default fetchMovies;
import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MoviesResponse{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


axios.defaults.baseURL = `https://api.themoviedb.org/3`;
const myKey = import.meta.env.VITE_TMDB_TOKEN;

async function fetchMovies(query: string, page: number): Promise<MoviesResponse> { 
  const { data } = await axios.get<MoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return data;
}

export default fetchMovies;
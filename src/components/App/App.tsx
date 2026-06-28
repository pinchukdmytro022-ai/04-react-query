import { useState } from 'react'
import './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() { 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const onSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast('No movies found for your request.');
        return
      }

      setMovies(results);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const onClose = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={onSelect} movies={movies} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose} />}
    </>
  );
}

export default App;
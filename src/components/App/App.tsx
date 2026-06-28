import { useEffect, useState } from 'react';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies, { type MoviesResponse } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";


type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;


function App() { 
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);


  const onSubmit = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const onClose = () => {
    setSelectedMovie(null);
  };

  const { data, isLoading, isError } = useQuery<MoviesResponse>({
    queryKey: ['movieKey', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      toast('No movies found for your request.');
    }
    }, [data])
  
  const handlePageClick = (e: {selected: number}) => {
      setPage(e.selected +1)
  }



  return (
    <>
      <Toaster />
      <SearchBar onSubmit={onSubmit} />
      {data && data.total_pages > 1 && <ReactPaginate
        pageCount={data.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        previousLabel="←"
        nextLabel="→"
      />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && <MovieGrid onSelect={onSelect} movies={data.results} />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose} />}
    </>
  );
}

export default App;
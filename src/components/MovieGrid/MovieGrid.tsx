import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps { 
    onSelect: (movie: Movie) => void;
    movies: Movie[];
}

function MovieGrid({ onSelect, movies }: MovieGridProps) { 

    const markup = movies.map(movie => (<li key={movie.id} onClick={()=>onSelect(movie)}>
          <div className={css.card}>
          <img
            className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
          <h2 className={css.title}>{movie.title}</h2>
        </div></li>)
      )
  return (
    <ul className={css.grid}>
      {markup}
      
    </ul>
  );
}

export default MovieGrid;
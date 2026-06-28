import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';
import { useEffect } from 'react';

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
    useEffect(() => {
        const onEscapeClose = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', onEscapeClose);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onEscapeClose)
            document.body.style.overflow = '';
        }
    }, [onClose])
    
    const onBackdropClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose()
        
    }

    return createPortal(
        <div className={css.backdrop} role="dialog" onClick={onBackdropClose} aria-modal="true">
            <div className={css.modal}>
                <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                </div>
            </div>
        </div>, document.body
    );
}

export default MovieModal;
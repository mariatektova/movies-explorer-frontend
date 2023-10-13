import React, { useState, useMemo, memo } from 'react';

import useResize from '../../hooks/useResize';

import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { MOVIESQUANTITYRENDER, ADDMOREMOVIES } from '../../utils/constants';

const MoviesList = ({
    movies,
}) => {
    const size = useResize();
    const [isMoviesAdd, setIsMoviesAdd] = useState(0);

    const moviesQuantity = useMemo(() => {
        const moviesQuantityRendering = MOVIESQUANTITYRENDER(size)
        return movies.slice(0, isMoviesAdd + moviesQuantityRendering);
    }, [movies, isMoviesAdd, size]);

    const handleClick = () => {
        setIsMoviesAdd((prev) => prev + ADDMOREMOVIES(size));
    }

    return (
        <>
            <ul className="movies__list">
                {moviesQuantity.map((card) => <MoviesCard key={card.id} card={card} />)}
            </ul>
            {movies.length > moviesQuantity.length && <button className="movies__button-add" onClick={handleClick}>Еще</button>}
        </>
    );
}

export default memo(MoviesList);
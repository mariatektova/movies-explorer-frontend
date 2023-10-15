import React, { useState, useMemo, memo, useEffect } from 'react';

import useResize from '../../hooks/useResize';

import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { MOVIESQUANTITYRENDER, ADDMOREMOVIES } from '../../utils/constants';

const MoviesList = ({
    movies,
}) => {
    let size = useResize();
    const [isMoviesAdd, setIsMoviesAdd] = useState(0);

    useEffect(() => {
        if (size) {
            setIsMoviesAdd(0);
        }
    }, [movies, size]);


    const moviesQuantity = useMemo(() => {
        const countToRender = MOVIESQUANTITYRENDER(size);
        return movies.slice(0, countToRender + isMoviesAdd);
    }, [movies, isMoviesAdd, size]);

    const handleClick = () => {
        setIsMoviesAdd((prev) => prev + ADDMOREMOVIES(size));
    }

    return (
        <>
            <ul className="movies__list">
                {moviesQuantity.map((card) => <MoviesCard key={card.id} card={card} />)}
            </ul>
            {movies.length > moviesQuantity.length && <button className="movies__button-add" onClick={handleClick}>
                Еще</button>}
        </>
    );
}

export default memo(MoviesList);
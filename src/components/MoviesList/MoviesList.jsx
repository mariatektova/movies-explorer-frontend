import React, { useState, useMemo, memo } from 'react';

import { useLocation } from 'react-router-dom';
import useResize from '../../hooks/useResize';

import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { mobSize, tabSize, desktopSize } from '../../utils/constants';

const MoviesList = ({
    movies,
}) => {
    const location = useLocation()
    const size = useResize();

    const [isMoviesAdd, setIsMoviesAdd] = useState(0);

    const moviesQuantity = useMemo(() => {
        const moviesQuantatyRendering = size.width < mobSize ? 5 : size.width < tabSize ? 4 : size.width < desktopSize ? 8 : 12;
        return movies.slice(0, isMoviesAdd + moviesQuantatyRendering);
    }, [movies, isMoviesAdd, size]);

    const handleClick = () => {
        setIsMoviesAdd((prev) => prev + (size.width >= desktopSize ? 3 : 2));
    }

    return (
        <>
            <ul className="movies__list">
                {moviesQuantity.map((card) => {
                    return (<MoviesCard key={card.id || card.movieId} card={card} />)
                })}
            </ul>
            {location.pathname === '/movies' && movies.length > moviesQuantity.length && (
                <button className="movies__button-add" onClick={handleClick}>Еще</button>)}
        </>
    );
}

export default memo(MoviesList);
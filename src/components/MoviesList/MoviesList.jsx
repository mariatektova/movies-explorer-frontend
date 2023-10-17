import React, { memo } from 'react';


import './MoviesList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesList = ({
    movies,
}) => {

    return (
        <ul className="movies__list">
            {movies.map((card) => <MoviesCard key={card.id} card={card} />)}
        </ul>
    );
}

export default memo(MoviesList);
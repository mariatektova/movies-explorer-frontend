import React, {memo} from 'react';

import './MoviesList.css';

import SavedMoviesCard from "../SavedMoviesCard/MoviesCard";

const SavedMoviesList = ({movies}) => (
    <ul className="movies__list">
        {movies.map((card) => <SavedMoviesCard key={card.movieId} card={card} />)}
    </ul>
);

export default memo(SavedMoviesList);
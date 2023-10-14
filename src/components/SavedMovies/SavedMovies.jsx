import React, { useCallback, useContext, useState } from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
//import Loader from '../Loader/Loader';
import ProtectedRoute from "../ProtectedRoute";
import SavedMoviesList from "../SavedMoviesList/MoviesList";
import Loader from '../Loader/Loader';

import { CurrentUserContext } from '../../context/CurrentUserContext';

const SavedMovies = () => {
    const { savedMovies } = useContext(CurrentUserContext);
    const localStorageValues = JSON.parse(localStorage.getItem(`saved-movies`)) ?? {};

    const [searchQuery, setSearchQuery] = useState(localStorageValues.searchQuery ?? ``);
    const [isShort, setShort] = useState(!!localStorageValues.isShort);
    const [isFetched, setFetched] = useState(!!savedMovies.length);

    const handleSearch = useCallback((query, isShort) => {
        setSearchQuery(query)
        setShort(isShort);
        setFetched(true);

        localStorage.setItem(`saved-movies`, JSON.stringify({
            searchQuery: query,
            isShort
        }));
    }, []);

    const filteredMovies = savedMovies.filter((movie) => {
        const lowerNameRu = movie.nameRU.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        return (lowerNameRu.includes(lowerQuery)) && (movie.duration < 40 || !isShort);
    });

    const isEmpty = !!isFetched && !filteredMovies.length;

    return (
        <ProtectedRoute>
            <section className="savedmovies">
                <SearchForm handleSearch={handleSearch} presetSearchQuery={searchQuery} presetIsShort={isShort} />
                <>
                    {!!isEmpty && <p className="movies__not-found">По вашему запросу ничего не найдено</p>}
                    {!isEmpty && <SavedMoviesList movies={filteredMovies} />}

                </>
            </section>
        </ProtectedRoute>
    );
};

export default SavedMovies;

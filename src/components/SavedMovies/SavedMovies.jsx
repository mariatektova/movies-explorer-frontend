import React, { useCallback, useContext, useState } from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import Loader from '../Loader/Loader';
import ProtectedRoute from "../ProtectedRoute";
import SavedMoviesList from "../SavedMoviesList/MoviesList";

import { CurrentUserContext } from '../../context/CurrentUserContext';

const SavedMovies = () => {
    const { savedMovies } = useContext(CurrentUserContext);
    const localStorageValues = JSON.parse(localStorage.getItem(`saved-movies`)) ?? {};

    const [searchQuery, setSearchQuery] = useState(localStorageValues.searchQuery ?? ``);
    const [isShort, setShort] = useState(!!localStorageValues.isShort);

    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback((q) => {
        setIsLoading(true);
        setSearchQuery(q);
        localStorage.setItem(`saved-movies`, JSON.stringify({
            searchQuery: q,
            isShort
        }));
        setTimeout(() => setIsLoading(false), 200);
    }, [isShort]);

    const handleShortChange = useCallback((v) => {
        setShort(v);
        localStorage.setItem(`saved-movies`, JSON.stringify({
            searchQuery,
            isShort: v
        }))
    }, [searchQuery]);

    const filteredMovies = savedMovies.filter((movie) => {
        const lowerNameRu = movie.nameRU.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        return (lowerNameRu.includes(lowerQuery)) && (movie.duration < 40 || !isShort);
    });

    const isEmpty = !filteredMovies.length;

    return (
        <ProtectedRoute>
            <section className="savedmovies">
                <SearchForm handleSearch={handleSearch} handleShortChange={handleShortChange} presetSearchQuery={searchQuery} presetIsShort={isShort} />

                {!!isLoading && <Loader />}

                {!isLoading && (
                    <>
                        {!!isEmpty && <p className="movies__not-found">По вашему запросу ничего не найдено</p>}
                        {!isEmpty && <SavedMoviesList movies={filteredMovies} />}
                    </>
                )}
            </section>
        </ProtectedRoute>
    );
};

export default SavedMovies;

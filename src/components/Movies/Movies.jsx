import "./Movies.css";
import React, { useState, useCallback } from "react";

import MoviesList from "../MoviesList/MoviesList";
import SearchForm from "../SearchForm/SearchForm";
import Loader from "../Loader/Loader";
import ProtectedRoute from "../ProtectedRoute";

import ApiMovies from "../../utils/ApiMovies";

const Movies = () => {
    const localStorageValues = JSON.parse(localStorage.getItem(`movies`)) ?? {};

    const [movies, setMovies] = useState(localStorageValues.movies ?? []);
    const [searchQuery, setSearchQuery] = useState(localStorageValues.searchQuery ?? ``);
    const [isShort, setShort] = useState(!!localStorageValues.isShort);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = useCallback(async (q) => {
        if (!q) {
            setSearchQuery(``);
            setMovies([]);
            localStorage.setItem(`movies`, JSON.stringify({
                searchQuery: ``,
                isShort,
                movies: []
            }));
            return;
        }
        setIsLoading(true);

        const moviesRes = await ApiMovies.request();
        const filteredMovies = moviesRes.filter((movie) => {
            const lowerNameRu = movie.nameRU.toLowerCase();
            const lowerQuery = q.toLowerCase();
            return lowerNameRu.includes(lowerQuery);
        });

        setSearchQuery(q);


        setMovies(filteredMovies);
        localStorage.setItem(`movies`, JSON.stringify({
            searchQuery: q,
            isShort,
            movies: filteredMovies
        }));
        setIsLoading(false);

    }, [isShort]);

    const handleShortChange = useCallback((v) => {
        setShort(v);
        localStorage.setItem(`movies`, JSON.stringify({
            searchQuery,
            isShort: v,
            movies
        }));
    }, [movies, searchQuery]);

    const filteredMovies = movies.filter((movie) => {
        return movie.duration < 40 || !isShort;
    });

    const isEmpty = !filteredMovies.length || !searchQuery;

    return (
        <ProtectedRoute>
            <section className="movies">
                <SearchForm handleSearch={handleSearch} handleShortChange={handleShortChange} presetSearchQuery={searchQuery} presetIsShort={isShort} />

                {!!isLoading && <Loader />}

                {!isLoading && (
                    <>
                        {!!isEmpty && <p className="movies__not-found">По вашему запросу ничего не найдено</p>}
                        {!isEmpty && <MoviesList movies={filteredMovies} />}
                    </>
                )}
            </section>
        </ProtectedRoute>
    );
};
export default Movies;
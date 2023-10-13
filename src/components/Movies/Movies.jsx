/* eslint-disable react-hooks/exhaustive-deps */
import "./Movies.css";
import React, { useState, useCallback, useContext } from "react";

import MoviesList from "../MoviesList/MoviesList";
import SearchForm from "../SearchForm/SearchForm";
import Loader from "../Loader/Loader";
import ProtectedRoute from "../ProtectedRoute";

import ApiMovies from "../../utils/ApiMovies";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useEffect } from "react";

const Movies = () => {
    const localStorageValues = JSON.parse(localStorage.getItem(`movies`)) ?? {};
    const { allMovies, setAllMovies } = useContext(CurrentUserContext);

    const [searchQuery, setSearchQuery] = useState(localStorageValues.query ?? ``);
    const [isShort, setShort] = useState(!!localStorageValues.isShort);
    const [isFetching, setFetching] = useState(false);
    const [isFetched, setFetched] = useState(!!allMovies.length);

    const handleSearch = useCallback(async (query, isShort) => {
        setFetching(true);

        let movies = allMovies;

        if (!movies.length) {
            movies = await ApiMovies.request();
            setAllMovies(movies);
        }

        setSearchQuery(query);
        setShort(isShort);
        setFetched(true);
        setFetching(false);
        localStorage.setItem(`movies`, JSON.stringify({
            query,
            isShort

        }));
    }, [allMovies.length]);

    const filteredMovies = allMovies.filter((movie) => {
        const lowerNameRu = movie.nameRU.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        return lowerNameRu.includes(lowerQuery) && (movie.duration < 40 || !isShort);
    });

    useEffect(() => {
        if ((!isFetched && !!searchQuery) || !!isShort) {
            handleSearch(searchQuery, isShort)
                .catch(null);
        }
    }, [isFetched, searchQuery, isShort])

    const isEmpty = !!isFetched && !filteredMovies.length;

    return (
        <ProtectedRoute>
            <section className="movies" key={allMovies.length}>
                <SearchForm
                    handleSearch={handleSearch}
                    presetSearchQuery={searchQuery}
                    presetIsShort={isShort} />

                {isFetching && <Loader />}
                {!isFetching && (
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
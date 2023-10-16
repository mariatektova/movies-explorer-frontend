/* eslint-disable react-hooks/exhaustive-deps */
import "./Movies.css";
import React, { useState, useCallback, useContext, useEffect, useMemo, memo } from "react";

import MoviesList from "../MoviesList/MoviesList";
import SearchForm from "../SearchForm/SearchForm";
import Loader from "../Loader/Loader";
import ProtectedRoute from "../ProtectedRoute";

import ApiMovies from "../../utils/ApiMovies";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { MOVIESQUANTITYRENDER, ADDMOREMOVIES } from '../../utils/constants';
import useResize from '../../hooks/useResize';


const Movies = () => {
    const localStorageValues = JSON.parse(localStorage.getItem(`movies`)) ?? {};
    const { allMovies, setAllMovies } = useContext(CurrentUserContext);

    const [searchQuery, setSearchQuery] = useState(localStorageValues.query ?? ``);
    const [isShort, setShort] = useState(!!localStorageValues.isShort);
    const [isFetching, setFetching] = useState(false);
    const [isFetched, setFetched] = useState(!!allMovies.length);
    const [isMoviesAdd, setIsMoviesAdd] = useState(0);
    let size = useResize();


    const handleSearch = useCallback(async (query, isShort) => {
        if (!query) {
            alert(`Поле не должно быть пустым`);
            return;
        }
        setFetching(true);
        let movies = allMovies;

        if (!movies.length) {
            movies = await ApiMovies.request();
            setAllMovies(movies);
        }
        setSearchQuery(query);
        setShort(isShort);

        localStorage.setItem(`movies`, JSON.stringify({
            query,
            isShort
        }));
        setFetched(true);
        setFetching(false);
    }, [allMovies.length]);



    const filteredMovies = allMovies.filter((movie) => {
        const lowerNameRu = movie.nameRU.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        return lowerNameRu.includes(lowerQuery) && (movie.duration < 40 || !isShort);
    });

    const moviesQuantity = useMemo(() => {
        const countToRender = MOVIESQUANTITYRENDER(size);
        return filteredMovies.slice(0, countToRender + isMoviesAdd);
    }, [filteredMovies, isMoviesAdd, size]);

    console.log(moviesQuantity);

    useEffect(() => {
        if (size) {
            setIsMoviesAdd(0);
        }
    }, [size]);


    useEffect(() => {
        if ((!isFetched && !!searchQuery) || !!isShort) {
            handleSearch(searchQuery, isShort)
                .catch(null);
        }
    }, [isFetched, searchQuery, isShort])

    const isEmpty = !!isFetched && !moviesQuantity.length;


    const handleClick = () => {
        setIsMoviesAdd((prev) => prev + ADDMOREMOVIES(size));
    }

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
                        {!isEmpty && <MoviesList movies={moviesQuantity} />}
                        {moviesQuantity.length && <button className="movies__button-add" onClick={handleClick}>
                            Еще</button>}
                    </>
                )}
            </section>
        </ProtectedRoute>
    );
};
export default memo(Movies);
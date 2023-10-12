import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import Api from '../../utils/Api';

import { CurrentUserContext } from '../../context/CurrentUserContext';


const MoviesCard = ({ card }) => {
  const IMAGE_URL = 'https://api.nomoreparties.co/';
  const location = useLocation();
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);



  const handleSaveMovie = () => {
    Api.requestApi(`/movies`, `POST`, {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `${IMAGE_URL}${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `${IMAGE_URL}${card.image.formats.thumbnail.url}`,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN
    })
      .then((res) => {
        const nextSavedMovies = [...savedMovies, res];
        console.log({ nextSavedMovies, savedMovies, res });
        setSavedMovies(nextSavedMovies);
      })

      .catch((err) => {
        console.log(err);
      })

  }
  const handleDeleteMovie = () => {
    Api.requestApi(`/movies/${card._id}`, `DELETE`)
      .then(() => {
        const nextSavedMovies = savedMovies.filter(movie => movie.movieId !== card.movieId);
        setSavedMovies(nextSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  const isSaved = !!(savedMovies ?? []).find(movie => movie.movieId === card.id);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'м.';
  };

  return (
    <li className="moviescard">
      <a className="moviescard__container" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviescard__image" src={card.image.url ? `${IMAGE_URL + card.image.url}` : card.thumbnail} alt={"#"} />
      </a>
      <div className="moviescard__details">
        <p className="moviescard__name">{card.nameRU}</p>
        <p className="moviescard__duration">{getTimeFromMins(card.duration)}</p>
        {location.pathname === '/movies' && <button onClick={handleSaveMovie} className={`moviescard__button_save ${isSaved ? 'moviescard__button_save-saved' : ''}`} >{`Cохранить`}</button>}
        {location.pathname === '/saved-movies' && <button className={`moviescard__button_delete`} onClick={handleDeleteMovie}></button>}
      </div>
    </li>
  );
};

export default MoviesCard;
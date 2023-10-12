import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import Api from '../../utils/Api';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { IMAGE_URL } from '../../utils/constants';

const SavedMoviesCard = ({ card }) => {
  const {savedMovies, setSavedMovies} = useContext(CurrentUserContext);

  const handleDeleteMovie = () => {
    Api.request(`/movies/${card._id}`, `DELETE`)
      .then(() => {
        const nextSavedMovies = savedMovies.filter(movie => movie.movieId !== card.movieId);
        setSavedMovies(nextSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'м.';
  }

  return (
    <li className="moviescard">
      <a className="moviescard__container" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviescard__image" src={card.image.url ? `${IMAGE_URL + card.image.url}` : card.thumbnail} alt={"#"} />
      </a>
      <div className="moviescard__details">
        <p className="moviescard__name">{card.nameRU}</p>
        <p className="moviescard__duration">{getTimeFromMins(card.duration)}</p>
        <button className={`moviescard__button_delete`} onClick={handleDeleteMovie}></button>
      </div>
    </li>
  );
};

export default SavedMoviesCard;
import React, { useContext } from 'react';

import './MoviesCard.css';

import Api from '../../utils/Api';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { IMAGE_URL, GETTIMEFORMINS } from '../../utils/constants';

const SavedMoviesCard = ({ card }) => {
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);

  const handleDeleteMovie = () => {
    Api.request(`/movies/${card._id}`, `DELETE`)
      .then(() => {
        const nextSavedMovies = savedMovies.filter(movie => movie.movieId !== card.movieId);
        setSavedMovies(nextSavedMovies);
      })
      .catch((err) => console.log(err));
  };



  return (
    <li className="moviescard">
      <a className="moviescard__container" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviescard__image" src={card.image.url ? `${IMAGE_URL + card.image.url}` : card.thumbnail} alt={"#"} />
      </a>
      <div className="moviescard__details">
        <p className="moviescard__name">{card.nameRU}</p>
        <p className="moviescard__duration">{GETTIMEFORMINS(card.duration)}</p>
        <button className={`moviescard__button_delete`} onClick={handleDeleteMovie}></button>
      </div>
    </li>
  );
};

export default SavedMoviesCard;
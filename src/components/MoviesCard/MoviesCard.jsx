import React, { useContext } from 'react';

import './MoviesCard.css';

import Api from '../../utils/Api';

import { CurrentUserContext } from '../../context/CurrentUserContext';

import { IMAGE_URL, GETTIMEFORMINS } from '../../utils/constants';


const MoviesCard = ({ card }) => {
  const { savedMovies, setSavedMovies } = useContext(CurrentUserContext);

  const handleSaveMovie = () => {
    Api.request(`/movies`, `POST`, {
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
        setSavedMovies(nextSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  const handleDeleteMovie = () => {
    const saved = savedMovies.find((movie) => movie.movieId === card.id);
    if (!saved) return;

    Api.request(`/movies/${saved._id}`, `DELETE`)
      .then(() => {
        const nextSavedMovies = savedMovies.filter((movie) => movie.movieId !== card.id);
        setSavedMovies(nextSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  const isSaved = !!(savedMovies ?? []).find((movie) => movie.movieId === card.id);



  return (
    <li className="moviescard">
      <a className="moviescard__container" href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="moviescard__image" src={card.image.url ? `${IMAGE_URL + card.image.url}` : card.thumbnail} alt={"#"} />
      </a>
      <div className="moviescard__details">
        <p className="moviescard__name">{card.nameRU}</p>
        <p className="moviescard__duration">{GETTIMEFORMINS(card.duration)}</p>
        <button onClick={isSaved ? handleDeleteMovie : handleSaveMovie} className={`moviescard__button_save ${isSaved ? 'moviescard__button_save-saved' : ''}`} >{`Cохранить`}</button>
      </div>
    </li>
  );
};

export default MoviesCard;
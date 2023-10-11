import React, { useContext } from 'react';
import './Navigation.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { profile } = useContext(CurrentUserContext);

  return (
    <nav className="nav">
      {!profile ? (
        <ul className='nav__list'>
          <Link to="/signup" className='link'>
            <li className='nav__item'>
              Регистрация
            </li>
          </Link>
          <Link to="/signin" className='link'>
            <li className='nav__item-enter'>
              Войти
            </li>
          </Link>
        </ul>) : (
        <>
          <ul className='nav__list'>
            <Link to="/movies" className='link'>
              <li className='nav__item'>
                Фильмы
              </li>
            </Link>
            <Link to='/saved-movies' className='link'>
              <li className='nav__item'>
                Cохраненные фильмы
              </li>
            </Link>
          </ul>
          <Link to='/profile' className='link'>
            <button className='nav__registered-button'>
              Аккаунт
            </button>
          </Link>
        </>
      )};
    </nav>
  )
};


export default Navigation;
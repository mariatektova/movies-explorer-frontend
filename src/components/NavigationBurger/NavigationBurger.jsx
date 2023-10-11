import React from 'react';
import './NavigationBurger.css';
import { Link } from 'react-router-dom';

const NavigationBurger = ({ handleClose }) => {

  return (
    <nav className="nav__burger">

      <ul className='nav-burger__list'>
        <Link to="/" className='link'>
          <li className='nav-burger__item' onClick={handleClose}>
            Главная
          </li>
        </Link>
        <Link to="/movies" className='link'>

          <li className='nav-burger__item' onClick={handleClose}>
            Фильмы
          </li>
        </Link>
        <Link to='/saved-movies' className='link'>
          <li className='nav__item' onClick={handleClose}>
            Cохраненные фильмы
          </li>
        </Link>
      </ul>
      <Link to='/profile' className='link'>
        <button className='nav-burger__account-button' onClick={handleClose}>
          Аккаунт
        </button>
      </Link>
    </nav>
  )
};


export default NavigationBurger;
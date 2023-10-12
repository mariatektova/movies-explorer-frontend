import './Header.css';
import Logo from '../../images/logo.svg';
import React, { useContext } from 'react';
import useResize from '../../hooks/useResize';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { Link } from 'react-router-dom';

import Navigation from "../../components/Navigation/Navigation";
import Burger from '../Burger/Burger';

const Header = () => {
  const resize = useResize();
  const context = useContext(CurrentUserContext);
  const { profile } = context || {};

  return (
    <header className="header">
      <Link className="header__route" to="/">
        <img className="header__logo" src={Logo} alt="Логотип" />
      </Link>

      {resize.width > 768 ? (
        <Navigation user={profile} />
      ) : profile ? (
        <Burger user={profile} />
      ) : (
        <Navigation user={profile} />
      )
      }
    </header>
  );
};

export default Header;
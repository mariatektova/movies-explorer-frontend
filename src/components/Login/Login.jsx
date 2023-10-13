/* eslint-disable react-hooks/exhaustive-deps */
import './Login.css';

import React, { useCallback, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../images/logo.svg';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import { validateEmail } from '../../utils/validation';
import Api from '../../utils/Api';

import Modal from "../Modal/Modal";

import { CurrentUserContext } from "../../context/CurrentUserContext";

const Login = () => {
  const validation = useFormAndValidation();
  const navigate = useNavigate();
  const context = useContext(CurrentUserContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalSuccess, setModalSuccess] = useState(false);

  const handleModalOpen = useCallback((isSuccess) => {
    setModalSuccess(isSuccess);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    if (isModalSuccess) {
      navigate('/movies');
    }
  }, [isModalSuccess]);

  function handleSubmit(e) {
    e.preventDefault();

    Api.request(`/signin`, `POST`, {
      email: e.target.email.value,
      password: e.target.password.value
    })
      .then((res) => {
        if (!!res.token) {
          localStorage.setItem(`jwt`, res.token);
          context.setToken(res.token);
          handleModalOpen(true);
        } else {
          handleModalOpen(false);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          console.log('Неправильные почта или пароль');
        } else {
          console.log('Неправильные почта или пароль');
        }
      });
  }

  return (
    <section className="login">
      <Link className="login__route" to="/">
        <img className="login__logo" src={Logo} alt="Логотип" />
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <div className="login__input-field">
          <label className="login__label" htmlFor="login__email-input">E-mail</label>
          <input
            className="login__input"
            id="login__email-input"
            name="email"
            value={validation.values.email || ''}
            onChange={validation.handleChange}
            //type="email"
            placeholder="Введите почту"
            minLength="2"
            maxLength="40"
            required
          />
          <span className={`login__input-error login__input-error_active`}>{validateEmail(validation.values.email).message}</span>
        </div>
        <div className="login__input-field">
          <label className="login__label" htmlFor="login__password-input">Пароль</label>
          <input
            className="login__input"
            id="login__password-input"
            name="password"
            value={validation.values.password || ''}
            onChange={validation.handleChange}
            type="password"
            placeholder="Введите пароль"
            minLength="6"
            required
          />
          <span className={`login__input-error ${validation.isValid ? '' : 'login__input-error_active'}`}> {validation.password}</span>
        </div>
        <button type="submit" className="login__button" disabled={!validation.isValid || validateEmail(validation.values.email).invalid}>Войти</button>
        <div className="login__text">
          <span>Ещё не зарегистрированы? </span>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </form>
      {isModalOpen && <Modal close={handleModalClose} isSuccess={isModalSuccess} />}
    </section>
  );
};

export default Login;
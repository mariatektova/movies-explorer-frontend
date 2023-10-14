/* eslint-disable react-hooks/exhaustive-deps */
import './Register.css';
import Logo from '../../images/logo.svg';
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { validateEmail, validateName } from '../../utils/validation';

import Api from '../../utils/Api';

import Modal from "../Modal/Modal";

import { CurrentUserContext } from '../../context/CurrentUserContext';

const Register = () => {
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const regRes = await Api.request(`/signup`, `POST`, {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (!regRes.email) {
      handleModalOpen(false);
      return;
    }

    const authRes = await Api.request(`/signin`, `POST`, {
      email: e.target.email.value,
      password: e.target.password.value
    });

    if (authRes.token) {
      localStorage.setItem(`jwt`, authRes.token);
      context.setToken(authRes.token);
      handleModalOpen(true);
    } else {
      handleModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (context.profile) {
      navigate('/')
    }
  }, [context.profile])


  return (
    <section className="register">
      <Link className="register__route" to="/">
        <img className="register__logo" src={Logo} alt="Лого" />
      </Link>

      <h1 className="register__title">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__input-field">
          <label className="register__label" htmlFor="register-name_input">Имя</label>
          <input className="register__input" id="register-name_input" name="name" value={validation.values.name ?? ``} onChange={validation.handleChange} type="text" placeholder="Введите имя" minLength="2" maxLength="40" required />
          <span className={`register__input-error register__input-error_active`}>{validateName(validation.values.name).message}</span>
        </div>

        <div className="register__input-field">
          <label className="register__label" htmlFor="register-email_input">E-mail</label>
          <input className="register__input" id="register-email_input" name="email" value={validation.values.email ?? ``} onChange={validation.handleChange} type="email" placeholder="Введите почту" minLength="2" maxLength="40" required />
          <span className={`register__input-error register__input-error_active`}>{validateEmail(validation.values.email).message}</span>
        </div>

        <div className="register__input-field">
          <label className="register__label" htmlFor="register-password_input">Пароль </label>
          <input className="register__input" id="register-password_input" name="password" value={validation.values.password ?? ``} onChange={validation.handleChange} type="password" placeholder="Введите пароль" minLength="6" required />
          <span className={`register__input-error ${validation.isValid ? '' : 'register-form__input-error_active'}`} >
            {validation.errors.password}
          </span>
        </div>
        <button type="submit" className="register__button" disabled={!validation.isValid || validateEmail(validation.values.email).invalid || validateName(validation.values.name).invalid}>Зарегистрироваться</button>
        <div className="register-page__text">
          <span>Уже зарегистрированы? </span>
          <Link to="/signin" className="register-page__link">Войти</Link>
        </div>
      </form>
      {isModalOpen && <Modal close={handleModalClose} isSuccess={isModalSuccess} />}
    </section>
  );
};

export default Register;
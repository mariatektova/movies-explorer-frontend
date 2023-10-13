/* eslint-disable react-hooks/exhaustive-deps */
import './Profile.css';
import { useState, useCallback, useContext, useEffect } from 'react';
import Api from '../../utils/Api';
import { validateEmail, validateName } from '../../utils/validation';
import { useNavigate } from "react-router-dom";
import Modal from '../Modal/Modal';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';

const Profile = () => {
  const navigate = useNavigate();

  const context = useContext(CurrentUserContext);
  const { profile } = context;

  const [name, setName] = useState(profile.name ? profile.name : ``);
  const [email, setEmail] = useState(profile.email ? profile.name : ``);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalSuccess, setModalSuccess] = useState(false);

  const handleModalOpen = useCallback((isSuccess) => {
    setModalSuccess(isSuccess);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    if (!!profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const reqProf = await Api.request('/users/me', 'PATCH', {
      name: e.target.name.value,
      email: e.target.email.value
    })
    if (!!reqProf.email) {
      context.setProfile(reqProf);
    }
    handleModalOpen(!!reqProf.email);
  }, []);


  const handleExit = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('saved-movies');
    localStorage.removeItem('movies');
    context.setToken(null);
    context.setProfile(null);
    context.setSavedMovies(null);
    navigate('/');
  }

  const handleChangeName = (ev) => {
    setName(ev.target.value);
  }

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);
  }

  if (!profile || !name || !email) return null;

  const isEnabledToChange = (
    (
      profile.name !== name ||
      profile.email !== email
    ) &&
    !validateName(name).invalid &&
    !validateEmail(email).invalid
  );
  return (
    <ProtectedRoute>
      <section className="profile">
        <h1 className="profile__welcome-message">Привет, {profile.name}!</h1>
        <form onSubmit={handleSubmit} className="profile-form" >
          <div className="profile-form__input-field">
            <label className="profile-form__label" htmlFor="name_input">{`Имя`}</label>
            <input className="profile-form__input"
              id="name_input"
              name="name"
              value={name}
              onChange={handleChangeName}
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="Введите имя"
            />
            <span className={`profile-form__input-error`}>{validateName(name).message}</span>
          </div>

          <div className="profile-form__input-field">
            <label className="profile-form__label" htmlFor="email_input">{`E-mail`}</label>
            <input className="profile-form__input"
              id="email_input"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              type="email"
              placeholder="Введите почту"
              minLength="2"
              maxLength="40"
              required />
            <span className={'profile-form__input-error profile-form__input-error_active'}>{validateEmail(email).message}</span>
          </div>

          <div className="profile-form__buttons">
            <button type="submit" className="profile-form__button profile-form__button-save" disabled={isEnabledToChange}>Сохранить</button>
            <button
              onClick={handleExit}
              type={`button`}
              className="profile-form__button profile-form__button-signout">
              {`Выйти из аккаунта`}
            </button>

          </div>
        </form>
        {isModalOpen && <Modal close={handleModalClose} isSuccess={isModalSuccess} />}
      </section>
    </ProtectedRoute>
  );
};

export default Profile;
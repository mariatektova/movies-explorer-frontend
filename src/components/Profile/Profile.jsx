import './Profile.css';
import { useState, useCallback, useContext, useEffect } from 'react';
import Api from '../../utils/Api';
import { validateEmail, validateName } from '../../utils/validation';
import { useNavigate } from "react-router-dom";
import Modal from '../Modal/Modal';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Profile = () => {
  const navigate = useNavigate();

  const context = useContext(CurrentUserContext);
  const { profile } = context;

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalSuccess, setModalSuccess] = useState(false);

  const handleModalOpen = useCallback((isSuccess) => {
    setModalSuccess(isSuccess);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
  }, [profile]);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const reqProf = await Api.requestApi('/users/me', 'PATCH', {

      name: e.target.name.value,
      email: e.target.email.value
    })
    if (!!reqProf.email) {
      handleModalOpen(true);
      return;
    } else {
      handleModalOpen(false);
    }
  }, []);


  const handleExit = () => {
    localStorage.removeItem('jwt');
    context.setToken(null);
    navigate(`/`);
  }

  const handleChangeName = (ev) => {
    setName(ev.target.value);
  }

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);
  }

  return (
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
          <button type="submit" className="profile-form__button profile-form__button-save">Сохранить</button>
          <button
            onClick={handleExit}
            type={`button`}
            className="profile-form__button profile-form__button-signout">
            Выйти из аккаунта
          </button>
        </div>
      </form>
      {isModalOpen && <Modal close={handleModalClose} isSuccess={isModalSuccess} />}
    </section>

  );
};

export default Profile;
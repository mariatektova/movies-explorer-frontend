import React from 'react';
import './AboutMe.css';
import avatar from "../../images/avatar.jpg"
const Tech = () => {
  return (
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__container">

        <div className="aboutme__info">
          <p className="aboutme__info-title">Виталий</p>
          <p className="aboutme__info-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutme__info-text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a
            className="aboutme__git"
            href="https://github.com/mariatektova"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="aboutme__avatar">
          <img
            className="aboutme__avatar-photo"
            src={avatar}
            alt="Фотография студента"
          />
        </div>

      </div>
    </section>
  );
};

export default Tech;
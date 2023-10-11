import React from "react";
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about_project">
      <h2 className="about_project__title">О Проекте</h2>
      <div className="about_project__container">
        <div className="about_project__info">
          <p className="about_project__info-title">Дипломный проект включал 5 этапов</p>
          <p className="about_project__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about_project__info">
          <p className="about_project__info-title">На выполнение диплома ушло 5 недель</p>
          <p className="about_project__info-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__project__weeks">
        <p className="about__project__weeks-text">1 неделя</p>
        <p className="about__project__weeks-text">4 недели</p>
        <p className="about__project__weeks-text">Back-end</p>
        <p className="about__project__weeks-text">Front-end</p>
      </div>
    </section>
  )
};
export default AboutProject;
import React from 'react';
import './Tech.css';

const Tech = () => {
  return (
    <section className="tech">
      <h2 className="tech__title">Технологии</h2>
      <div className="tech__container">
        <p className="tech__info-title">7 технологий</p>
        <p className="tech__info-subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <div className="tech__container-info">
        <p className="tech__info-text">HTML</p>
        <p className="tech__info-text">CSS</p>
        <p className="tech__info-text">JS</p>
        <p className="tech__info-text">React</p>
        <p className="tech__info-text">Git</p>
        <p className="tech__info-text">Express.js</p>
        <p className="tech__info-text">mongoDB</p>
      </div>
    </section>
  );
};

export default Tech;
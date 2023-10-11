import React from 'react';
import './Portfolio.css';
import ArrowLink from '../../images/arrow.svg';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>

      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://how-to-learn.mariatektova.ru"
          target="_blank"
          rel="noreferrer"
        >
          <p className='portfolio__link-text'>Статичный сайт</p>{' '}
          <img
            className="portfolio__link-arrow"
            src={ArrowLink}
            alt="Ссылка на внешний сайт"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://russian-travel.mariatektova.ru"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link-text">Адаптивный сайт</p>{' '}
          <img
            className="portfolio__link-arrow"
            src={ArrowLink}
            alt="Ссылка на внешний сайт"
          />
        </a>
        <a
          className="portfolio__link"
          href="https://mesto.mariatektova.ru/"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__link-text">Одностраничное приложение</p>{' '}
          <img
            className="portfolio__link-arrow"
            src={ArrowLink}
            alt="Ссылка на внешний сайт"
          />
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
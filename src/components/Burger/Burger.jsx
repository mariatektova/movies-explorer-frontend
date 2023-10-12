import React, { useState, useEffect, useCallback } from 'react';
import NavigationBurger from '../NavigationBurger/NavigationBurger';
import './Burger.css';

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, handleClose]);

  return (
    <div className="burger">
      <button className="burger__button" onClick={handleOpen}></button>
      {!!isOpen && <div className="burger__overlay" onClick={handleClose}></div>}
      <div
        onClick={(e) => (e.target.href ? handleOpen() : '')}
        className={`burger__container ${isOpen ? 'burger__container_open' : ''}`}
      >
        <button className="burger__button-close" onClick={handleClose}></button>
        <NavigationBurger handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Burger;
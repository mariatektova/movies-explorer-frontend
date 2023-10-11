/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from "react";
import "./Modal.css"
import IconSuccess from "../../images/success.svg";
import IconError from "../../images/unsuccess.svg";

function Modal(props) {


  const handleKeyDown = useCallback((ev) => {
    ev.key === `Escape` && props.close();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

    };
  }, []);



  return (
    <section className={`modal`}>
      <div className="modal__container">
        <button type="button" className="modal__close" onClick={props.close}></button>
        <img src={props.isSuccess ? IconSuccess : IconError} alt={props.isSuccess ? 'Отлично' : `Хьюстон, у нас проблемы..`} className="modal__container-icon" />
        <h3 className="modal__title">{props.isSuccess ? 'Отлично!' : `Хьюстон, у нас проблема.. `}</h3>
      </div>
    </section>
  );
}

export default memo(Modal);
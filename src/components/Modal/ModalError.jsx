import React, { memo, useCallback, useEffect } from "react";
import "./Modal.css"
import IconError from "../../images/unsuccess.svg";

function Modal(props) {
  const handleKeyDown = useCallback((ev) => {
    ev.key === `Escape` && props.close();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    //document.addEventListener('click', closeByOverlayClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      //document.removeEventListener('click', closeByOverlayClick);
    };
  }, []);



  return (
    <section className={`modal`}>
      <div className="modal__container">
        <button type="button" className="modal__close" onClick={props.close}></button>
        <img src={IconError} alt={`Хьюстон, у нас проблемы..`} className="modal__container-icon" />
        <h3 className="modal__title">{`Хьюстон, у нас проблема.. `}</h3>
      </div>
    </section>
  );
}

export default memo(Modal);
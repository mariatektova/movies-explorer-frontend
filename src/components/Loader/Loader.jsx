import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="box">
      <div className="round">
        <div className="round__main"></div>
        <div className="round__main"></div>
        <div className="round__back"></div>
        <div className="round__front"></div>
      </div>
    </div>
  );
}

export default Loader;
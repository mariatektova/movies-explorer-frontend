import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({isChecked, onChange}) => (
    <div className="toggle-button">
        <input className="toggle-button__input" type="checkbox" id="switch" name="switch" defaultChecked={isChecked} onChange={onChange} />
        <label className="toggle-button__label" htmlFor="switch"></label>
        <span className="toggle-button__text">Короткометражки</span>
    </div>
);

export default ToggleButton;
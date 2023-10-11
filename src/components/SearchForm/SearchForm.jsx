/* eslint-disable react-hooks/exhaustive-deps */
import "./SearchForm.css";

import React, { useCallback } from "react";

import ToggleButton from "../ToggleButton/ToggleButton";

import IconFind from "../../images/icon.svg";

const SearchForm = (props) => {

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    props.handleSearch(e.target.search.value);

  }, [props.handleSearch]);

  const handleShortChange = useCallback((ev) => {
    props.handleShortChange(!!ev.target.checked);
  }, [props.handleShortChange]);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input className="search__form-input" name="search" placeholder="Фильм" min="1" defaultValue={props.presetSearchQuery} />
        <span className={`search__form__input-error`}></span>
        <button type="submit" className="search__form-button" style={{
          backgroundImage: `url(${IconFind})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "100%"
        }}></button>
      </form>

      <ToggleButton isChecked={props.presetIsShort} onChange={handleShortChange} />
    </div>
  );
};

export default SearchForm;
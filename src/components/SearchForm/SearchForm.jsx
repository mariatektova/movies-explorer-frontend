/* eslint-disable react-hooks/exhaustive-deps */
import "./SearchForm.css";

import React, { useCallback, useState } from "react";

import ToggleButton from "../ToggleButton/ToggleButton";

import IconFind from "../../images/icon.svg";


const SearchForm = (props) => {
  const [query, setQuery] = useState(props.presetSearchQuery);
  const [isShort, setShort] = useState(props.presetIsShort);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const query = e.target.search.value;
    setQuery(query);
    props.handleSearch(query, isShort);
  }, [props.handleSearch, isShort]);


  const handleShortChange = useCallback((ev) => {
    setShort(!!ev.target.checked);
    props.handleSearch(query, !!ev.target.checked);
  }, [props.handleShortChange, query]);

  const handleQueryChange = useCallback((ev) => {
    setQuery(ev.target.value);
  }, []);

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__form-input"
          name="search" placeholder={'Фильм'}
          min="1"
          defaultValue={props.presetSearchQuery}
          onChange={handleQueryChange} />

        <button
          type="submit"
          className="search__form-button" style={{
            backgroundImage: `url(${IconFind})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "100%"
          }}></button>
      </form>
      <ToggleButton isChecked={props.presetIsShort} onChange={handleShortChange} />
    </div>
  );
};

export default SearchForm;
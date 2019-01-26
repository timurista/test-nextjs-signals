import React from "react";

// import Downshift from "downshift";
import "./style.scss";

const SearchBar = ({ placeholder = "Enter keywords", onChange }: any) => {
  const onKeyDown = (evt: any) => {
    var c = evt.keyCode;
    if (c === 13) onChange(evt);
  };
  return (
    <div id="search-bar-container">
      <input
        onKeyDown={onKeyDown}
        type="text"
        id="search-bar"
        placeholder={placeholder}
      />
      <a href="###">
        <img
          className="search-icon"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
        />
      </a>
    </div>
  );
};

export default SearchBar;

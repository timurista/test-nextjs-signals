import React from "react";
// import Downshift from "downshift";
import "./style.scss";

const SearchBar = ({ placeholder = "Enter keywords", onChange }: any) => {
  return (
    <div id="search-bar-container">
      <input
        onChange={onChange}
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

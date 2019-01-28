import React, { Component } from "react";

// import Downshift from "downshift";
import "./style.scss";

class SearchBar extends Component {
  state = {
    keywords: this.props.keywords || ""
  };
  onKeyDown = (evt: any) => {
    var c = evt.keyCode;
    console.log(evt);
    if (c === 13) {
      this.props.onChange(evt);
    }
    evt.persist();
  };

  onChange = (e: any) => {
    e.persist();
    this.setState(prev => ({ keywords: e.target.value }));
  };
  render() {
    const { placeholder = "Enter keywords", onChange } = this.props;
    const { keywords = "" } = this.state;
    return (
      <div id="search-bar-container">
        <input
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
          type="text"
          value={keywords}
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
  }
}

export default SearchBar;

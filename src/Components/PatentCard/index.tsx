import React, { Component } from "react";
import "./style.scss";

export class Card extends Component {
  state = {
    expanded: false
  };
  render() {
    const record = this.props.record || {};
    return (
      <div className="patent-card">
        <div>{record.filing_date}</div>
        <div>{record.title}</div>

        <div
          onClick={() => this.setState(prev => ({ expanded: !prev.expanded }))}
        >
          ⇩
        </div>
        <div className={this.state.expanded ? "expanded" : "not-expanded"}>
          {record.abstract}
        </div>
      </div>
    );
  }
}

export default Card;

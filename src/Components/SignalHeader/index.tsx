import React, { Component } from "react";
export interface Props {
  title: string;
  keywords: Array<string>;
}
export class SignalHeader extends Component<Props> {
  static defaultProps = {
    keywords: ["keyword1"],
    title: "some title"
  };
  render() {
    console.log("props", this.props);
    return (
      <div className="signal-header">
        TITLE: {this.props.title}
        KEYWORDS: {this.props.keywords.join(", ")}
        <div>Actions</div>
      </div>
    );
  }
}

export default SignalHeader;

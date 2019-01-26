import React from "react";
import { SignalHeader, PatentsTab } from "@Components";

export default class Blog extends React.Component {
  static async getInitialProps({ query }: any) {
    console.log("rendering the query", query);
    return { query };
  }
  render() {
    return (
      <div>
        <SignalHeader />
        <div>SIGNAL DETAIL PAGE CONTENT</div>
        <PatentsTab />
      </div>
    );
    // this.props.url.query.slug
  }
}

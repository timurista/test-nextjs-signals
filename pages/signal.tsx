import React from "react";
import { SignalHeader, PatentsTab } from "@Components";
import axios from "axios";

export interface Props {
  esClient: any;
}

export default class Blog extends React.Component<Props> {
  static async getInitialProps({ query }: any) {
    console.log("rendering the query", query);
    console.log("PROCESS", process.env.ES_INSTANCE);
    const username = process.env.ES_USERNAME;
    const password = process.env.ES_PASSWORD;
    let credentials = Buffer.from(username + ":" + password).toString("base64");
    let basicAuth = "Basic " + credentials;
    const esClient = axios.create({
      baseURL: process.env.ES_INSTANCE,
      timeout: 1000,
      headers: {
        headers: { Authorization: basicAuth }
      }
    });
    return { query, esClient };
  }

  render() {
    console.log(this.props);
    let props = {};
    if (this.props.esClient) {
      props = { esClient: this.props.esClient };
    }

    return (
      <div>
        <SignalHeader />
        <div>SIGNAL DETAIL PAGE CONTENT</div>
        <PatentsTab {...this.props} />
      </div>
    );
    // this.props.url.query.slug
  }
}

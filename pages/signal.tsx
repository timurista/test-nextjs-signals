import React from "react";
import { SignalHeader, PatentsTab } from "@Components";
import axios from "axios";
import { baseURL, headers } from "@Api/Elasticsearch";

export interface Props {
  esClient: any;
  keywords: any;
}

const staticKeywords = "artificial intelligence";

export default class Blog extends React.Component<Props> {
  static async getInitialProps({ query }: any) {
    console.log("rendering the query", query);
    console.log("PROCESS", process.env.ES_INSTANCE);
    // const username = process.env.ES_USERNAME;
    // const password = process.env.ES_PASSWORD;
    // let credentials = Buffer.from(username + ":" + password).toString("base64");
    // let basicAuth = "Basic " + credentials;

    const body = {
      size: 20,
      aggs: {
        patents_over_time: {
          histogram: {
            field: "filing_date",
            interval: 100,
            min_doc_count: 1
          },
          aggs: {
            assignee_count: {
              terms: { field: "assignee.keyword" }
            },
            country_count: {
              terms: { field: "country.keyword" }
            },
            inventor_count: {
              terms: { field: "inventor.keyword" }
            }
          }
        }
      }
    };
    const { data } = await axios.post(
      baseURL + "/patents/_search?q=" + staticKeywords,
      body,
      { headers }
    );

    const mapData = data.aggregations.patents_over_time.buckets;
    const records = data.hits.hits.map((x: any) => ({
      ...x._source
    }));
    const total = data.hits.total;

    return { query, records, mapData, total };
  }

  render() {
    const { mapData, records, total } = this.props;

    return (
      <div>
        <SignalHeader />
        <div>SIGNAL DETAIL PAGE CONTENT</div>
        <PatentsTab
          keywords={staticKeywords}
          mapData={mapData}
          records={records}
          total={total}
        />
      </div>
    );
    // this.props.url.query.slug
  }
}

import React, { Component } from "react";
import Loading from "@Components/Loading";
import PatentCard from "@Components/PatentCard";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
console.log("CONFIG", publicRuntimeConfig);
const { ES_INSTANCE, ES_PASSWORD, ES_USERNAME } = publicRuntimeConfig;
const username = ES_USERNAME;
const password = ES_PASSWORD;
let credentials = Buffer.from(username + ":" + password).toString("base64");
let basicAuth = "Basic " + credentials;
const baseURL = ES_INSTANCE;

export interface Props {
  title: string;
  keywords: Array<string>;
  esClient: any;
  query: any;
}
import SearchBar from "@Components/SearchBar";
import { PatentCharts } from "@Components/PatentCharts";

export class PatentsTab extends Component<Props> {
  static defaultProps = {
    keywords: ["keyword1"],
    title: "some title"
  };

  state = {
    records: [],
    total: 0,
    loading: false
  };

  onChange = (val: any) => {
    console.log("CHANGE EVENT", val);
    this.search(val);
  };

  search = (evt: any) => {
    // const body = {
    //   query: val
    // };
    const val = evt.target.value;
    console.log("search", evt, val);
    if (val.length < 3) return;
    try {
      this.setState({ loading: true });
      axios
        .get(baseURL + "/patents/_search?q=" + val, {
          headers: {
            Authorization: basicAuth
          }
        })
        .then(({ data }: any) => {
          console.log("RES", data);
          console.log(data.total);
          this.setState({
            records: data.hits.hits.map((x: any) => ({
              ...x._source
            })),
            total: data.hits.total,
            loading: false
          });
        });
    } catch (e) {
      console.error("ERROR", e);
      this.setState({ loading: false });
    }
  };

  render() {
    console.log("props", this.props);
    return (
      <div className="patents-header">
        <SearchBar
          onChange={this.onChange}
          placeholder="Search for .."
          items={["React Vienna", "React Finland", "Jest", "Enzyme", "Reactjs"]}
        />

        <div>
          {this.state.loading && <Loading />}
          {!this.state.loading && this.state.total > 0 && this.state.total}
          {!this.state.loading &&
            this.state.records.map(record => {
              return <PatentCard record={record} id={record.fid} />;
            })}
        </div>

        <PatentCharts />
      </div>
    );
  }
}

export default PatentsTab;

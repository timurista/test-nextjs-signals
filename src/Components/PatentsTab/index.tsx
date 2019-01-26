import React, { Component } from "react";
// import { debounce } from "throttle-debounce";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export interface Props {
  title: string;
  keywords: Array<string>;
}
import SearchBar from "@Components/SearchBar";

export class PatentsTab extends Component<Props> {
  static defaultProps = {
    keywords: ["keyword1"],
    title: "some title"
  };

  state = {
    records: [],
    total: 0
  };

  onChange = (evt: any) => {
    console.log("CHANGE EVENT", evt.target.value);
    this.search(evt.target.value);
  };

  search(val: string) {
    console.log(process);
    console.log(publicRuntimeConfig, serverRuntimeConfig);

    const es_search = ES_INSTANCE + "/patents/_search";
    const username = ES_USERNAME;
    const password = ES_PASSWORD;
    let credentials = btoa(username + ":" + password);
    let basicAuth = "Basic " + credentials;
    const body = {
      query: val
    };
    try {
      axios
        .get(es_search + "?q=" + val, {
          headers: { Authorization: basicAuth }
        })
        .then(({ data }) => {
          console.log("RES", data);
          console.log(data.total);
          this.setState({
            records: data.hits.hits,
            total: data.hits.total
          });
        });
    } catch (e) {
      console.error("ERROR", e);
    }
  }

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
          {this.state.total}
          {this.state.records.forEach(record => {
            return <div id={record._id}>{JSON.stringify(record._source)}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default PatentsTab;

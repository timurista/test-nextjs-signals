import React, { Component } from "react";
import Loading from "@Components/Loading";
import PatentCard from "@Components/PatentCard";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "./style.scss";
import { headers, baseURL } from "@Api/Elasticsearch";

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
    keywords: this.props.keywords || "",
    loading: false
  };

  onChange = (evt: any) => {
    console.log("CHANGE EVENT", evt);
    this.search(evt.target.value);
  };

  search = (val: any) => {
    console.log("search", val);
    if (val.length < 3) return;
    this.setState({ keywords: val });
    try {
      this.setState({ loading: true });
      axios
        .get(baseURL + "/patents/_search?q=" + val, {
          headers
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
        <SearchBar onChange={this.onChange} placeholder="Search for .." />

        <div className="results">
          <div className="list-container">
            <List>
              {this.state.loading && <Loading />}
              {!this.state.loading && this.state.total > 0 && this.state.total}
              {!this.state.loading &&
                this.state.records.map(record => {
                  return (
                    <ListItem key={record.fid}>
                      <PatentCard record={record} />
                    </ListItem>
                  );
                })}
            </List>
          </div>
        </div>
        <PatentCharts keywords={this.state.keywords} />
      </div>
    );
  }
}

export default PatentsTab;

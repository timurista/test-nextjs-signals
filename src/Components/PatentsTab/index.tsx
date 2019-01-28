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
  records: any;
  mapData: any;
}
import SearchBar from "@Components/SearchBar";
import { PatentCharts } from "@Components/PatentCharts";

export class PatentsTab extends Component<Props> {
  static defaultProps = {
    keywords: ["keyword1"],
    title: "some title"
  };

  state = {
    records: this.props.records || [],
    mapData: this.props.mapData || [],
    total: this.props.total || 0,
    keywords: this.props.keywords || "",
    loading: false
  };

  onChange = (evt: any) => {
    console.log("CHANGE EVENT", evt);
    this.setState({ keywords: evt.target.value });
    this.search(evt.target.value);
    this.searchMap(evt.target.value);
  };

  searchMap = (val: any) => {
    if (val.length < 3) return;

    const keywords = val;
    console.log("search map", keywords);
    if (keywords.length < 3) return;

    const body = {
      size: 0,
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
    try {
      this.setState({ loading: true });
      axios
        .post(baseURL + "/patents/_search?q=" + keywords, body, { headers })
        .then(({ data }: any) => {
          console.log("RES CHART", data);
          console.log(data.total);
          this.setState({
            mapData: data.aggregations.patents_over_time.buckets,
            loading: false
          });
        });
    } catch (e) {
      this.setState({ loading: false });
    }
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
        <SearchBar onChange={this.onChange} keywords={this.state.keywords} />

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
        <PatentCharts
          mapData={this.state.mapData}
          keywords={this.state.keywords}
        />
      </div>
    );
  }
}

export default PatentsTab;

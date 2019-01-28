import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { headers, baseURL } from "@Api/Elasticsearch";
import CountryMap from "@Components/PatentCountryMap";

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 800px;
  background: orange;
`;

export interface Props {
  keywords: string;
}
export class PatentCharts extends Component<Props> {
  state = {
    records: []
  };

  getChartData = () => {
    const keywords = this.props.keywords;
    console.log("search", keywords);
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
            records: data.aggregations.patents_over_time.buckets,
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
    console.log("records", this.state.records);
    return (
      <div id="charts">
        <CardContainer>
          <Typography variant="h5">CHARTS</Typography>
          <span>
            <Button onClick={this.getChartData}>Load charts</Button>
          </span>
        </CardContainer>
        <div>
          <CountryMap data={this.state.records} />
        </div>
      </div>
    );
  }
}

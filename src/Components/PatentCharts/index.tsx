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
  mapData: Array<any>;
}
export class PatentCharts extends Component<Props> {
  state = {
    records: []
  };

  render() {
    console.log("records", this.state.records);
    return (
      <div id="charts">
        <CardContainer>
          <Typography variant="h5">CHARTS</Typography>
        </CardContainer>
        <div>
          <CountryMap data={this.props.mapData} />
        </div>
      </div>
    );
  }
}

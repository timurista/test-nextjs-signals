import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const CardContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

export class PatentCharts extends Component {
  render() {
    return (
      <div id="charts">
        <CardContainer>
          <Typography variant="h5">CHARTS</Typography>
          <span>
            <Button>Load charts</Button>
          </span>
        </CardContainer>
      </div>
    );
  }
}

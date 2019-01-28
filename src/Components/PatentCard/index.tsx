import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import format from "date-fns/format";
import "./style.scss";

const getDateString = (dateNum: number) => {
  const s = dateNum.toString();
  return s.slice(0, 4) + "-" + s.slice(4, 6) + "-" + s.slice(6);
};

export interface Props {
  record: any;
}

export class Card extends Component<Props> {
  state = {
    expanded: false
  };
  render() {
    const record = this.props.record || {};
    const date = format(
      new Date(getDateString(record.filing_date)),
      "MMM YYYY"
    );
    return (
      <ExpansionPanel className="patent-card">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className="card-summary">
            <div>{date}</div>
            <div>
              <a href={record.url}>{record.title}</a>
            </div>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{record.abstract}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Card;

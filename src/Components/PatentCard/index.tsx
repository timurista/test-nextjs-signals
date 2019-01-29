import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import format from "date-fns/format";
import "./style.scss";
import { Divider } from "@material-ui/core";

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
      <div className="patent-card">
        <div>
          <div className="card-summary">
            <div>{date}</div>
            <div>
              <a href={record.url}>{record.title}</a>
            </div>
            <div>Inventor: {record.inventor}</div>
            <div> Assignee: {record.assignee}</div>
            <div
              className="expand-more"
              onClick={() =>
                this.setState(prev => ({ expanded: !prev.expanded }))
              }
            >
              <ExpandMoreIcon />
            </div>
          </div>
        </div>
        {this.state.expanded && <div>{record.abstract}</div>}
      </div>
    );
  }
}

export default Card;

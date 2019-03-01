
// import Document, { Head, Main, NextScript } from 'next/document'
import React from "react";
import SearchBar from "@Components/SearchBar";
import { headers, baseURL } from "@Api/Elasticsearch";
import axios from 'axios'

export interface State {
  totals: number[],
  loading: boolean,
  sortScore: string,
}

export interface Props {

}

export default class Benchmark extends React.Component<Props, State> {
  state = {
    records1: [],
    records2: [],
    records3: [],
    totals: [],
    loading: false,
    minScore: 12,
    sortScore: 'desc',
  }

  onChange = ({ currentTarget }: { currentTarget: HTMLInputElement }) => {
    console.log("on change", currentTarget)
    this.getEsAndResults(currentTarget.value)
    this.getEsOrResults(currentTarget.value)

    // run es with AND
    // run es with OR
    // run ml algo
  }

  getEsAndResults = (keywords: string) => {
    this.setState({ loading: true });
    let body = {
      size: 10,
      "sort": { "_score": { "order": "asc" } }
    }

    let words = keywords.split(',').map(c => '(' + c + ')').join(' AND ')

    axios
      .post(baseURL + "/patents/_search?q=" + words, body, { headers })
      .then(({ data }: any) => {
        console.log("RES CHART", data);
        console.log(data.hits.total);
        this.setState(prev => {
          let newTotals = prev.totals.slice();
          newTotals[0] = data.hits.total;
          return {
            records1: data.hits.hits.map((c: any) => c._source),
            totals: newTotals,
          }
        });
      });
  }

  getEsOrResults = (keywords: string) => {
    this.setState({ loading: true });
    let body = {
      size: 10,
      min_score: this.state.minScore,
      "sort": { "_score": { "order": "asc" } }
    }

    let words = keywords.split(',').map(c => '(' + c + ')').join(' OR ')

    axios
      .post(baseURL + "/patents/_search?q=" + words, body, { headers })
      .then(({ data }: any) => {
        console.log("RES CHART", data);
        console.log(data.hits.total);
        this.setState(prev => {
          let newTotals = prev.totals.slice();
          newTotals[1] = data.hits.total;
          return {
            records2: data.hits.hits.map((c: any) => c._source),
            totals: newTotals,
          }
        });
      });
  }

  getRecord(record: any, i: number) {
    console.log('RECORD', record)
    return <div className="record" key={i}>{record.title}</div>
  }

  render() {

    return (
      <div>
        <SearchBar onChange={this.onChange} keywords={"chanel, john smith, augmented reality, beauty"} />
        <div>These results are sorted by LEAST relevant by default to check the end ranges</div>
        <span>Sort by:</span> <button onClick={() =>
          this.setState(prev => ({
            sortScore: prev.sortScore === 'desc' ? 'asc' : 'desc'
          }))}>{this.state.sortScore === 'desc' ? 'least relevant' : 'most relevant'}</button>
        <div className="row" style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1, padding: '12px' }}>
            <h2>ES AND</h2>
            <div><span>Total</span> {this.state.totals[0]}</div>
            <hr />
            <div>
              {this.state.records1.map(this.getRecord)}
            </div>
          </div>
          <div style={{ flex: 1, padding: '12px' }}>
            <h2>ES OR</h2>
            <div><span>Total</span> {this.state.totals[1]}</div>
            <hr />
            <div>
              {this.state.records2.map(this.getRecord)}
            </div>
          </div>
          {/* <div>
            ML
          {this.state.records3.map(this.getRecord)}
          </div> */}

        </div>
      </div>
    )
  }
}
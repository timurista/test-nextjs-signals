import React, { Component } from "react";
import * as d3 from "d3";
import world from "./world";
import transformer from "./transform";
import numeral from "numeral";

const width = 800;
const height = 400;

export interface Props {
  data: any;
}

class CountryMap extends Component<Props> {
  render() {
    let projection = d3
      .geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, 50 + height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);
    const countries = world.features.map((d, i) => (
      <path key={"path" + i} d={pathGenerator(d)} className="countries" />
    ));

    let dots;
    const { topCountries } = transformer(this.props.data);
    dots = topCountries.map((d, i) => {
      const path = projection(d.cords);
      if (!path) {
        return null;
      }
      const cx = path[0];
      const cy = path[1];
      const weight = d.count / topCountries[0].count;
      const r = `${Math.floor(weight * 30 + 18).toFixed(0)}px`;
      return (
        <g>
          <circle
            key={"circle" + i}
            cx={cx}
            cy={cy}
            className="cirlce"
            r={r}
            fill={"red"}
          />
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            className="label"
            title={d.name}
            fill={"white"}
            dy="0.3em"
          >
            {numeral(d.count).format("0[.]0a")}
          </text>
        </g>
      );
    });

    // let tooltips = [];
    console.log("data", this.props.data);

    // var map = g
    //   .selectAll("path")
    //   .data(topojson.feature(worldTopo, worldTopo.objects.countries).features)
    //   .enter()
    //   .append("path")
    //   .attr("d", d => {
    //     return path(d);
    //   })
    //   .attr("fill", "#777");

    // // TOOLTIP
    // let tip = d3Tip()
    //   .attr("class", "d3-tip")
    //   .html((d, i) => {
    //     let item = topCountries[i];
    //     let text = item.name
    //       ? `<strong>${item.name}</strong>`
    //       : `<strong>Country Code: </strong><span>${item.countryAbbrev}</span>`;
    //     return text;
    //   });
    // g.call(tip);

    // var div = d3
    //   .select("body")
    //   .append("div")
    //   .attr("id", "tooltip")
    //   .attr("class", "tooltip")
    //   .style("opacity", 0);

    // const update = () => {
    //   div.style("opacity", 0);

    //   // console.log('DATA', topCountries, countryCords);
    //   g.append("g")
    //     .selectAll("circle")
    //     .data(countryCords)
    //     .enter()
    //     .append("g")
    //     .attr("class", "count-circle")
    //     .append("circle")
    //     .attr("class", "country-circle")
    //     .attr("cx", function(d) {
    //       return projection(d)[0];
    //     })
    //     .attr("cy", function(d) {
    //       return projection(d)[1];
    //     })
    //     .attr("r", function(d, i) {
    //       if (topCountries[i]) {
    //         const weight =
    //           topCountries[i].patentCount / topCountries[0].patentCount;
    //         return `${Math.floor(weight * 30 + 18).toFixed(0)}px`;
    //       }
    //     })
    //     .attr("fill", "red")
    //     .on("mouseover", tip.show)
    //     .on("mouseout", tip.hide);

    //   g.append("g")
    //     .selectAll("text")
    //     .data(countryCords)
    //     .enter()
    //     .append("text")
    //     .attr("class", "country-count")
    //     .attr("x", function(d) {
    //       return projection(d)[0];
    //     })
    //     .attr("y", function(d) {
    //       return projection(d)[1];
    //     })
    //     .text(function(d, i) {
    //       if (topCountries[i]) {
    //         return new NumeralPipe(topCountries[i].patentCount).format(
    //           "0.[0]a"
    //         );
    //       }
    //     })
    //     .attr("dy", ".3em")
    //     .attr("text-anchor", "middle")
    //     .attr("fill", "white");
    // };
    return (
      <svg width={width} height={height}>
        {countries}
        {dots}
      </svg>
    );
  }
}
export default CountryMap;

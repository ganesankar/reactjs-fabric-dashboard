import React, { Fragment } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import HighchartsXrange from "highcharts/modules/xrange";
import moment from "moment";
import appConstants from "../../constants/appConstants";
HighchartsXrange(Highcharts);
export function getUTCDate(tdate) {
  const pD =
    tdate === "c" || tdate === "p" ? moment().format("DD/MM/YYYY") : tdate;
  const p = moment(pD, ["DD/MM/YYYY"]).format("x");
  return Number(p);
}
let loadChart = false;
export default class HighXrangeChart extends React.Component {
  state = {
    modal: false,
    config: {
      chart: {
        type: "xrange",
        backgroundColor: "#27293d"
      },
      title: false,
      xAxis: {
        type: "datetime"
      },
      yAxis: {
        gridLineColor: appConstants.gridLineColor1,
        tickColor: appConstants.gridLineColor1,
        title: false,
        categories: [],
        reversed: true
      },
      legend: {},
      credits: false,
      series: [
        {
          name: "Experience",
          pointWidth: 30,
          pointPadding: 0,
          groupPadding: 0,
          data: [],
          dataLabels: {
            align: "left",
            enabled: true,
            color: "#FFFFFF",
            format: "{point.z}",
            style: appConstants.StyleAxis1,
            overflow: false,
            y: 1
          }
        }
      ]
    }
  };

  render() {
    const { data } = this.props;
    let { config } = this.state;
    if (data && data.values.length > 0) {
      data.values.forEach(function(itemx, indexx) {
        //console.log("itemx", itemx);

        config.yAxis.categories.push(itemx.company);
        const Dateres = {
          x: getUTCDate(itemx.startdate),
          x2: getUTCDate(itemx.enddate),
          y: indexx,
          z: itemx.name,
          tooTipContent: `<h3>${itemx.name}</h3><h4>${itemx.company}</h4> <h5>${itemx.startdate} - ${itemx.enddate}<h5/>`
        };
        config.tooltip = {
          shared: false,
          useHTML: true,
          headerFormat: "",
          pointFormat: "{point.tooTipContent}",
          footerFormat: "",
          valueDecimals: 2,
          backgroundColor: "#27293d",
          style: {
            color: "#F0F0F0"
          }
        };
        config.series[0].data.push(Dateres);
        config.plotOptions = {
          series: {
            cursor: "pointer",
            padding: 0.2,
            point: {
              events: {
                click: function() {
                  alert("Category: " + this.category + ", value: " + this.y);
                }
              }
            }
          }
        };
      });
      loadChart = true;
    }

    return (
      <Fragment>
        {loadChart && (
          <div className="card-chart card">
            <div className="card-header">
              <h5 className="card-category"> {data.desc}</h5>
              <h3 className="card-title">{data.title || data.name}</h3>
            </div>
            <div className="card-body">
              <HighchartsReact highcharts={Highcharts} options={config} />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

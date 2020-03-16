import React, { Fragment } from "react";

import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import appConstants from "../../constants/appConstants";

export default class HighBarChart extends React.Component {
  state = {
    modal: false,
    config: {
      title: false,
      legend: {},
      credits: false,
      subtitle: false,
      chart: {
        type: "column",
        backgroundColor: "#27293d",
        plotBorderColor: "#606063"
      },
      tooltip: appConstants.StyletoolTip1,
      xAxis: {
        gridLineColor: "#707073",
        lineColor: "#707073",
        minorGridLineColor: "#505053",
        tickColor: "#707073",
        tickWidth: 1,
        categories: [],

        labels: {
          rotation: -45,
          style: appConstants.StyleAxis1
        }
      },
      gridLineColor: "#707073",
      yAxis: [
        {
          gridLineColor: appConstants.gridLineColor1,
          tickColor: appConstants.gridLineColor1,
          title: {
            text: "Percentage"
          }
        }
      ],
      series: [
        {
          data: [],
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.1f}", // one decimal
            y: 10, // 10 pixels down from the top
            style: appConstants.StyleAxis1
          }
        }
      ]
    }
  };

  render() {
    const { data } = this.props;
    let { config } = this.state;
    console.log("data", data);
    if (data && data.values.length > 0) {
      data.values.forEach(function(itemx, indexx) {
        //console.log("itemx", itemx);

        config.xAxis.categories.push(itemx.name);
        config.series[0].data.push(Number(itemx.percentage));

        config.tooltip = {
          shared: false,
          useHTML: true,
          headerFormat: "",
          pointFormat:
            "<h4> {point.category}: {point.y}% </h4> {point.y} <h5> <h5/>",
          footerFormat: "",
          valueDecimals: 0,
          backgroundColor: "#27293d",
          style: {
            color: "#F0F0F0"
          }
        };
        config.plotOptions = {};
      });
    }

    return (
      <Fragment>
        {data && data.values.length > 0 && (
          <div className="card-chart card">
            <div className="card-header">
              <h5 className="card-category"> {data.desc}</h5>
              <h3 className="card-title">{data.title || data.name}</h3>
            </div>
            <div className="card-body">
              <PieChart highcharts={Highcharts} options={config} />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

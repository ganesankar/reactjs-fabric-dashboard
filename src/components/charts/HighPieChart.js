import React, { Fragment } from "react";

import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";
import HighchartsSunburst from "highcharts/modules/sunburst";
HighchartsSunburst(Highcharts);

export default class HighPieChart extends React.Component {
  state = {
    modal: false,
    expertConfig: {
      title: false,

      legend: {},
      credits: false,
      subtitle: false,
      chart: {
        type: "sunburst",
        backgroundColor: "#27293d"
      },
      series: [
        {
          data: [],
          allowDrillToNode: true,
          cursor: "pointer",
          dataLabels: {
            borderWidth: 0,
            filter: {
              property: "innerArcLength",
              operator: ">",
              value: 16
            },
            style: {
              textShadow: false,
              textOutline: null,
              color: "contrast"
            }
          },
          levels: [
            {
              level: 1,
              levelIsConstant: false,
              dataLabels: {
                filter: {
                  property: "outerArcLength",
                  operator: ">",
                  value: 64
                }
              },
              colorByPoint: true
            },
            {
              level: 2,
              colorVariation: { key: "brightness", to: -0.3 }
            },
            {
              level: 3,
              colorVariation: { key: "brightness", to: -0.3 }
            }
          ]
        }
      ]
    }
  };

  render() {
    const { data } = this.props;
    let { expertConfig } = this.state;
    let expD = [];
    let groupKey = "desc";
    if (data) {
      if (data.values && data.values.length > 0) {
        let newcontentkey = [];
        let cs = [];
        data.values.forEach(function(item) {
          newcontentkey.push(item[groupKey]);
        });
        let uniqkey = Array.from(new Set(newcontentkey));
        uniqkey.forEach(function(item, index) {
          let newOb = { id: index, name: item, values: [] };
          data.values.forEach(function(j) {
            if (j[groupKey] === item) {
              newOb.values.push(j);
            }
          });
          cs.push(newOb);
        });
        const expC = [];

        expC.push({ id: "0.0", parent: "", name: "Skills" });
        cs.forEach(function(itemX, indeX) {
          const p = {
            id: `${indeX + 1}.0`,
            parent: "0.0",
            name: itemX.name,
            value: 1
          };
          expC.push(p);
          itemX.values.forEach(function(itemy, indey) {
            const py = {
              id: `${indeX + 1}.${indey + 1}.0`,
              parent: `${indeX + 1}.0`,
              name: itemy.name,
              value: 1
            };
            expC.push(py);
            itemy.values.forEach(function(itemz, indez) {
              const pz = {
                id: `${indeX + 1}.${indey + 1}.${indez + 1}`,
                parent: `${indeX + 1}.${indey + 1}.0`,
                name: itemz,
                value: 1
              };
              expC.push(pz);
            });
          });
        });
        expD = expC.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
        expertConfig.series[0].data = expD;
      }
    }
    return (
      <Fragment>
        {expD && expD.length > 0 && (
          <div className="card-chart card">
            <div className="card-header">
              <h5 className="card-category"> {data.desc}</h5>
              <h3 className="card-title">{data.title || data.name}</h3>
            </div>
            <div className="card-body">
              <PieChart highcharts={Highcharts} options={expertConfig} />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

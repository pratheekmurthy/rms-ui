import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import config from '../../views/config.json';
class SourceMediaPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            export: {
              csv: {
                filename: 'Source Media',
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'count',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString();
                }
              }
            },
            autoSelected: 'zoom'
          },
          type: 'pie',
          width: 380
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    };
  }
  componentDidMount() {
    var data1 = [];
    var series1 = [];
    const apiUrl = config.APIS_URL + '/tickets/report/medium';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
       
        repos.data.map(({ _id, count }) => {
          if (_id === null) {
           
            data1.push('Undefied');
          } else {
            data1.push(_id);
          }
          series1.push(count);
        });

        this.setState({
          series: series1,
          options: {
            chart: {
              type: 'pie',
              width: 380
            },
            labels: data1,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            ]
          }
        });
      });
  }
  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
          height={320}
        />
      </div>
    );
  }
}

export default SourceMediaPieChart;

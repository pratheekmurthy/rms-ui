import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import config from '../../views/config.json';
class StatusPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
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
    const apiUrl = config.APIS_URL + '/tickets/report/status';
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

export default StatusPieChart;

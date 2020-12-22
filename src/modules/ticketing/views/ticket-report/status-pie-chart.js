import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class StatusPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [39, 77, 44, 22],
      options: {
        chart: {
          type: 'pie',
          width: 380
        },
        labels: ['Open', 'Work in Progress', 'Resolved', 'Close'],
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

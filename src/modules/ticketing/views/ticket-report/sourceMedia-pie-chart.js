import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class SourceMediaPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43],
      options: {
        chart: {
          type: 'pie',
          width: 380
        },
        labels: ['Whatsapp', 'Phone', 'Email', 'Team D'],
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

export default SourceMediaPieChart;

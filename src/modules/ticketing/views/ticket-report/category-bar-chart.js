import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class CategoryBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [
            'Delay dispatch',
            'Dispute',
            'Replacement',
            'Delay dispatch',
            'Dispute',
            'Replacement'
          ]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 4, 34, 66]
        }
      ]
    };
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width={'100%'}
        height={320}
      />
    );
  }
}

export default CategoryBarChart;

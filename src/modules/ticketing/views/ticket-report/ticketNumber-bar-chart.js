import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class TicketNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [
            'January',
            'Feburary',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'Septemeber',
            'October',
            'November',
            'December'
          ]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [303, 404, 245, 433, 344, 662, 893, 423, 344, 662, 993, 888]
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

export default TicketNumber;

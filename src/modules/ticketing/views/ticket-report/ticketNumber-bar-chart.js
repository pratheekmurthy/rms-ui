// import { count } from 'console';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import config from '../../views/config.json';
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    };
  }
  componentDidMount(){
   
  const apiUrl = config.APIS_URL + '/tickets/report/tickets';
  fetch(apiUrl)
    .then(res => res.json())
    .then(repos => {
      var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      
       repos.data.map(({ _id, count }, index) =>
   data[_id] = count
      
       );
      
      this.setState({
        series: [
          {
            name: 'series-1',
            data: data
          }
        ]
      });
      
    });

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

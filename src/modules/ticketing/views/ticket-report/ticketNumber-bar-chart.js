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
          id: 'Total Ticket'
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
      var data = [];
      
       repos.data.map(({ _id, count }, index) =>{
        
      for(var i=1; i<=12; i++){
      
if(i=== _id){
  data.push(count)
}
else{
  data.push("0")
}
      }
       });
    
      this.setState({
        options: {
        chart: {
          id: 'Total Ticket'
        },
        xaxis: {
          months: [
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
          name: 'count',
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

import { Box } from '@material-ui/core';
import React from 'react';

import { Line } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Targetted Distributors',
      fill: true,
      // lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // steppedLine: false,
      // borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [73, 59, 80, 80, 55, 55, 40]
    },
    {
      label: 'Distributors Response',
      fill: true,
      // lineTension: 0.1,
      backgroundColor: 'rgba(245, 51, 51,0.4)',
      borderColor: 'rgba(245, 51, 51,1)',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // steppedLine: false,
      // borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(245, 51, 51,1)',
      pointHoverBorderColor: 'rgba(229,229,229,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      data: [28, 48, 40, 19, 85, 27, 90]
    }
  ]
};

const options = {
  responsive: false,
  title: {
    display: true,
    text: 'All Campaign',
    backgroundColor: 'pink'
  }
};

const Charts = () => {
  return (
    <div>
      <Box style={{ margin: '1rem 1rem 0 1rem' }}>
        <h2>Promotions-iCoffee:Kerala</h2>
        <Line data={data} options={options} width={600} height={400} />
      </Box>
    </div>
  );
};

export default Charts;

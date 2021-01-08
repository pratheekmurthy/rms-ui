import React from 'react';
import Chart from 'react-apexcharts';

const series = [
  {
    name: 'Targetted Distributors',
    data: [73, 59, 83, 80, 55, 55, 40]
  },
  {
    name: 'Distributors Response',
    data: [28, 48, 40, 19, 85, 27, 90]
  }
];

const options = {
  chart: {
    height: 400,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'string',
    categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  }
};

const Charts = () => {
  return (
    <div>
      <div className="mixed-chart">
        <Chart options={options} series={series} type="area" width={650} />
      </div>
    </div>
  );
};

export default Charts;

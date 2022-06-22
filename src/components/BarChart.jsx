import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);
// import { Chart as ChartJS } from 'chart.js/auto';

function BarChart({ chartData, options }) {
  
  
  return (
    <Bar data={chartData} options={options} />
  );
}

export default BarChart;
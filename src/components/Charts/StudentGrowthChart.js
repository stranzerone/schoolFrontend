// src/Charts/StudentGrowthChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StudentGrowthChart = () => {
  // Dummy data for the chart
  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'], // Years
    datasets: [
      {
        label: 'Number of Students',
        data: [150, 200, 250, 300, 350], // Number of students for each year
        fill: false,
        borderColor: '#4CAF50', // Line color
        tension: 0.1, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Student Growth',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Students',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Student Growth Over Years</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default StudentGrowthChart;

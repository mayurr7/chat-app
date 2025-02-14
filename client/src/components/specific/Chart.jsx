import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  ArcElement,
  Legend,
  BarElement,
  Title,
  PointElement,
  LineElement,
  plugins,
  } from "chart.js";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  ArcElement,
  Legend,
  BarElement,
  Title,
  PointElement,
  LineElement,
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      
    },

  },

  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      }
    },
  }
}

const LineChart = ({value=[]}) => {
  const data = {
    labels,
    datasets: [
      {
      data: value,
      label: "Revenue",
      fill: true,
      backgroundColor : "rgba(13, 89, 89, 0.2)",
      borderColor: "rgb(33, 64, 162)",
    
    }
  ],
  };

  return (
    <div>
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: 120,
};

const DoughnutChart = ({value = [], labels = []}) => {
  const data = {
    labels,
    datasets: [
      {
      data: value,
    
      fill: true,
      backgroundColor : ["rgba(10, 54, 141, 0.43)", "rgba(187, 36, 28, 0.38)"],
      hoverBackgroundColor: ["rgb(39, 33, 162)", "rgb(162, 33, 33)"],
      borderColor: ["rgb(39, 33, 162)", "rgb(162, 33, 33)"],
      offset: 40, 
    
    },
  ],
  };
  return <Doughnut style={{zIndex: 10}} data={data} options={doughnutChartOptions}/>
};

export { LineChart, DoughnutChart };

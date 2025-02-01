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

const DoughnutChart = () => {
  return <div></div>;
};

export { LineChart, DoughnutChart };

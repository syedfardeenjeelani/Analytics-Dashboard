"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface WeatherData {
  day: string;
  temp: number;
}

export default function WeatherChart({ data }: { data: WeatherData[] }) {
  const chartData = {
    labels: data.map((item) => item.day), // Days for the X-axis
    datasets: [
      {
        label: "Temperature (°C)", // Label for the dataset
        data: data.map((item) => item.temp), // Temperature values for the Y-axis
        borderColor: "#8884d8", // Line color
        backgroundColor: "rgba(136, 132, 216, 0.2)", // Area fill under the line
        tension: 0.4, // Smooth curve
        fill: true, // Enable area fill
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        beginAtZero: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

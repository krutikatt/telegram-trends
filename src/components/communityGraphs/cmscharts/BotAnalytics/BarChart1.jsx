import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ActiveBotsOverTimeChart = ({
  labels = [], // Labels representing time periods (e.g., hours, days)
  activeBotsData = [], // Data representing the number of active bots over time
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)"
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const chartData = {
    labels,
    datasets: [
      {
        data: activeBotsData,
        backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            hover: {
              animationDuration: 500,
              mode: 'nearest',
              intersect: true,
            },
            plugins: {
              legend: {
                display: false, // Legend removed
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Active Bots: ${tooltipItem.raw}`; // Tooltip for active bots
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time Period", // X-axis label indicating time periods
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Active Bots", // Y-axis label for number of active bots
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? 'rgba(220, 220, 220, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}0.7` : `${backgroundColorLight}0.7`,
              },
            },
          }}
        />
      </div>

      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale the entire chart on hover */
          transition: transform 0.3s ease;
        }
        .chartjs-render-monitor:hover {
          transition: transform 0.3s ease;
          transform: scale(1.05); /* Scale specific bars on hover */
        }
      `}</style>
    </div>
  );
};

export default ActiveBotsOverTimeChart;

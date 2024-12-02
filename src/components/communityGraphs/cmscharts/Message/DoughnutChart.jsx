import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ title }) => {
  const [theme, setTheme] = useState("light");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Update data to represent bot vs human messages
  const data = {
    labels: ["Bot Messages", "Human Messages"],
    values: [300, 150], // Example counts; you can adjust these based on actual data
  };

  // Dynamically calculate the total
  const totalValue = data.values.reduce((acc, value) => acc + value, 0);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const themeColors = [
    "#45e8ed", "#69edf1", "#8df2f5", "#b0f7f8", "#d4fbfc", "#54d5d9", "#3fb3b5", "#2c9393",
    "#2db7ba", "#229ca1", "#1c8084", "#176364", "#11494c", "#0d3738", "#091f21", "#0b4a4c"
  ];

  const getColor = (value, max) => {
    const ratio = value / max;
    const index = Math.min(Math.floor(ratio * (themeColors.length - 1)), themeColors.length - 1);
    return themeColors[index];
  };

  const lightenColor = (color, amount) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00FF) + amount);
    const b = Math.min(255, (num & 0x0000FF) + amount);
    return `#${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  const maxValue = Math.max(...data.values);
  const baseColors = data.values.map(value => getColor(value, maxValue));
  const hoverColors = baseColors.map(color => lightenColor(color, 30));

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: selectedIndex === null
          ? baseColors
          : baseColors.map((color, i) => (i === selectedIndex ? color : "rgba(0, 0, 0, 0.1)")),
        hoverBackgroundColor: hoverColors,
        borderColor: baseColors.map(color => `${color}AA`),
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Hollow center
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#333" : "#FFF",
        titleColor: theme === "dark" ? "#FFF" : "#000",
        bodyColor: theme === "dark" ? "#FFF" : "#000",
        borderColor: theme === "dark" ? "#555" : "#CCC",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const value = data.values[context.dataIndex];
            return `${context.label}: ${value.toLocaleString()} (${((value / totalValue) * 100).toFixed(2)}%)`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedIndex(selectedIndex === index ? null : index);
      } else {
        setSelectedIndex(null);
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div style={chartContainerStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>} {/* Conditionally display title */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Doughnut data={chartData} options={options} />
        <div style={detailsStyle}>
          {selectedIndex !== null ? (
            <>
              <div style={{ ...titleStyle, fontSize: '14px', fontWeight: '600' }}>
                {data.labels[selectedIndex]}
              </div>
              <div style={{ ...valueStyle, fontSize: '18px', fontWeight: '500' }}>
                {`${data.values[selectedIndex].toLocaleString()} (${((data.values[selectedIndex] / totalValue) * 100).toFixed(2)}%)`}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...titleStyle, fontSize: '14px', fontWeight: '600' }}>Total</div>
              <div style={{ ...valueStyle, fontSize: '18px', fontWeight: '500' }}>
                {`${totalValue.toLocaleString()}`}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles for the chart container and tooltip
const chartContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
};

const detailsStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  zIndex: 10,
  pointerEvents: 'none',
};

const titleStyle = {
  fontSize: '12px',
  fontWeight: '500',
  textAlign: 'center',
};

const valueStyle = {
  fontSize: '18px',
  fontWeight: '500',
};

export default DoughnutChart;

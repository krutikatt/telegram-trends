import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart from "./cmscharts/Message/LineChart1";
import HeatMap from "./cmscharts/Message/HeatMap1";
import DoughnutChart from "./cmscharts/Message/DoughnutChart";
import NumberCard from "./cmscharts/Message/NumberCard";
import Leaderboard from "./cmscharts/Message/LeaderBoard";
import BarChart1 from "./cmscharts/Message/BarChart1";
import BarChart2 from "./cmscharts/Message/BarChart2";
import BarChart3 from "./cmscharts/Message/BarChart3";

const MessageAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
  heatMapCsvFile,   // CSV file for HeatMap
}) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);

  // Function to fetch and parse CSV data
  const fetchData = async (file, setData) => {
    try {
      const data = await csv(file);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  };

  useEffect(() => {
    fetchData(lineChartCsvFile, setLineChartData);
    fetchData(heatMapCsvFile, setHeatMapData);
  }, [lineChartCsvFile, heatMapCsvFile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Responsive layout
        gap: 1,
        height: "100%",
      }}
    >
      {/* Left column for graphs (3x2 grid layout) */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columns on large screens
          gridTemplateRows: "repeat(3, auto)",  // 3 rows on large screens
          gap: 1,
        }}
      >
        {/* Graph Cards */}
        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Messages
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <BarChart1 labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Most Active Days
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <BarChart2 labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Replies Count
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <BarChart3 labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} />
            </Box>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Hourly Messages
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <LineChart data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/* Heat Map */}
        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Activity
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <HeatMap data={heatMapData} />
            </Box>
          </CardContent>
        </Card>

        {/* Doughnut Chart */}
        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bot vs Human Messages
            </Typography>
            <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <DoughnutChart data={heatMapData} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Right column for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
        <Card sx={{ transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }, padding: 2 ,gap:1}}>
          <CardContent>
            <NumberCard title="Total Number Messages" number={1500} />
          </CardContent>
        </Card>

        <Card sx={{ flexGrow: 1, transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },marginTop: 1, height: "50%" }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MessageAnalyticsGraph;

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Anonymous/LineChart1"; 
import BarChart1 from "./cmscharts/Anonymous/LineChart2"; 
import NumberCard from "./cmscharts/Anonymous/NumberCard";
import HeatMap from "./cmscharts/Anonymous/HeatMap1";
import Leaderboard from "./cmscharts/Anonymous/LeaderBoard"; // Top Organizers

const AnonymousAnalyticsGraph = ({ lineChartCsvFile }) => {
  const [lineChartData, setLineChartData] = useState([]);

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
  }, [lineChartCsvFile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" }, // Responsive layout
        gap: 1,
        height: "100%",
      }}
    >
      {/* Left column for graphs (3x2 layout) */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2-column grid
          gridTemplateRows: "repeat(3, auto)",
          gap: 1,
        }}
      >
        {/* Number Card */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <NumberCard title="Total Anonymous Messages" number={500} />
        </Card>

        {/* Line Chart */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Anonymous Messages
          </Typography>
          <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <LineChart1 data={lineChartData} />
          </Box>
        </Card>

        {/* Active Days - Bar Chart */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Active Days
          </Typography>
          <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <BarChart1 labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} data={[30, 40, 35, 60, 50, 70, 80]} />
          </Box>
        </Card>

        {/* Activity Heatmap */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Activity Heatmap
          </Typography>
          <Box sx={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <HeatMap />
          </Box>
        </Card>
      </Box>

      {/* Right column for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" }, }}>
        <Card sx={{ height: "100%", padding: 2 }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AnonymousAnalyticsGraph;

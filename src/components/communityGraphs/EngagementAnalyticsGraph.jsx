import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Engagement/LineChart1";
import LineChart2 from "./cmscharts/Engagement/LineChart2";
import HeatMap from "./cmscharts/Engagement/HeatMap1";
import NumberCard from "./cmscharts/Engagement/NumberCard";
import Leaderboard from "./cmscharts/Engagement/LeaderBoard";

const EngagementAnalyticsGraph = ({
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
      {/* Left column for graphs (2x2 layout) */}
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
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
          <NumberCard title="Total Daily Messages" number={1000} /> {/* Replace with dynamic value */}
        </Card>

        {/* Line Chart 1 */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Unique Users
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LineChart1 data={lineChartData} />
          </Box>
        </Card>

        {/* Line Chart 2 */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Active Users
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LineChart2 data={lineChartData} />
          </Box>
        </Card>

        {/* Heat Map */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Engagement Activity
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeatMap data={heatMapData} />
          </Box>
        </Card>
      </Box>

      {/* Right column for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" }, }}>
        <Card
          sx={{
            height: "100%",
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
          }}
        >
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EngagementAnalyticsGraph;

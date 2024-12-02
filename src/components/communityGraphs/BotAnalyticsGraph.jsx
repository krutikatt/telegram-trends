import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/BotAnalytics/LineChart1";
import LineChart2 from "./cmscharts/BotAnalytics/LineChart2";
import BarChart1 from "./cmscharts/BotAnalytics/BarChart1";
import NumberCard from "./cmscharts/BotAnalytics/NumberCard";
import Leaderboard from "./cmscharts/BotAnalytics/LeaderBoard";

const BotAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
}) => {
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
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, auto)",
          gap: 1,
        }}
      >
        {/* Number Card 1 */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <NumberCard title="Total Bots" number={1500} />
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
            Bot Growth
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
            Bot Activity
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

        {/* Bar Chart */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Active Bots per Day
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BarChart1
              labels={["10-1", "10-2", "10-3", "10-4", "10-5"]}
              activeBotsData={[20, 30, 35, 40, 50]}
            />
          </Box>
        </Card>
      </Box>

      {/* Right column for leaderboard */}
      <Box sx={{ width: { xs: "100%", lg: "40%" } }}>
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

export default BotAnalyticsGraph;

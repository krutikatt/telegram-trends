import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/BotAnalytics/LineChart1";
import LineChart2 from "./cmscharts/BotAnalytics/LineChart1";
import BarChart1 from "./cmscharts/BotAnalytics/BarChart1";
import BarChart2 from "./cmscharts/BotAnalytics/BarChart2";
import NumberCard from "./cmscharts/BotAnalytics/NumberCard";
import HeatMap from "./cmscharts/BotAnalytics/HeatMap";
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
    <Box sx={{ padding: 0.5, display: "flex", width: "100%", height: "100%" }}>
      {/* Left side for graphs in a grid with NumberCard on top */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1, // Makes the left side grow to fill the height dynamically
        }}
      >
        {/* Graphs in a 2x2 grid */}
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, flexGrow: 1 }}
        >
          {/* Number Card for Total Users */}
          <Card
            sx={{
              height: "100%",  // Take full height
              width: "100%",   // Take full width
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,  // Ensure it grows to fill available space
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: 0,  // Remove padding to make full use of space
              }}
            >
              <NumberCard title="Total Number of Bots" number={1500} /> {/* Replace with dynamic value as needed */}
            </CardContent>
          </Card>

          {/* Line Chart 1 */}
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Interaction Rate
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95%",
                  width: "90%",
                }}
              >
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Line Chart 2 (Optional, duplicate as needed) */}
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
              Avg. Response Time
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95%",
                  width: "90%",
                }}
              >
                <LineChart2 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Heatmap */}
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
              Engagement by Time
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95%",
                  width: "90%",
                }}
              >
                <HeatMap data={lineChartData} /> {/* Add necessary data for HeatMap */}
              </Box>
            </CardContent>
          </Card>

          {/* Doughnut Chart */}
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{ textAlign: "center", padding: "8px", width: "90%", height: "100%" }}
            >
              <Typography variant="h6" gutterBottom>
               Top Commands
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "140px",
                }}
              >
                <BarChart1 
                 labels={["Command A", "Command B", "Command C", "Command D"]}
                 commandsData={[15, 30, 50, 10]}
                 />
              </Box>
            </CardContent>
          </Card>

          {/* Additional Bar Chart */}
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{ textAlign: "center", padding: "8px", width: "90%", height: "100%" }}
            >
              <Typography variant="h6" gutterBottom>
               Content Sharing
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "140px",
                }}
              >
                <BarChart2
                  labels={["Image", "Video", "Article", "Blog", "Podcast"]}
                  shareCountData={[1500, 3500, 1200, 800, 2000]}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Right side with the leaderboard in a card */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card sx={{ height: "100%", padding: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography variant="h6">Bot Leaderboard</Typography>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BotAnalyticsGraph;

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Engagement/LineChart1";
import BarChart1 from "./cmscharts/Engagement/BarChart1";
import BarChart2 from "./cmscharts/Engagement/BarChart2";
import HeatMap from "./cmscharts/Engagement/HeatMap1";
import NumberCard from "./cmscharts/Engagement/NumberCard";
import Leaderboard from "./cmscharts/Engagement/LeaderBoard";
import NumberCard2 from "./cmscharts/Engagement/NumberCard2";


const EngagementAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
  barChartCsvFile,  // CSV file for BarCharts
  heatMapCsvFile,   // CSV file for HeatMap
}) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
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
    fetchData(barChartCsvFile, setBarChartData);
    fetchData(heatMapCsvFile, setHeatMapData);
  }, [lineChartCsvFile, barChartCsvFile, heatMapCsvFile]);

  return (
    <Box sx={{ padding: 0.5, display: "flex", width: "100%", height: "100%" }}>
      {/* Left side for graphs */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1, // Makes the left side grow to fill the height dynamically
        }}
      >
        {/* Number Cards */}
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}
        >
          <Card
            sx={{
              height: "100px",
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
              <NumberCard title="TotalEngagement" likes={150} comments={50} shares={20} />
            </CardContent>
          </Card>
          <Card
            sx={{
              height: "100px",
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
              <NumberCard2 title="Total Inactive Members" inactiveMembers={42} />
            </CardContent>
          </Card>
        </Box>

        {/* Graphs (2 Bar Charts, 1 Line Chart, 1 HeatMap) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            flexGrow: 1,
          }}
        >
          {/* Bar Chart 1 */}
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
              Member Interactions
              </Typography>
              <BarChart1 
                labels={["Member A", "Member B", "Member C"]} // Example member labels
                interactionsData={[10, 15, 20]} // Example interactions data
              
              />
            </CardContent>
          </Card>

          {/* Bar Chart 2 */}
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
              Top 5 Message Engagement
              </Typography>
              <BarChart2 
              labels={["Message 1", "Message 2", "Message 3", "Message 4", "Message 5"]}
              engagementData={[15, 40, 23, 12, 30]}
              />
            </CardContent>
          </Card>

          {/* Line Chart */}
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
               
Engagement Trends
              </Typography>
              <LineChart1 data={lineChartData} />
            </CardContent>
          </Card>

          {/* HeatMap */}
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
                Engagement Activity
              </Typography>
              <HeatMap data={heatMapData} />
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Right side for leaderboard */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card
          sx={{
            height: "100%",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
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

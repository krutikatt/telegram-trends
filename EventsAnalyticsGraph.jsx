import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/EventAnalytics/LineChart1"; // Events Created
import BarChart1 from "./cmscharts/EventAnalytics/BarChart1"; // Active Days
import LineChart2 from "./cmscharts/EventAnalytics/LineChart2"; // Engagement
import BarChart2 from "./cmscharts/EventAnalytics/BarChart2"; // Promotion
import Heatmap from "./cmscharts/EventAnalytics/HeatMap"; 
import Leaderboard from "./cmscharts/EventAnalytics/LeaderBoard"; // Top Organizers
import EventFeedbackChart from "./cmscharts/EventAnalytics/DoughnutChart";
import NumberCard from "./cmscharts/EventAnalytics/NumberCard";
// Optionally: import WordCloud from './WordCloud'; // Popular Topics (if you plan to add this)

const EventAnalyticsGraph = ({ lineChartCsvFile }) => {
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
      {/* Left side for graphs in a grid */}
      <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
        {/* Number Card takes full width */}
        <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
          <CardContent>
            <Typography variant="h6">Total Events</Typography>
            <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <NumberCard totalEvents={120} /> {/* Replace with dynamic value as needed */}
            </Box>
          </CardContent>
        </Card>

        {/* Remaining graphs in 3 rows, 2 columns grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 1, flexGrow: 1 }}>
          
          {/* Events Created - Line Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Follow-up Engagement</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Active Days - Bar Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Event Engagement</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart1 labels={['Event 1', 'Event 2', 'Event 3']} data={[100, 200, 150]} />
              </Box>
            </CardContent>
          </Card>

          {/* Engagement - Line Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Engagement Trend</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LineChart2 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Promotion - Bar Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Events Popularity</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart2 labels={["Event 1", "Event 2", "Event 3"]} data={[50, 70, 40]} />
              </Box>
            </CardContent>
          </Card>

          {/* Doughnut Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Event Feedback</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <EventFeedbackChart data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Heatmap */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Event Heatmap</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Heatmap data={lineChartData} /> {/* Use the actual data structure required by the Heatmap component */}
              </Box>
            </CardContent>
          </Card>

        </Box>
      </Box>

      {/* Right side for Leaderboard */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card sx={{ height: "50%", padding: 2, display: "flex", flexDirection: "column", justifyContent: "top", transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EventAnalyticsGraph;

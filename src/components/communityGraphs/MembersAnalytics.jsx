import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Member/LineChart1";
import LineChart2 from "./cmscharts/Member/LineChart2";
import HeatMap from "./cmscharts/Member/HeatMap";
import DoughnutChart from "./cmscharts/Member/DoughnutChart";
import NumberCard from "./cmscharts/Member/NumberCard";
import Leaderboard from "./cmscharts/Member/LeaderBoard";

const MemberAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
  heatMapCsvFile, // CSV file for HeatMap
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
          <NumberCard title="Total Members" number={1500} />
        </Card>

        {/* Number Card 2 */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <NumberCard title="Active Members" number={1200} />
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
            Daily Growth
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
            Engagement Over Time
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LineChart2
              labels={[
                "10-01",
                "10-02",
                "10-03",
                "10-04",
                "10-05",
                "10-06",
                "10-07",
              ]}
              data={[100, 120, 90, 150, 80, 170, 200]}
            />
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
            Activity Heatmap
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

        {/* Doughnut Chart */}
        <Card
          sx={{
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Bots vs Members
          </Typography>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DoughnutChart data={heatMapData} />
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

export default MemberAnalyticsGraph;

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Member/LineChart1";
import TotalMemberActivityChart from "./cmscharts/Member/BarChart";
import HeatMap from "./cmscharts/Member/HeatMap";
import DoughnutChart from "./cmscharts/Member/DoughnutChart";
import NumberCard from "./cmscharts/Member/NumberCard";
import Leaderboard from "./cmscharts/Member/LeaderBoard";
import BarChart2 from "./cmscharts/Member/BarChart2";
import BarChart3 from "./cmscharts/Member/BarChart3";
import BarChart4 from "./cmscharts/Member/BarChart4";
import HorizontalBar from "./cmscharts/Member/HorizontalBar1";
import SelfPromoterChart from "./cmscharts/Member/HorizontalBar2";
import BarChart5 from "./cmscharts/Member/BarChart5";
import HorizontalBar3 from "./cmscharts/Member/HorizontalBar3";
import LineChart2 from "./cmscharts/Member/LineChart2";
import  BarChart6 from "./cmscharts/Member/BarChart6";
import RoleMisuseChart from "./cmscharts/Member/RoleMisuseChart";

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
    <Box sx={{ padding: 0.5, display: "flex", width: "100%", height: "100%" }}>
      {/* Left side for graphs in a grid with NumberCard on top */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1,
        }}
      >
        {/* Row with two NumberCards aligned horizontally */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            sx={{
              width: "50%",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <NumberCard title="Total Members" number={1500} />
          </Box>
          <Box
            sx={{
              width: "50%",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <NumberCard title="Active Members" number={1200} />
          </Box>
        </Box>

        {/* Graphs in a 2x2 grid below NumberCard */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            flexGrow: 1,
          }}
        >
          {/* Line Chart 1 for Daily Growth */}
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
                Member Growth
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90%",
                  width: "90%",
                }}
              >
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

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
                Inactive Periods
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90%",
                  width: "90%",
                }}
              >
                <LineChart2 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Bar Chart  for Engagement Rate Over Time */}
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
                Total Member Activity
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
                <TotalMemberActivityChart
                  labels={["Login", "Post", "Like", "Share"]}
                  data={[150, 200, 300, 100]}
                />
              </Box>
            </CardContent>
          </Card>
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
              Repeated Activity
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
                <BarChart2
                  senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                  messageCounts={[5, 8, 2, 10]}
                />
              </Box>
            </CardContent>
          </Card>
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
              Over Posting
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
                <BarChart3
                  senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                  postCounts={[25, 40, 15, 30]}
                />
              </Box>
            </CardContent>
          </Card>
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
              Content Repetition
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
                <BarChart4
                  senderNames={["Alice", "Bob", "Charlie", "Diana"]}
                  repeatedCounts={[10, 25, 5, 15]}
                />
              </Box>
            </CardContent>
          </Card>
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
              Spam Behavior

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
                <HorizontalBar
                  senderNames={["Alice", "Bob", "Charlie", "Diana"]} // Example sender names
                  spamCounts={[15, 40, 10, 25]} // Example spam message counts
                />
              </Box>
            </CardContent>
          </Card>

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
              Low-Quality Messages
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
                <BarChart5
                  senderNames={["Alice", "Bob", "Charlie", "Diana"]} // Example sender names
                  lowQualityCounts={[5, 3, 2, 7]} // Example low-quality message counts
                />
              </Box>
            </CardContent>
          </Card>

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
              Self Promoters

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
                <SelfPromoterChart
                  senderNames={[
                    "Alice",
                    "Bob",
                    "Charlie",
                    "David",
                    "Eva",
                    "Frank",
                    "Grace",
                    "Helen",
                    "Irene",
                    "Jack",
                  ]}
                  selfPromotionalCounts={[
                    25, // Alice
                    15, // Bob
                    40, // Charlie
                    10, // David
                    60, // Eva
                    30, // Frank
                    50, // Grace
                    35, // Helen
                    20, // Irene
                    45, // Jack
                  ]}
                />
              </Box>
            </CardContent>
          </Card>

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
              RepetitiveFeedback

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
                <BarChart6
senderNames={["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George"]}
repeatedFeedbackCounts={[8, 15, 6, 20, 10, 12, 5]}


                />
              </Box>
            </CardContent>
          </Card>

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
                Repetitive  Reactions
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
                <HorizontalBar3
                  senderNames={["Alice", "Bob", "Charlie", "David", "Eve"]}
                  reactionsCounts={[120, 85, 92, 135, 75]}
                />
              </Box>
            </CardContent>
          </Card>


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
              Role Misuse
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
                <RoleMisuseChart
                   senderNames={["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George"]}
                   activityCounts={[5, 12, 8, 15, 10, 7, 13]
                   }
                />
              </Box>
            </CardContent>
          </Card>

          {/* Heat Map for Activity Heatmap */}
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
                width: "90%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Activity Heatmap
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
                <HeatMap data={heatMapData} />
              </Box>
            </CardContent>
          </Card>

          {/* Doughnut Chart for Bots vs Members
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
                width: "90%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Bots vs Members
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
                <DoughnutChart data={heatMapData} />
              </Box>
            </CardContent>
          </Card>*/}
        </Box>
      </Box>

      {/* Right side with the leaderboard in a card */}
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

export default MemberAnalyticsGraph;

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaChevronDown, FaAngleRight } from "react-icons/fa";
import SchedulePost from "./communityGraphsUpdated/SchedulePost";
import MembersAnalytics from "./communityGraphsUpdated/MembersAnalytics";
import EventsAnalyticsGraph from "./communityGraphsUpdated/EventsAnalyticsGraph";
import BotAnalyticsGraph from "./communityGraphsUpdated/BotAnalyticsGraph";
import EngagementAnalyticsGraph from "./communityGraphsUpdated/EngagementAnalyticsGraph";
import MessageAnalyticsGraph from "./communityGraphsUpdated/MessageAnalyticsGraph";
import AnonymousAnalyticsGraph from "./communityGraphsUpdated/AnonymousAnalyticsGraph";
import { usePermissions } from "../context/PermissionsContext";
import LevelSection from "./LevelSection";
import Leaderboard from "./Leaderboard";
import TelegramIcon from '@mui/icons-material/Telegram'; //added
import axios from "axios"; //added
import Footer from "../components/Footer"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import BubbleMap from '../components/BubbleChart'; // Import your existing BubbleMap component
import SentimentMeter from '../components/SentimentMeter'; // Import your existing SentimentMeter component
//import SummaryBox from '../components/SummaryBox'; // Import your existing SummaryBox component
import WorldMap from '../components/WorldMap'; // Import your existing WorldMap component


const CommunityManagement = ({logoSrc, setIsAuthenticated }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [openSections, setOpenSections] = useState(Array(8).fill(false)); // Adjust length based on items
  const { state, dispatch } = usePermissions();
  const [requestId, setRequestId] = useState(''); //added
  const botUsername = "Login_Dashboard_bot"; //added
  const [token, setToken] = useState(null); //added
  const intervalRef = useRef(null);//added
  const [user, setUser] = useState('');//added
  const [adminForm, setAdminForm] = useState(false);



  const users = [
    { username: user, userPoints: 1000 },
    { username: 'Alex', userPoints: 650 },
    { username: 'Jordan', userPoints: 850 },
    { username: 'Taylor', userPoints: 310 },
    // Add more users as needed
  ];



  const items = [
    "Bots",
    "Members",
    "Engagement",
    "Messages",
    "Events",
    "Anonymous",
  ];

  const sectionRefs = useRef(items.map(() => React.createRef()));

  const handleClick = (index) => {
    setClickedIndex(index);
    sectionRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const renderGraph = (index) => {
    switch (index) {
      case 0:
        return <BotAnalyticsGraph />;
      case 1:
        return <MembersAnalytics />;
      case 2:
        return <EngagementAnalyticsGraph />;
      case 3:
        return <MessageAnalyticsGraph />;
      case 4:
        return <EventsAnalyticsGraph />;
      case 5:
        return <AnonymousAnalyticsGraph />;
      default:
        return null;
    }
  };

  const updateBotPermissions = (groupType) => {
    const normalGroupPermissions = {
      readMessages: true,
      addMembers: true,
      sendMessages: true,
      inviteViaLink: true,
    };

    const privateGroupPermissions = {
      ...normalGroupPermissions,
      adminPermissions: true,
      disableBotPrivacyMode: true,
    };

    const appliedPermissions = groupType === "private" ? privateGroupPermissions : normalGroupPermissions;

    dispatch({ type: 'UPDATE_PERMISSIONS', payload: appliedPermissions });
  };

  useEffect(() => {
    // Example of updating permissions for a private group
    updateBotPermissions("private");
  }, []);

    // handles login w telegram button, sets requestId through backend call :: ADDED
    const click = async () => {
      try {
        const response = await axios.post(`https://1a99-27-6-209-17.ngrok-free.app/auth/telegram`);
        const reqId = response.data.reqId;
        console.log("Received requestId:", reqId);
        setRequestId(reqId); // Set the requestId state

      } catch (error) {
        console.log("error fetching requestId", error);
      }
    };
    useEffect(() => { //ADDED
      console.log("useEffect triggered with requestId:", requestId, "and token:", token);
      if (!requestId || token) return;

      const checkAuthStatus = async () => {
        try {
          if ((!requestId) || token) return;
          console.log("Checking auth status...");
          const res = await axios.get(`https://1a99-27-6-209-17.ngrok-free.app/auth/telegram/status/${requestId}`, {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          });
          console.log(res.data);
          if (res.data.status === true) {
            console.log("User authenticated:", res.data);
            setToken(res.data.token);
            setUser(res.data.username);
            clearInterval(intervalRef.current); // Use the ref to clear the interval
            setIsAuthenticated(true)
          }
        } catch (error) {
          console.error("User not authorized", error);
        }
      };

      intervalRef.current = setInterval(checkAuthStatus, 5000); // Set the interval and store it in the ref

      return () => clearInterval(intervalRef.current); // Clear the interval on component unmount
    }, [requestId, token]);



    //useEffect to direct user to telegram, once requestId is fetched from backend :: ADDED
    useEffect(() => {
      if (requestId) {
        const url = `tg://resolve?domain=${botUsername}&start=${requestId}`;
        console.log("Redirect URL:", url);
        if (url && !(navigator.userAgent.indexOf("Firefox") > -1)) {
          // Trigger the login by opening the Telegram app (in most browsers)
          let anchor = document.createElement("a");
          anchor.href = url;
          anchor.target = "_blank";
          anchor.click();
          anchor.remove();
        }
      }
    }, [requestId]);


    return (

      <Box sx={{ height: "100vh", overflowY: "auto", backgroundColor: "#000", padding: { xs: "10px", md: "20px" } }}>
        {/* Header Section */}
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
          <img src={logoSrc || `${process.env.PUBLIC_URL}/assets/logo2.png`} alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          <Typography variant="h4" fontWeight="bolder" color="#54d5d9" sx={{ flexGrow: 1 }}>
            Telegram Trends
          </Typography>
          <Box display="flex" alignItems="center" gap="20px">

            {/* Telegram Login Widget */}
            {!token ? (
              <div className="telegram-login" data-size="large" data-radius="30" data-request-access="write">
                <Button
                  onClick={click}
                  className="login-button"
                  variant="contained"
                  size="large"
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#41acc4",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    padding: { xs: "8px 12px", sm: "10px 20px" },
                    "&:hover": {
                      backgroundColor: "#369bab",
                    },
                    "@media (max-width: 600px)": {
                      width: "100%",
                      justifyContent: "center",
                    },
                  }}
                >
                  <TelegramIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
                  Login with Telegram
                </Button>
              </div>
            ) : (
              <Typography
                variant="h6"
                style={{ color: "#54d5d9", fontWeight: "bold" }}
              >
                Welcome, {user}
              </Typography>
            )}
          </Box>
        </Box>
        {/* Content Section */}
        {token && (
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px">
          {/* Left Sidebar with Leaderboard, Level, and Badges */}
          <Box sx={{ flex: 1, marginRight: "20px", width: "100%" }}>
            <LevelSection />
            <Leaderboard users={users} />

          </Box>

          {/* Main content area */}
          <Box sx={{ flex: 3 }}>
            {/* Additional content can be added here */}
          </Box>
        </Box>
      )}


      {/* Separator */}
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: "#54d5d9",
          marginBottom: "20px",
        }}
      />

      {/* Dynamic Sections */}

      <Box display="flex" flexDirection="column" marginTop="20px">
        {items.map((item, index) => (
          <Box
            key={index}
            marginBottom="15px"
            ref={sectionRefs.current[index]}
            sx={{
              transition: "height 0.5s ease",
              overflow: "hidden",
              height: openSections[index] ? "auto" : "100px",
              maxWidth: "100%",
            }}
          >
            <Box display="flex" alignItems="center">
              <Button
                onClick={() => toggleSection(index)}
                sx={{
                  backgroundColor: "#121212",
                  color: "#fff",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                {openSections[index] ? <FaChevronDown size={20} /> : <FaAngleRight size={20} />}
              </Button>
              <Typography
                variant="h4"
                onClick={() => handleClick(index)}
                sx={{
                  color: clickedIndex === index ? "#54d5d9" : "#fff",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  "&:hover": { color: "#54d5d9" },
                }}
              >
                {item}
              </Typography>
            </Box>
            {openSections[index] && (
              <Box
                sx={{
                  backgroundColor: "#121212",
                  padding: "10px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  color: "#fff",
                }}
              >
                {renderGraph(index)}
              </Box>
            )}
          </Box>

        ))}
      </Box>

           {/* Footer Section */}
            {/* Footer Section - Navigation Bar */}
            <Footer
        sx={{
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          padding: "1px",
          backgroundColor: "transparent",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
          }}

          onClick={() => console.log("Home clicked!")} // Add navigation logic here
        >
          Home
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => console.log("Groups clicked!")} // Add navigation logic here
        >
          Groups
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => console.log("Profile clicked!")} // Add navigation logic here
        >
          Profile
        </Typography>
      </Footer>

    </Box>
  );
};

export default CommunityManagement;
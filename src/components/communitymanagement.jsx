import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaChevronDown, FaAngleRight } from "react-icons/fa";
import SchedulePost from "./communityGraphs/SchedulePost";
import MembersAnalytics from "./communityGraphs/MembersAnalytics";
import EventsAnalyticsGraph from "./communityGraphs/EventsAnalyticsGraph";
import BotAnalyticsGraph from "./communityGraphs/BotAnalyticsGraph";
import EngagementAnalyticsGraph from "./communityGraphs/EngagementAnalyticsGraph";
import MessageAnalyticsGraph from "./communityGraphs/MessageAnalyticsGraph";
import AnonymousAnalyticsGraph from "./communityGraphs/AnonymousAnalyticsGraph";
import { usePermissions } from "../context/PermissionsContext";

const CommunityManagement = ({ colors, logoSrc }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [openSections, setOpenSections] = useState(Array(8).fill(true)); // Adjust length based on items
  const { state, dispatch } = usePermissions();

  const items = [
    "Scheduling",
    "Members",
    "Events",
    "Bots",
    "Engagement",
    "Messages",
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
        return <SchedulePost />;
      case 1:
        return <MembersAnalytics />;
      case 2:
        return <EventsAnalyticsGraph />;
      case 3:
        return <BotAnalyticsGraph />;
      case 4:
        return <EngagementAnalyticsGraph />;
      case 5:
        return <MessageAnalyticsGraph />;
      case 6:
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

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#000", // Set background to black
        padding: { xs: "10px", md: "20px" },
      }}
    >
      {/* Logo and Title Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20px"
      >
        <img
          src={logoSrc || `${process.env.PUBLIC_URL}/assets/logo2.png`}
          alt="Logo"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
        <Typography
          variant="h4"
          fontWeight="bolder"
          color="#54d5d9"
          sx={{ flexGrow: 1 }}
        >
          Community Analytics Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap="20px">
          <Typography
            variant="body1"
            sx={{ color: colors.grey[100], fontWeight: "bold", fontSize: "0.9rem" }}
          >
            Logs: Last Updated 10 mins ago
          </Typography>
          {/* Telegram Login Widget */}
          <div
            className="telegram-login"
            data-size="large"
            data-radius="10"
            data-request-access="write"
          >
           
          </div>
        </Box>
      </Box>

      {/* Navbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: "transparent",
          padding: { xs: "5px 10px", lg: "10px 20px" },
          borderRadius: "8px",
          marginBottom: "20px",
          overflowX: "auto",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {items.map((item, index) => (
            <Typography
              key={index}
              onClick={() => handleClick(index)}
              sx={{
                color: clickedIndex === index ? "#54d5d9" : "#fff", // Adjust colors
                fontWeight: clickedIndex === index ? "bold" : "normal",
                cursor: "pointer",
                fontSize: clickedIndex === index ? "1.2rem" : "1rem",
                textDecoration: clickedIndex === index ? "underline" : "none",
                "&:hover": {
                  color: "#54d5d9",
                  textDecoration: "underline",
                },
                transition: "all 0.3s ease",
              }}
            >
              {item}
            </Typography>
          ))}
        </div>
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: "#54d5d9",
          marginBottom: "20px",
        }}
      />

      {/* Sections */}
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
              {/* Toggle Icon */}
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
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                {openSections[index] ? (
                  <FaChevronDown size={20} />
                ) : (
                  <FaAngleRight size={20} />
                )}
              </Button>

              {/* Heading */}
              <Typography
                variant="h4"
                onClick={() => handleClick(index)}
                sx={{
                  color: clickedIndex === index ? "#54d5d9" : "#fff",
                  fontWeight: "bolder",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#54d5d9",
                  },
                }}
              >
                {item}
              </Typography>
            </Box>

            {/* Section Content */}
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
    </Box>
  );
};

export default CommunityManagement;

import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { usePermissions } from "../context/PermissionsContext";

const LevelSection = () => {
  const { state } = usePermissions();
  const { userLevel, userPoints, userBadges } = state;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#121212", borderRadius: "8px" }}>
      <Typography variant="h5" color="#54d5d9">User Level</Typography>
      <Typography variant="h6" color="#fff">Level: {userLevel}</Typography>
      <Typography variant="body1" color="#fff">Points: 1000</Typography>
      <LinearProgress variant="determinate" value={(userPoints % 100) / 100 * 100} sx={{ marginTop: "10px", backgroundColor: "#333", '& .MuiLinearProgress-bar': { backgroundColor: '#54d5d9' } }} />
      <Box display="flex" gap="10px" flexWrap="wrap">
        {userBadges.map((badge, index) => (
          <Box key={index} sx={{ padding: "10px", backgroundColor: "#333", borderRadius: "50%" }}>
            <img src={badge.image} alt={badge.name} style={{ width: "50px", height: "50px" }} />
            <Typography variant="caption" color="#fff">{badge.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LevelSection;

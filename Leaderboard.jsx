import React from "react";
import { Box, Typography } from "@mui/material";
import { usePermissions } from "../context/PermissionsContext";

const Leaderboard = ({ users }) => {
  return (
    <Box sx={{ padding: "20px", backgroundColor: "#121212", borderRadius: "8px" }}>
      <Typography variant="h5" color="#54d5d9">Leaderboard</Typography>
      {users.sort((a, b) => b.userPoints - a.userPoints).map((user, index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", backgroundColor: "#333", padding: "10px", borderRadius: "8px" }}>
          <Typography variant="h6" color="#fff">{user.username}</Typography>
          <Typography variant="body1" color="#54d5d9">{user.userPoints} Points</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;

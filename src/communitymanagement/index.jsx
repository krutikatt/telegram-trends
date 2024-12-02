import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme"; // Import the tokens for theme support
import CommunityManagement from "../components/communitymanagement";


const CommunityManagementPage = ({isCollapsed, isSubscribed, onSubscribe}) => {
  const theme = useTheme(); // Get the current theme (light or dark)
  const colors = tokens(theme.palette.mode); // Get theme-specific colors

  return (
    <Box
      display="flex"
      height="100vh" // Full viewport height for consistent length
      overflow="hidden" // Prevent overflow
      sx={{
        backgroundColor: "transparent",
        
      }}
    >
      
      
        <CommunityManagement colors={colors} />
      
    </Box>
  );
};

export default CommunityManagementPage;

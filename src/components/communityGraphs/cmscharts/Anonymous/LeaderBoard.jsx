import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from '@mui/material';

// Hardcoded data for the leaderboard of top anonymous message senders
const leaderboardData = [
  { senderId: 1, senderName: 'User A', messageCount: 35 },
  { senderId: 2, senderName: 'User B', messageCount: 30 },
  { senderId: 3, senderName: 'User C', messageCount: 28 },
  { senderId: 4, senderName: 'User D', messageCount: 25 },
  { senderId: 5, senderName: 'User E', messageCount: 20 },
  { senderId: 6, senderName: 'User F', messageCount: 18 },
  { senderId: 7, senderName: 'User G', messageCount: 15 },
  { senderId: 8, senderName: 'User H', messageCount: 12 },
  { senderId: 9, senderName: 'User I', messageCount: 10 },
  { senderId: 10, senderName: 'User J', messageCount: 8 },
];

// Styled TableRow for a futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Box shadow on hover
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly change background color on hover
  },
}));

// Badges for top three ranks
const Badge = styled('span')(({ theme }) => ({
  borderRadius: '12px',
  padding: '4px 8px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  marginRight: '8px',
}));

const TopSendersLeaderboard = () => {
  // Ensure data is sorted by message count in descending order
  const topSenders = leaderboardData
    .sort((a, b) => b.messageCount - a.messageCount)
    .slice(0, 5); // Limit to top 5 senders

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: '#76dde1' }; // Gold for 1st
      case 1:
        return { backgroundColor: '#54d5d9' }; // Silver for 2nd
      case 2:
        return { backgroundColor: '#43aaae' }; // Bronze for 3rd
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '100%', // Ensure it does not exceed the parent container
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: 'grey.400', fontWeight: 'bold' }}>
        Top Anonymous Senders
      </Typography>

      {/* Scrollable table container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '8px',
          overflowY: 'auto', // Scrollable when content overflows
          maxHeight: '300px', // Adjust maxHeight to control visible rows
        }}
      >
        <Table stickyHeader> {/* Enable sticky header for the table */}
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Sender</TableCell>
              <TableCell align="right">Messages Sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topSenders.map((sender, index) => (
              <StyledTableRow
                key={sender.senderId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 senders
                }}
              >
                <TableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: '#76dde1' }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: '#54d5d9' }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: '#43aaae' }}>🥉</Badge>}
                </TableCell>
                <TableCell>{sender.senderName}</TableCell>
                <TableCell align="right">{sender.messageCount}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopSendersLeaderboard;

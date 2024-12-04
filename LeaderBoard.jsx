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

// Hardcoded data for the top most active users based on messages sent
const activeUsersData = [
  { userId: 1, userName: 'Alice', messagesSent: 520 },
  { userId: 2, userName: 'Bob', messagesSent: 480 },
  { userId: 3, userName: 'Charlie', messagesSent: 450 },
  { userId: 4, userName: 'David', messagesSent: 430 },
  { userId: 5, userName: 'Eve', messagesSent: 410 },
  { userId: 6, userName: 'Frank', messagesSent: 390 },
  { userId: 7, userName: 'Grace', messagesSent: 370 },
  { userId: 8, userName: 'Heidi', messagesSent: 350 },
  { userId: 9, userName: 'Ivan', messagesSent: 340 },
  { userId: 10, userName: 'Judy', messagesSent: 320 },
];

// Styled TableRow for futuristic effect
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

const ActiveUsers = () => {
  // Sort the data by messages sent in descending order
  const topActiveUsers = activeUsersData
    .sort((a, b) => b.messagesSent - a.messagesSent)
    .slice(0, 5); // Limit to top 5 active users

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
        maxHeight: '50%', // Ensure it does not exceed the parent container
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: 'colors.grey[400]', fontWeight: 'bold' }}>
        Top Active Users (Users vs. Messages Sent)
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
              <TableCell>User</TableCell>
              <TableCell align="right">Messages Sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topActiveUsers.map((user, index) => (
              <StyledTableRow
                key={user.userId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 users
                }}
              >
                <TableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: '#76dde1' }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: '#54d5d9' }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: '#43aaae' }}>🥉</Badge>}
                </TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell align="right">{user.messagesSent}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveUsers;

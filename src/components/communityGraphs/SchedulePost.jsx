import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import { FaRegCalendarAlt, FaListUl, FaArrowLeft } from "react-icons/fa";

const SchedulePost = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    publicationDate: "",
    publicationTime: "",
    groups: [],
    message: "",
    repeatValue: "",
    repeatPeriod: "",
  });

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleAddPost = () => {
    setScheduledPosts((prev) => [...prev, formData]);
    setFormData({
      title: "",
      publicationDate: "",
      publicationTime: "",
      groups: [],
      message: "",
      repeatValue: "",
      repeatPeriod: "",
    });
    handleCloseForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderScheduledPosts = () => {
    return scheduledPosts.length > 0 ? (
      <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Publication Date</TableCell>
              <TableCell>Publication Time</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Repeat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledPosts.map((post, index) => (
              <TableRow key={index}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.publicationDate}</TableCell>
                <TableCell>{post.publicationTime}</TableCell>
                <TableCell>{post.groups.join(", ")}</TableCell>
                <TableCell>{post.message}</TableCell>
                <TableCell>{post.repeatValue} {post.repeatPeriod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography>No scheduled posts.</Typography>
    );
  };

  const groups = ["Group 1", "Group 2", "Group 3"];

  return (
    <Box sx={{ display: "flex", padding: "20px", backgroundColor: "transparent", borderRadius: "8px" }}>
      <Box sx={{ flex: 1, marginRight: "20px" }}>
        <Typography variant="h5" marginBottom="20px">Scheduled Posts</Typography>
        {isFormOpen ? (
          <Box
            component="form"
            sx={{
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'white'),
              padding: "20px",
              borderRadius: "8px",
              maxHeight: "400px",
              overflowY: "auto",
              "::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Publication Date"
                  type="date"
                  name="publicationDate"
                  value={formData.publicationDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Publication Time"
                  type="time"
                  name="publicationTime"
                  value={formData.publicationTime}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Group</InputLabel>
                  <Select
                    label="Group"
                    name="groups"
                    value={formData.groups}
                    onChange={handleInputChange}
                    multiple
                  >
                    {groups.map((group, index) => (
                      <MenuItem key={index} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Repeat Options</Typography>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Repeat Every"
                  name="repeatValue"
                  value={formData.repeatValue}
                  onChange={handleInputChange}
                  type="number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Period</InputLabel>
                  <Select
                    label="Period"
                    name="repeatPeriod"
                    value={formData.repeatPeriod}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="space-between">
                <IconButton onClick={handleCloseForm} sx={{ marginRight: 2 }}>
                  <FaArrowLeft size={24} />
                  <Typography variant="body1">Back</Typography>
                </IconButton>
                <Button variant="contained" color="primary" onClick={handleAddPost}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          renderScheduledPosts()
        )}
      </Box>

      {!isFormOpen && (
        <Box sx={{ width: "300px" }}>
          <Box display="flex" justifyContent="flex-end" marginBottom="20px">
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() => setIsListView(true)}
                sx={{
                  backgroundColor: isListView ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  padding: 0,
                  marginRight: "5px",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaListUl color={isListView ? "#54d5d9" : "#ffffff"} size={24} />
              </IconButton>

              <IconButton
                onClick={() => setIsListView(false)}
                sx={{
                  backgroundColor: !isListView ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  padding: 0,
                  marginRight: "10px",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaRegCalendarAlt color={!isListView ? "#54d5d9" : "#ffffff"} size={24} />
              </IconButton>

              <Button
                variant="contained"
                onClick={handleOpenForm}
                sx={{
                  width: "120px",
                  backgroundColor: "#54d5d9",
                  color: "#ffffff",
                  border: "1px solid #ffffff",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                + Add
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SchedulePost;

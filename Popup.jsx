import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  useTheme,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Popup = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleAddPost,
}) => {
  const theme = useTheme();
  const [isRepeatOptionsOpen, setIsRepeatOptionsOpen] = useState(false); // State to toggle repeat options section

  const daysOfWeek = [
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "T", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "S", value: "Saturday" },
    { label: "S", value: "Sunday" },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: 600,
          width: "90%",
          backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#ffffff",
          padding: "30px 25px",
          borderRadius: "15px",
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)",
          margin: "80px auto",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#333333",
          transition: "all 0.3s ease-in-out",
          maxHeight: "80vh", // Set maximum height
          overflowY: "auto", // Allow scrolling for overflow
        }}
      >
        <Typography
          variant="h5"
          marginBottom="20px"
          color="#54d5d9"
          fontWeight="bold"
          textAlign="center"
        >
          Schedule a Post
        </Typography>

        {/* Form Fields */}
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
          }}
          InputLabelProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
            },
          }}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Publication Date"
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              InputProps={{
                sx: {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              type="time"
              name="publicationTime"
              value={formData.publicationTime}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                sx: {
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
                },
              }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Groups"
          name="groups"
          value={formData.groups.join(", ")}
          onChange={(e) =>
            handleInputChange({
              target: { name: "groups", value: e.target.value.split(",") },
            })
          }
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
          }}
          InputLabelProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
            },
          }}
        />

        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            },
          }}
          InputLabelProps={{
            sx: {
              color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
            },
          }}
        />

        {/* Repeat Options Section */}
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => setIsRepeatOptionsOpen(!isRepeatOptionsOpen)} // Toggle open/close on click
              sx={{
                padding: 0,
                color: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
              }}
            >
              {isRepeatOptionsOpen ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              marginTop="15px"
              color="#54d5d9"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#3db2b3",
                },
              }}
              onClick={() => setIsRepeatOptionsOpen(!isRepeatOptionsOpen)} // Toggle open/close on click
            >
              Repeat Options
            </Typography>
          </Grid>
        </Grid>

        {isRepeatOptionsOpen && (
          <>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography variant="body1">Repeat every</Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Value"
                  name="repeatValue"
                  type="number"
                  value={formData.repeatValue || ""}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Period</InputLabel>
                  <Select
                    name="repeatPeriod"
                    value={formData.repeatPeriod || ""}
                    onChange={handleInputChange}
                    label="Period"
                  >
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Hourly">Hourly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Repeat Days Section */}
            <Typography variant="subtitle1" marginTop="20px" color="#54d5d9">
              Repeat Days
            </Typography>
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              {daysOfWeek.map((day) => (
                <Grid item key={day.value}>
                  <Button
                    variant={formData.repeatDays?.includes(day.value) ? "contained" : "outlined"}
                    onClick={() => {
                      const newDays = formData.repeatDays?.includes(day.value)
                        ? formData.repeatDays.filter((d) => d !== day.value)
                        : [...(formData.repeatDays || []), day.value];
                      handleInputChange({ target: { name: "repeatDays", value: newDays } });
                    }}
                    sx={{
                      minWidth: "35px",
                      padding: "5px",
                      color: formData.repeatDays?.includes(day.value)
                        ? "#ffffff"
                        : theme.palette.mode === "dark"
                        ? "#ffffff"
                        : "#000000",
                      backgroundColor: formData.repeatDays?.includes(day.value) ? "#54d5d9" : "transparent",
                      borderColor: theme.palette.mode === "dark" ? "#54d5d9" : "#000000",
                    }}
                  >
                    {day.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Button
          variant="contained"
          onClick={handleAddPost}
          fullWidth
          sx={{
            marginTop: "20px",
            padding: "12px 0",
            backgroundColor: "#54d5d9",
            "&:hover": {
              backgroundColor: "#3db2b3",
            },
          }}
        >
          Add Post
        </Button>
      </Box>
    </Modal>
  );
};

export default Popup;

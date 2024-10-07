"use client";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";

export default function AddStudentPage() {
  // State variables for form fields
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [parentNum, setParentNum] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [gender, setGender] = useState("");
  const [centerId, setCenterId] = useState("");
  const [centers, setCenters] = useState([]);

  // Fetch centers from the database on page load
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get("/api/centers"); // API endpoint to get centers
        setCenters(response.data);
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };

    fetchCenters();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      phoneNum,
      parentNum,
      studyYear,
      gender,
      centerId,
    };

    try {
      await axios.post("/api/students", studentData); // API endpoint to add a student
      alert("Student added successfully");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Add New Student
      </Typography>

      {/* Form starts here */}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Student Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
          required
        />

        <TextField
          label="Parent's Phone Number"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          value={parentNum}
          onChange={(e) => setParentNum(e.target.value)}
        />

        {/* Study Year Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Study Year</InputLabel>
          <Select
            value={studyYear}
            onChange={(e) => setStudyYear(e.target.value)}
            label="Study Year"
            required
          >
            <MenuItem value="1st secondary">1st Secondary</MenuItem>
            <MenuItem value="2nd secondary">2nd Secondary</MenuItem>
            <MenuItem value="3rd secondary">3rd Secondary</MenuItem>
          </Select>
        </FormControl>

        {/* Gender Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* Center Selection */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Center</InputLabel>
          <Select
            value={centerId}
            onChange={(e) => setCenterId(e.target.value)}
            label="Center"
            required
          >
            {centers.map((center) => (
              <MenuItem key={center.id} value={center.id}>
                {center.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Student
        </Button>
      </form>
    </Box>
  );
}

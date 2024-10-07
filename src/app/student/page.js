import {
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

export default function StudentsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensure it covers full viewport height
        backgroundColor: "#f5f5f5", // Light background color for full page
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="lg" // Constrain content to a max width (responsive)
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8, // Push content down from the top
          padding: 2,
          backgroundColor: "#fff", // Ensure inner content has white background
          borderRadius: 2, // Add some rounding to the box
          boxShadow: 3, // Add shadow for better visual structure
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Students Management
        </Typography>

        {/* Search Field */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <TextField
            id="search-student"
            label="Search for Student"
            variant="outlined"
            sx={{ width: "300px", marginRight: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#64b5f6",
              "&:hover": {
                backgroundColor: "#42a5f5",
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Link href="/students/view" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#90caf9",
                "&:hover": {
                  backgroundColor: "#64b5f6",
                },
                width: "200px",
                textTransform: "uppercase",
              }}
            >
              View All Students
            </Button>
          </Link>

          <Link href="/student/add" passHref>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#90caf9",
                "&:hover": {
                  backgroundColor: "#64b5f6",
                },
                width: "200px",
                textTransform: "uppercase",
              }}
            >
              Add Student
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

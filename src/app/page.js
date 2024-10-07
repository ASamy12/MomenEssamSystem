import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import moemenImage from "../../public/teacher.jpeg"; // Adjust path as necessary

const Home = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Left Column: Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, padding: 2 }}>
            <Image
              src={moemenImage}
              alt="Mo'men Nassar"
              width={500} // Set appropriate width
              height={600} // Set appropriate height
              layout="responsive"
              style={{ borderRadius: "8px" }}
            />
          </Card>
        </Grid>

        {/* Right Column: Quick Access Panel */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Teacher Management System
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {"Welcome to Mo'men Nassar's management system."}
            </Typography>

            <Grid container spacing={2} justifyContent="center" marginTop={4}>
              <Grid item>
                <Link href="/students" passHref>
                  <Button variant="contained" color="primary" size="large">
                    Students
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sessions" passHref>
                  <Button variant="contained" color="secondary" size="large">
                    Sessions
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/tests" passHref>
                  <Button variant="contained" color="success" size="large">
                    Tests
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/homework" passHref>
                  <Button variant="contained" color="error" size="large">
                    Homework
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import StudentIDCard from "./PrintPDF2";

const PrintModal = ({ open, onClose, students }) => {
  const [selectedGender, setSelectedGender] = useState("");
  // const [url, setUrl] = useState({ male: "male", female: "female" });

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          width: "400px",
          margin: "auto",
          marginTop: "20%",
        }}
      >
        <StudentIDCard students={students} onClose={onClose} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Download triggered")}
        >
          Download
        </Button>
      </Box>
    </Modal>
  );
};

export default PrintModal;

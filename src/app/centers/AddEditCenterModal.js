"use client";
import React, { useState, useEffect } from "react";
import { Box, Modal, TextField, Button } from "@mui/material";
import axios from "axios";

export default function AddEditCenterModal({
  open,
  onClose,
  onSuccess,
  center,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (center) {
      setName(center.name);
    } else {
      setName("");
    }
  }, [center]);

  const handleSubmit = async () => {
    try {
      if (center) {
        // Edit mode
        await axios.put(`/api/center`, { id: center.id, name });
      } else {
        // Add mode
        console.log("adding center", name);
        await axios.post("/api/center", { name });
      }
      onSuccess(); // Refresh center list
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating center:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ p: 4, backgroundColor: "white", margin: "auto", maxWidth: 400 }}
      >
        <TextField
          fullWidth
          label="Center Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {center ? "Update Center" : "Add Center"}
        </Button>
      </Box>
    </Modal>
  );
}

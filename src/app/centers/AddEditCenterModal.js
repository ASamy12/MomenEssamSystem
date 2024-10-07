// "use client";
// components/AddEditCenterModal.js
import React, { useState, useEffect } from "react";
import { Box, Modal, TextField, Button } from "@mui/material";

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
    if (center) {
      // Edit mode
      await fetch(`/api/center/${center.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } else {
      // Add mode
      await fetch("/api/center", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    onSuccess(); // Refresh center list
    onClose(); // Close modal
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

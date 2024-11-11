"use client";
import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Container } from "@mui/material";
import axios from "axios";
import AddEditCenterModal from "./AddEditCenterModal";

const CentersPage = () => {
  const [centers, setCenters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);

  const fetchCenters = async () => {
    try {
      const response = await axios.get("/api/center");
      setCenters(response.data);
    } catch (error) {
      console.error("Error fetching centers:", error);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleAddCenter = () => {
    setEditingCenter(null);
    setIsModalOpen(true);
  };

  const handleEditCenter = (center) => {
    setEditingCenter(center); // Pass the center to edit
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteCenter = async (id) => {
    try {
      await axios.delete(`/api/center`, { data: { id } });
      fetchCenters(); // Refresh the center list
    } catch (error) {
      console.error("Error deleting center:", error);
    }
  };

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      {
        header: "Actions",
        Cell: ({ row }) => (
          <>
            <Button onClick={() => handleEditCenter(row.original)}>Edit</Button>
            <Button onClick={() => handleDeleteCenter(row.original.id)}>
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleAddCenter}>
        Add Center
      </Button>

      <MaterialReactTable columns={columns} data={centers} />

      <AddEditCenterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal when done
        onSuccess={fetchCenters} // Refresh center list on success
        center={editingCenter} // Pass the center data to modal
      />
    </Container>
  );
};

export default CentersPage;

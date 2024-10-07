"use client"; // This ensures the component runs as a Client Component

import React, { useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import { Button } from "@mui/material";
import AddEditCenterModal from "./AddEditCenterModal"; // Adjusted the path since it's in the same folder

const CenterPage = () => {
  const [centers, setCenters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);

  const fetchCenters = async () => {
    const response = await fetch("/api/center");
    const data = await response.json();
    setCenters(data);
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleAddCenter = () => {
    setEditingCenter(null); // Clear any editing state
    setIsModalOpen(true); // Open the modal for adding a new center
  };

  const handleEditCenter = (center) => {
    setEditingCenter(center); // Pass the center to edit
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteCenter = async (id) => {
    await fetch(`/api/center/${id}`, { method: "DELETE" });
    fetchCenters(); // Refresh the center list
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddCenter}>
        Add Center
      </Button>

      <MaterialReactTable
        columns={[
          { header: "ID", accessorKey: "id" },
          { header: "Name", accessorKey: "name" },
          {
            header: "Actions",
            Cell: ({ row }) => (
              <>
                <Button onClick={() => handleEditCenter(row.original)}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteCenter(row.original.id)}>
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        data={centers}
      />

      <AddEditCenterModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal when done
        onSuccess={fetchCenters} // Refresh center list on success
        center={editingCenter} // Pass the center data to modal
      />
    </div>
  );
};

export default CenterPage;

"use client";

import React, { useMemo, useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Delete as DeleteIcon } from "@mui/icons-material";
import PrintModal from "./PrintModal";
import AddStudentModal from "./AddStudentModal"; // Import the modal

const filterMethods = [
  { label: "Study Year", value: "studyYear" },
  { label: "Gender", value: "gender" },
  { label: "Center ID", value: "centerId" },
];

const genderEnum = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const studyYearEnum = [
  // { label: "1st Primary", value: "1st primary" },
  // { label: "2nd Primary", value: "2nd primary" },
  // { label: "3rd Primary", value: "3rd primary" },
  { label: "1st Secondary", value: "1st secondary" },
  { label: "2nd Secondary", value: "2nd secondary" },
  { label: "3rd Secondary", value: "3rd secondary" },
];

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([{ method: "", value: "" }]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false); // State to control print modal
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false); // State to control add student modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/students`); // Using axios to fetch students
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const queryParams = filters.reduce((acc, filter) => {
        if (filter.method && filter.value) {
          acc[filter.method] = filter.value;
        }
        return acc;
      }, {});

      const response = await axios.get("/api/students/custom-query", {
        params: queryParams, // Pass query params with axios
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch filtered students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintSelectedStudents = (table) => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    const selected = selectedRows.map((row) => row.original);
    setSelectedStudents(selected);

    // Open the print modal
    if (selected.length > 0) {
      setIsPrintModalOpen(true);
    } else {
      alert("No students selected.");
    }
  };

  const addFilter = () => {
    setFilters([...filters, { method: "", value: "" }]);
  };

  const removeFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phoneNum", header: "Phone Number" },
      { accessorKey: "studyYear", header: "Study Year" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "centerId", header: "Center ID" },
    ],
    []
  );

  const handleStudentAdded = () => {
    // Refresh students after adding a new one
    const fetchStudents = async () => {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    };
    fetchStudents();
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Students List
        </Typography>

        <Box mb={4}>
          {filters.map((filter, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginRight: 10 }}
              >
                <InputLabel id={`filter-method-label-${index}`}>
                  Select Filter Method
                </InputLabel>
                <Select
                  labelId={`filter-method-label-${index}`}
                  value={filter.method}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[index].method = e.target.value;
                    setFilters(newFilters);
                  }}
                  label="Select Filter Method"
                >
                  {filterMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginLeft: 10, marginRight: 10 }}
              >
                <InputLabel id={`filter-value-label-${index}`}>
                  Select Filter Value
                </InputLabel>
                <Select
                  labelId={`filter-value-label-${index}`}
                  value={filter.value}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[index].value = e.target.value;
                    setFilters(newFilters);
                  }}
                  label="Select Filter Value"
                >
                  {filter.method === "studyYear" &&
                    studyYearEnum.map((year) => (
                      <MenuItem key={year.value} value={year.value}>
                        {year.label}
                      </MenuItem>
                    ))}
                  {filter.method === "gender" &&
                    genderEnum.map((gender) => (
                      <MenuItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <IconButton onClick={() => removeFilter(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={addFilter}
            style={{ marginBottom: 20 }}
          >
            Add Filter
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFilter}
          >
            Filter
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={students}
            enableRowSelection
            renderTopToolbarCustomActions={({ table }) => (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {/* Button to open Add Student Modal */}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsAddStudentModalOpen(true)}
                  // style={{ marginBottom: 20 }}
                >
                  Add New Student
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handlePrintSelectedStudents(table)}
                >
                  Print Selected Students
                </Button>
              </div>
            )}
          />
        )}

        {/* Print Modal */}
        <PrintModal
          students={selectedStudents}
          open={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
        />

        {/* Add Student Modal */}
        <AddStudentModal
          open={isAddStudentModalOpen}
          onClose={() => setIsAddStudentModalOpen(false)}
          onStudentAdded={handleStudentAdded}
        />
      </Box>
    </Container>
  );
};

export default StudentsPage;

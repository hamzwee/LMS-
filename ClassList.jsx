import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Box, Button, Typography } from '@mui/material';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'fatherName', headerName: 'Father Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'className', headerName: 'Class', width: 130 },
  { field: 'group', headerName: 'Group', width: 130 },
];

export default function ClassList() {
  const [rows, setRows] = useState([]);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const navigate = useNavigate();

  // Fetch student details from Firebase Firestore
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const querySnapshot = await getDocs(collection(db, 'studentDetails'));
      const studentDetails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(studentDetails);
    };

    fetchStudentDetails();
  }, []);

  // Handle screen resizing for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarClosed(true);
      } else {
        setIsSidebarClosed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: 4,
          width: isSidebarClosed ? '100%' : 'calc(100% - 250px)', 
          marginLeft: isSidebarClosed ? 0 : '250px', 
          transition: 'width 0.3s, margin-left 0.3s', 
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            Class List
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#388e3c' } }}
              onClick={() => navigate('/ClassForm')}
            >
              Add Student
            </Button>
          </Box>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                '& .MuiDataGrid-root': {
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px',
                },
                '& .MuiDataGrid-cell': {
                  textOverflow: 'ellipsis',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

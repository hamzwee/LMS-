import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'subjectName', headerName: 'Subject Name', width: 150 },
  { field: 'classNumber', headerName: 'Class', width: 100 },
  { field: 'group', headerName: 'Group', width: 150 },
];

export default function SubjectList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarClosed(true);
      } else {
        setIsSidebarClosed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'subjects'));
        const subjectData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(subjectData);
      } catch (error) {
        setError('Failed to fetch subjects. Please try again.');
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          width: isSidebarClosed ? 'calc(100% - 60px)' : 'calc(100% - 250px)', 
          marginLeft: isSidebarClosed ? 0 : '250px', 
          transition: 'width 0.3s, margin-left 0.3s',
          marginTop: 4,
          padding: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Subjects List
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green' }}
            onClick={() => navigate('/SubjectsAdd')}
          >
            Add
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
            sx={{ overflow: 'clip' }}
          />
        </Box>
      </Box>
    </div>
  );
}

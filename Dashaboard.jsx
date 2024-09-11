import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Navbar from './Navbar';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <Box
        sx={{
          width: isSmallScreen ? '100%' : `calc(100% - 240px)`,
          margin: '20px auto',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          marginLeft: isSmallScreen ? '0' : '240px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
              onClick={() => navigate('/StudentList')}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Students
              </Typography>
              <Typography variant="body2">
                View and manage student information
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
              onClick={() => navigate('/TeacherList')}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Teachers
              </Typography>
              <Typography variant="body2">
                View and manage teacher information
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
              onClick={() => navigate('/SubjectList')}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Subjects
              </Typography>
              <Typography variant="body2">
                View and manage subject information
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
              onClick={() => navigate('/ClassList')}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Classes
              </Typography>
              <Typography variant="body2">
                View and manage class information
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
              onClick={() => navigate('/ExamSchedule')}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Exams
              </Typography>
              <Typography variant="body2">
                View and manage exam schedules
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

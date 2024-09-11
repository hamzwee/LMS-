import React, { useState } from 'react';
import Navbar from './Navbar';
import { Box, Button, Radio, RadioGroup, Typography, TextField, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 

const TeacherRegistration = () => {
  const [classNumber, setClassNumber] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('female'); // Default selected gender
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClassChange = (event) => {
    const value = event.target.value;

    if (!isNaN(value) && value !== '') {
      setClassNumber(parseInt(value, 10));
    } else {
      setClassNumber('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'Teachers'), {
        firstName,
        lastName,
        email,
        classNumber: classNumber.toString(),
        gender,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setClassNumber(1);
      setGender('female');

      alert('Teacher registered successfully!');
      navigate('/TeacherList');
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textDecoration: 'underline',
            marginBottom: 4,
          }}
        >
          Teacher Registration Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>First Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Last Name:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Email:</FormLabel>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ paddingBottom: 2 }}>
            <FormLabel>Class:</FormLabel>
            <TextField
              variant="outlined"
              type="number"
              value={classNumber}
              onChange={handleClassChange}
              InputProps={{
                inputProps: { min: 0, max: 20 },
              }}
              required
            />
          </FormControl>

          <FormControl component="fieldset" fullWidth sx={{ marginBottom: 2 }}>
            <FormLabel component="legend" sx={{ color: 'green', marginBottom: 1 }}>Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio required />}
                label={
                  <Typography variant="h6">Female</Typography>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio required />}
                label={
                  <Typography variant="h6">Male</Typography>
                }
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: 'green',
              marginTop: 2,
              width: '100%',
              padding: '10px 0',
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default TeacherRegistration;

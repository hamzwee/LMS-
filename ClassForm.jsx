import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClassForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesData);
    };
    fetchClasses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'studentDetails'), {
        firstName,
        lastName,
        fatherName,
        email,
        phoneNumber,
        dob,
        qualification,
        className: selectedClass,
        group,
        gender,
      });

      // Reset form fields
      setFirstName('');
      setLastName('');
      setFatherName('');
      setEmail('');
      setPhoneNumber('');
      setDob('');
      setQualification('');
      setSelectedClass('');
      setGroup('');
      setGender('');

      navigate('/ClassList');
    } catch (error) {
      console.error('Error adding document: ', error);
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
          mt: 4,
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textDecoration: 'underline',
            mb: 4,
            color: '#00695f',
            fontWeight: 600,
          }}
        >
          Admission Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: 500,
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          {/* First Name */}
          <FormControl fullWidth>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="off"
            />
          </FormControl>

          {/* Last Name */}
          <FormControl fullWidth>
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="off"
            />
          </FormControl>

          {/* Father's Name */}
          <FormControl fullWidth>
            <TextField
              label="Father's Name"
              variant="outlined"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required
              autoComplete="off"
            />
          </FormControl>

          {/* Email */}
          <FormControl fullWidth>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </FormControl>

          {/* Phone Number */}
          <FormControl fullWidth>
            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              autoComplete="off"
            />
          </FormControl>

          {/* Date of Birth */}
          <FormControl fullWidth>
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </FormControl>

          {/* Qualification */}
          <FormControl fullWidth>
            <TextField
              label="Qualification"
              variant="outlined"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </FormControl>

          {/* Class Selection */}
          <FormControl fullWidth>
            <FormLabel>Select Class</FormLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Class
              </MenuItem>
              {classes.map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.name}>
                  {classItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Gender */}
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio required />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio required />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#00695f',
              color: 'white',
              padding: 1.5,
              '&:hover': {
                backgroundColor: '#004d40',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ClassForm;

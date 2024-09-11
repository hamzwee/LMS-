import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import Navbar from './Navbar';
import ClassForm from './ClassForm';
import ClassList from './ClassList';
import ExamResult from './ExamResult';
import ExamSchedule from './ExamSchedule';
import FeeStructure from './FeeStructure';
import FeeVoucher from './FeeVoucher';
import StudentList from './StudentList';
import StudentRegistration from './StudentRegistration';
import SubjectList from './SubjectList';
import SubjectsAdd from './SubjectsAdd';
import SyllabusForm from './SyllabusForm';
import SyllabusList from './SyllabusList';
import TeacherList from './TeacherList';
import TeacherRegistration from './TeacherRegistration';
import FeeSubmission from './FeeSubmission';
import Signup from './Signup';
import Login from './Login';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <>
  
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Routes>
              <Route element={<AuthRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/studentlist" element={<StudentList />} />
                <Route path="/AdmissionForm" element={<ClassForm />} />
                <Route path="/ClassForm" element={<ClassForm />} />
                <Route path="/ClassList" element={<ClassList />} />
                <Route path="/ExamResult" element={<ExamResult />} />
                <Route path="/ExamSchedule" element={<ExamSchedule />} />
                <Route path="/FeeStructure" element={<FeeStructure />} />
                <Route path="/FeeVoucher" element={<FeeVoucher />} />
                <Route path="/StudentRegistration" element={<StudentRegistration />} />
                <Route path="/SubjectList" element={<SubjectList />} />
                <Route path="/SubjectsAdd" element={<SubjectsAdd />} />
                <Route path="/SyllabusForm" element={<SyllabusForm />} />
                <Route path="/SyllabusList" element={<SyllabusList />} />
                <Route path="/TeacherList" element={<TeacherList />} />
                <Route path="/TeacherRegistration" element={<TeacherRegistration />} />
                <Route path="/FeeSubmission" element={<FeeSubmission />} />
              </Route>
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;

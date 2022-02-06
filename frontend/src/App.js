import React from 'react';
// import './App.css';Switch
import {Routes,Route,BrowserRouter as Router} from "react-router-dom";
// import {Routes,Route, BrowserRouter as Router,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import DoctorList from './components/doctor-list';
import DoctorDetails from './components/doctor-details';
import Test from './components/test';
import DoctorRegistration from './components/doctor-registration';
import DoctorSlots from './components/doctor-slots';
import UpdateDoctor from './components/update-doctor';
import BookAppointment from './components/book-appointment';
import DoctorHome from './components/doctor-home';
import PatientInfo from './components/patient-info';
import Login from './components/login';
import PatientRegistration from './components/patient-registration';
const App = () =>  {
  return (
    <Router>
    <div className="app">
      <Routes>
      <Route path={'/'} element={<Login/>}>
        </Route>
        <Route path={'/doctor/'} element={<DoctorList/>}>
        </Route>
        <Route 
        path="/doctor/doctordetails/:id"
        element={<DoctorDetails/>}
        />
        <Route 
        path="/insurance/somedata/"
        element={<Test/>}
        />
         <Route 
        path="/doctor/registration/"
        element={<DoctorRegistration/>}
        />
         <Route 
        path="/doctor/slots/"
        element={<DoctorSlots/>}
        />
        <Route 
        path="/doctor/update/:id"
        element={<UpdateDoctor/>}
        />
        <Route 
        path="/doctor/bookappointment/"
        element={<BookAppointment/>}
        />
        <Route 
        path="/doctor/home/"
        element={<DoctorHome/>}
        />
        <Route
        path="/doctor/viewappointments"
        element={<PatientInfo/>}
        />
        <Route
        path="/patient/registration"
        element={<PatientRegistration/>}
        />
        </Routes>
       </div>
       </Router>
  );
}

export default App;

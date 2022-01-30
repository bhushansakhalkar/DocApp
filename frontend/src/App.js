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
const App = () =>  {
  return (
    <Router>
    <div className="app">
      <Routes>
        <Route path={'/'} element={<DoctorList/>}>
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
        </Routes>
       </div>
       </Router>
  );
}

export default App;

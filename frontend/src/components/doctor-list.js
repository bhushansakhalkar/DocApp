import Card from 'react-bootstrap/Card'
import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorDataService from "../services/doctors";
import {Link, Routes,Route,BrowserRouter as Router} from "react-router-dom";
import axios from 'axios';
import DoctorDetails from './doctor-details';


const DoctorList = () => {
    const [doctors,setDoctors] = useState([]);

    useEffect(()=>{
        console.log('hello')
        getDoc();
    },[]);

    const getDoc = () =>{
        DoctorDataService.getAll()
        .then((response)=>{
            console.log(response.data);
            console.log('Hello')
            setDoctors(response.data);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    return (
    <div className="App">
        <h1>Doctor List</h1>
        <div>
        {doctors.map((doctor)=>{
            console.log(doctor)
            return(
                <div>
                <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{doctor.Fname +"  "+ doctor.Lname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{doctor.Address}</Card.Subtitle>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Link><Link to={"doctor/doctordetails/"+doctor._id}> More Info</Link></Card.Link>
        </Card.Body>
        </Card>
        
        </div>
        
            )
        })}
        </div>
       
    </div>
  );
}

export default DoctorList;

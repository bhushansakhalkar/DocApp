import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Create from './Create';
import MyNavbar from './navbar';
import { useLocation } from 'react-router-dom';
const PatientInfo = () => {
    
    const [patient,setPatient] = useState({})
    let p ={}
    const location = useLocation();
    p = location.state
    console.log(p)
    
    useEffect(()=>{
           
    })

    

    return (

        <>
            <div className="container-fluid mx-2 " >

                <div className="row mt-5 mx-2">

                    <div className="col-md-3"></div>
                    <h1 style={{textAlign:'center'}}>Patient Information</h1><br></br>
                </div>
                <MyNavbar title='DocApp'  second='View Appointment' third='Update Profile' fourth='Logout' fifth='Delete Profile'  /><br/><br/>
                <div className="col-md-9">

                    <div className="row"> 

                        <div className="col-md-9">
                            
                            <Card >

                                <Card.Img variant="top" />

                                <Card.Body>

                                    <Card.Title></Card.Title>

                                    <Card.Text>
                                    <h5> Appointment Details </h5> 

                                        Appointment Slot: {p.time}<br />  

                                        Appointment Status: <br /><br /> 

                                        <h5> Patient Details </h5> 

                                        {p.details.Fname +" "+p.details.Fname} <br /> 

                                        {p.details.Address} <br /> 

 

                                        {p.details.city} <br /> 

 

                                        {p.details.Phone}<br /> 

                                        <h5> Insurance Details </h5><br/>
                                        {p.details.Insurance.cardNumber}<br></br>
                                        {p.details.Insurance.insuranceNumber}<br></br>
                                        {p.details.Insurance.insuranceProvider} <br></br>

                                        
                                       
                                       
                                       
                                    </Card.Text>

                                    {/* <Button variant="primary">Click here for Prescription</Button> */}

                                </Card.Body>

                            </Card>
                          <Create/>

                        </div>
                    </div>



                </div>

            </div>

        

        </>

    )

}



export default PatientInfo;
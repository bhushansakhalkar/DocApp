import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Create from './Create';
import MyNavbar from './navbar';
import Modal from 'react-bootstrap/Modal'
import { useLocation, useNavigate } from 'react-router-dom';
import DoctorDataService from '../services/doctors'
const PatientInfo = () => {
    const navigate = useNavigate()
    const [patient,setPatient] = useState({})
    const [prescription,setPrescription] = useState('')
    const [iid ,setIid] = useState('')
    const hide = ()=>{
        setShow(false)
    }
    const [show,setShow] = useState(false)
    let p ={}
    const location = useLocation();
    p = location.state
    console.log(p)
    let ps = ''
    const sendPrescription = ()=>{
        console.log(prescription)
        ps = prescription
        let data={
            prescription:ps
        }
        DoctorDataService.addPrescription(p._id,data)
        .then((res)=>{
            console.log(res)
            alert("Prescription Sent")

        })
        .catch(e=>console.log(e))
    }
    useEffect(()=>{
        setIid(localStorage.getItem('iid'))
    },[])
    
    
    const deleteProfile = ()=>{
        DoctorDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
    return (

        <>
            <div className="container-fluid mx-2 " >
            <Modal backdrop={true} show={show} onHide={hide}>
    <Modal.Header closeButton>
    <Modal.Title>Delete Account</Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <p> Are your sure you want to delete your profile?</p>
  </Modal.Body>

  <Modal.Footer>
    <button className="primary" onClick={hide} >Close</button>
    <button className="danger" onClick={deleteProfile}>Delete</button>
  </Modal.Footer>
  </Modal>
                <div className="row mt-5 mx-2">
 
                    <div className="col-md-3"></div>
                    <h1 style={{textAlign:'center'}}>Patient Information</h1><br></br>
                </div>
                <MyNavbar title='DocApp' pathSecond="/doctor/home"  pathThird={'update/'+iid} pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} pathFifth={()=>{
                setShow(true)
            }} second='My Appointments' third='Update Profile' fourth='Logout' fifth='Delete Profile'  /><br/><br/>
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
                                        Appointment Date : {p.date}<br></br>
                                        Appointment Status:{p.Status} <br />
                                        Appointment Information:{p.AppointmentInfo}
                                        <h5> Patient Details </h5> 
                                        Name      : {p.details.Fname +" "+p.details.Lname} <br /> 
                                        Address   :{p.details.Insurance.address} <br /> 
                                        BirthDate : {p.details.Insurance.birthDate}
                                        City      :{p.details.City} <br /> 
                                        Phone     :{p.details.Phone}<br /> 

                                        <h5> Insurance Details </h5>
                                        Insurance Card Number : {p.details.Insurance.cardNumber}<br></br>
                                        Insurance Number      : {p.details.Insurance.insuranceNumber}<br></br>
                                        Insurance Provider    : {p.details.Insurance.insuranceProvider} <br></br>
                                        Insurance Card Expiry : {p.details.Insurance.expiryDate}
                                                Date
                                        
                                       
                                       
                                       
                                    </Card.Text>

                                    {/* <Button variant="primary">Click here for Prescription</Button> */}

                                </Card.Body>

                            </Card>
                            <label><h5>Prescription :</h5></label>
                          <textarea cols={120} rows={4}  onChange={(e)=>{
                              setPrescription(e.target.value)
                          }}/>
                          <button className='primary' onClick={
                              sendPrescription}>Send Prescription</button><br></br>

                        </div>
                    </div>



                </div>

            </div><br></br>

        

        </>

    )

}



export default PatientInfo;
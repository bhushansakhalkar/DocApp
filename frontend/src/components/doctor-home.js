import React, { useEffect,useState } from 'react'
import Card from "react-bootstrap/Card";
import DoctorDataService from "../services/doctors"
import { Button } from "react-bootstrap";
import Calendar from 'react-calendar';
import Modal from 'react-bootstrap/Modal'
import { useNavigate,Link } from 'react-router-dom';
import Cal from './Cal';
import MyNavbar from './navbar';
import DeleteDoctor from './doctor-delete';
import { Col, Row } from "react-bootstrap";



const DoctorHome = () => {
    let app = []
    const navigate = useNavigate()
    const [date,setDate] = useState()
    const [appointments,setAppointments] = useState([])
    const [show,setShow] = useState(false)
    const [token,setToken]=  useState('')
    const hide = ()=>{
        setShow(false)
    }
    const [iid ,setIid] = useState('')
    useEffect(()=>{
        console.log('hello')
            let t = localStorage.getItem('token')
            setToken(localStorage.getItem('token'))
            let idd = localStorage.getItem('iid')   
            setIid(localStorage.getItem('iid'))
            console.log(iid)
        getApps('09-02-2022',idd,token)
    },[]);
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return String([day, month, year].join('-'));
    }
    const onChange = () => {
        let d = formatDate(date)
        console.log(formatDate(date))
        console.log(date)
        console.log(iid)
        getApps(d,iid)
    };

    const getApps = (date,id)=>{
        DoctorDataService.getAppointmentsByDate(date,id,localStorage.getItem('token'))
        .then((response)=>{
            
            if(response.data.status == 'error'){
                alert("Access Forbidden")
                navigate('/')
            }
            console.log(response.data)
            app = response.data
            setAppointments(app)
        })
        .catch(e=>alert("Nothing found"))
    }
    const deleteProfile = ()=>{
        DoctorDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
    return (
        <>
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
            <h1 className="text-center"> Appointments</h1>
            <MyNavbar title='DocApp' pathThird={'update/'+iid} pathFourth={()=>{
            localStorage.removeItem("iid")
            localStorage.removeItem("token")
            navigate("/")
        }} pathFifth={()=>{
                setShow(true)
            }} third='Update Profile' fourth='Logout' fifth='Delete Profile'  />
            <div className="container-fluid mx-2 " >
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                    <Calendar
        calendarType="ISO 8601"
        defaultView="month"
        showNavigation={true}
        showFixedNumberOfWeeks={true}
        onChange={setDate}
        value={date}
        
      />
      <button onClick={onChange}>Confirm</button>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                            <Row  xs={1} md={2} lg={2} className="g-10">  
                                {appointments.map((appointment)=>{
                                    // if(appointments.length == 0 || []){
                                        
                                    //     return(
                                    //         <h2>You have no Appointments today!</h2>
                                    //     )
                                    // }
                                    return(
                                    <Col>
                                   <Card style={{ width: '20rem' }}>
                                  
                                    <Card.Body>
                                        <Card.Title>Name : {appointment.details.Fname +" "+ appointment.details.Lname}</Card.Title>
                                        <Card.Text>
                                            Appointment Time : {appointment.time} <br />
                                            Appointment Info : {appointment.AppointmentInfo} <br />
                                            Appointment Status: {appointment.Status} <br />
                                            Patient's number  : {appointment.details.Phone}<br />
                                            Appointment date  : {appointment.date}<br />
                                            </Card.Text>
                                        <Button variant="primary" onClick={()=>{
                                            navigate('/doctor/viewappointments',{state:appointment});
                                        }}>Click here for more info</Button>
                                    </Card.Body>
                                </Card>
                                </Col>
                                
                                    )
                                        
                                })}
                                </Row>
                            </div>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorHome;
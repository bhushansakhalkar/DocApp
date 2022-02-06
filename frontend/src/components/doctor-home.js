import React, { useEffect,useState } from 'react'
import Card from "react-bootstrap/Card";
import DoctorDataService from "../services/doctors"
import { Button } from "react-bootstrap";
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import Cal from './Cal';

const DoctorHome = () => {
    let app = []
    const navigate = useNavigate()
    const [date,setDate] = useState(new Date())
    const [appointments,setAppointments] = useState([])
    useEffect(()=>{
        console.log('hello')
       
            console.log(appointments)
        getApps("08-02-2022","61f89a6e34322cd54f747b86")
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
    
        return [day, month, year].join('-');
    }

    const onChange = date => {
        let d = formatDate(date)
        console.log(formatDate(date))
        setDate(d)
    };

    const getApps = (date,id)=>{
        DoctorDataService.getAppointmentsByDate(date,id)
        .then((response)=>{
            console.log(response.data)
            app = response.data
            setAppointments(app)
        })
    }
    return (
        <>
            <h1 className="text-center text-info"> Appointments</h1>

            <div className="container-fluid mx-2 " >
                <div className="row mt-5 mx-2">
                    <div className="col-md-3">
                    <Cal onChange={onChange} value={date} />
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                {appointments.map((appointment)=>{
                                    console.log(appointment)
                                    return(
                                    <Card style={{ width: '18rem' }}>
                                  
                                    <Card.Body>
                                        <Card.Title>{appointment.details.Fname +" "+ appointment.details.Lname}</Card.Title>
                                        <Card.Text>
                                            {appointment.time} <br />
                                            {appointment.AppointmentInfo} <br />
                                            {appointment.status} <br />
                                            {appointment.details.Phone}<br />
                                            </Card.Text>
                                        <Button variant="primary" onClick={()=>{
                                            navigate('/doctor/viewappointments',{state:appointment});
                                        }}>Click here for more info</Button>
                                    </Card.Body>
                                </Card>
                                    )
                                        
                                })}
                                
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorHome;
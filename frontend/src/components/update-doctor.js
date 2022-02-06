import React,{useState,useEffect} from "react";
import {Switch,Route,Link} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import MyNavbar from "./navbar";


const UpdateDoctor=(props)=> {

 
    const { id } = useParams()
    // const checked = ()=>{
    //     setDisabled(0.7)
    //     alert("Booked")
    //     //add a page for some comments and then call appointment api
    // }
   const doc = {
       
    }
    const [date, setDate] = useState(new Date());
    const [doctor,setDoctor] = useState(doc)
    const [slots,setSlots] = useState([])
    const [disable,setDisabled] = useState(1)
    const [token,setToken] = useState('')

    
    const getDoctorDetails = id =>{
        console.log(id)
        let t= localStorage.getItem('token')
        setToken(t)
        DoctorDataService.getDetails(id,t)
        .then(response=>{
            console.log(response.data);
            console.log(response.data);

            setDoctor(response.data)

        })
        .catch(e=>{
            console.log(e);
        })
    }
    
    useEffect(()=>{
        getDoctorDetails(id )

    },[id])

    function getWeekOfMonth(date) {
        let adjustedDate = date.getDate()+ date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        return (parseInt(prefixes[0 | adjustedDate / 7])+1);
    }
    const confirm=()=>{
       let cd = new Date()
        console.log(cd.getMonth())
        console.log(date.getMonth())
        console.log(id)
        console.log(getWeekOfMonth(date))
        console.log(date.getDay())
        if(cd.getMonth()!= date.getMonth()){
            alert("Please select an appointment from this month, the appointment from next month will be unlocked in that month")
        }
       let data={
            "day":date.getDay(),
            "week":getWeekOfMonth(date),
            "id":id

        }
       
        DoctorDataService.getAppointments(data)
        .then((response)=>{
            console.log(response)
            setSlots(response.data)
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
  return (
    <div className="App">
    <h1 style={{textAlign:'center'}}> Doctor detail Page</h1>
    <br/>
    <MyNavbar title='DocApp'  second='View Appointment' third='Update Profile' fourth='Logout' fifth='Delete Profile'  /><br></br>
    <div  className="col-md-9" style={{width: '15rem', height: '20rem'}} >
            <h4>Update Slots</h4>
            <Calendar
        calendarType="ISO 8601"
        defaultView="month"
        showNavigation={true}
        showFixedNumberOfWeeks={true}
        onChange={setDate}
        value={date}
      />
      <button onClick={confirm}>Confirm</button>
            </div>
            <div>
               
                { slots.map(slot => {
                     <h1>Slots</h1>
                    console.log(slot)
                    return (
                        <div key={slot._id}>
                        <input name="slot" value={slot.timeslot} onChange={(e)=>{
                            
                        }}   /> <input name="available" value={slot.available} />  <button onClick={()=>{
                            console.log(slot.timeslot)
                        }}>Update</button>
                        </div>
                                            )
                })}
                <br></br>
            </div>
    <div className="col-md-9" style={{position:'absolute',left:'35rem',top:150}} >
    <h4>First Name: <input name="Fname" value={doctor.Fname} onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }} /></h4>
    <h4>Last Name: <input name="Lname" value={doctor.Lname} onChange={(e)=>{
        setDoctor({...doctor,"Lname":e.target.value})
    }}/></h4>
    <h4>Address: <input name="Address" value={doctor.Address}onChange={(e)=>{
        setDoctor({...doctor,"Address":e.target.value})
    }} /></h4>
    <h4>Qualification: <input name="Qualification" value={doctor.Qualification}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>License: <input name="License" value={doctor.License}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Specialization:<input name="Specialization" value={doctor.Specialization}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Phone: <input name="Phone" value={doctor.Phone}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>City: <input name="City" value={doctor.City}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
    <h4>Postcode: <input name="Postcode" value={doctor.Postcode}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h4>
     <button onClick={()=>{
        console.log(doctor)
        
    }}>Update</button> 
    </div>
   
    </div>
  );
}

export default UpdateDoctor;

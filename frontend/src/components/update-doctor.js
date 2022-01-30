import React,{useState,useEffect} from "react";
import {Switch,Route,Link} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'


const UpdateDoctor=(props)=> {

 
    const { id } = useParams()
    const checked = ()=>{
        setDisabled(0.7)
        alert("Booked")
        //add a page for some comments and then call appointment api
    }
   const doc = {
       
    }
    const [date, setDate] = useState(new Date());
    const [doctor,setDoctor] = useState(doc)
    const [slots,setSlots] = useState([])
    const [disable,setDisabled] = useState(1)

    
    const getDoctorDetails = id =>{
        console.log(id)
        DoctorDataService.getDetails(id)
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
        getDoctorDetails(id)

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
            console.log(slots)
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2>First Name:<input name="Fname" value={doctor.Fname} onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }} /></h2>
    <h2>Last Name:<input name="Lname" value={doctor.Lname} onChange={(e)=>{
        setDoctor({...doctor,"Lname":e.target.value})
    }}/></h2>
    <h2>Address:<input name="Address" value={doctor.Address}onChange={(e)=>{
        setDoctor({...doctor,"Address":e.target.value})
    }} /></h2>
    <h2>Qualification:<input name="Qualification" value={doctor.Qualification}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>
    <h2>License:<input name="License" value={doctor.License}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>
    <h2>Specialization:<input name="Specialization" value={doctor.Specialization}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>
    <h2>Phone:<input name="Phone" value={doctor.Phone}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>
    <h2>City:<input name="City" value={doctor.City}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>
    <h2>Postcode:<input name="Postcode" value={doctor.Postcode}  onChange={(e)=>{
        setDoctor({...doctor,[e.target.name]:e.target.value})
    }}/></h2>

    <button onClick={()=>{
        console.log(doctor)
        
    }}>Update</button> <button>Change Slots</button>
    <div>
            <h2>Appointment</h2>
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
                <h1>Slots</h1>
                { slots.map(slot => {
                    console.log(slot)
                    return (
                        <div key={slot._id}>
                        <p onClick={checked}>{slot.timeslot}    {slot.available}</p>
                        </div>
                    )
                })}
            </div>
    </div>
  );
}

export default UpdateDoctor;

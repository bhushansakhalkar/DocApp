import React,{useState,useEffect} from "react";
import {Switch,Route,Link, useNavigate} from "react-router-dom";
import DoctorDataService from "../services/doctors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';


const DoctorRegistration=(props)=> {

    const { id } = useParams()
    const navigate = useNavigate();
   let user = {
       
   }
    const doc = {
     Fname:"",
     Lname:"",
     Address:"",
     License:"",
     Specialization:"",
     Phone:"",
     Postcode:"",
     City:"",
     Qualification:"",
    }
    const [fname,setfName] = useState("")
    const [lname,setlName] = useState("")
    const [address,setaddress] = useState("")
    const [license,setlicense] = useState("")
    const [specialization,setspecialization] = useState("")
    const [phone,setphone] = useState("")
    const [postcode,setpostcode] = useState("")
    const [city,setcity] = useState("")
    const [qualification,setqualification] = useState("")
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    
        
    // const getDoctorDetails = id =>{
    //     console.log(id)
    //     DoctorDataService.getDetails(id)
    //     .then(response=>{
    //         console.log(response.data.weeks.week1[0].available);
    //         console.log(response.data.weeks.week1[0].timeslots[0].timeslot1);

    //         setDoctor(response.data)

    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     })
    // }
    
    // useEffect(()=>{
    //     getDoctorDetails(id)

    // },[id])

   const call = ()=>{
        doc.Fname = fname;
        doc.Lname = lname;
        doc.Address = address;
        doc.License = license;
        doc.Phone = phone;
        doc.Qualification = qualification;
        doc.Specialization = specialization;
        doc.Postcode = postcode;
        doc.City = city;
        user.username = username;
        user.password = password;
        user.email = email;
        user.account_type = 'Doctor'
        console.log(doc)
        navigate('/doctor/slots',{state:{doc:doc,user:user}});
   }
  return (
    <div className="App">
    <h1> Registration Page</h1>
    <br/><br/><br/><br/>
    <label>Username: </label><input name="username"  onChange={(e)=>{
        setUsername(e.target.value)
    }} /><br/>
    <label>Password: </label><input name="password"  onChange={(e)=>{
        setPassword(e.target.value)
    }} /><br/>
     <label>Email: </label><input name="email"  onChange={(e)=>{
        setEmail(e.target.value)
    }} /><br/>
    <label>FirstName: </label><input name="fname"  onChange={(e)=>{
        setfName(e.target.value)
    }} /><br/>
    <label>LastName: </label><input name="lname"  onChange={(e)=>{
        setlName(e.target.value)
    }} /><br/>
    <label>Address: </label><input name="address"  onChange={(e)=>{
        setaddress(e.target.value)
    }} /><br/>
    <label>License: </label><input name="license"  onChange={(e)=>{
        setlicense(e.target.value)
    }} /><br/>
    <label>Specialization: </label><input name="specialization"  onChange={(e)=>{
        setspecialization(e.target.value)
    }} /><br/>
    <label>Phone: </label><input name="phone"  onChange={(e)=>{
        setphone(e.target.value)
    }} /><br/>
    <label>Postcode: </label><input name="postcode"  onChange={(e)=>{
        setpostcode(e.target.value)
    }} /><br/>
    <label>City: </label><input name="city"  onChange={(e)=>{
        setcity(e.target.value)
    }} /><br/>
    <label>Qualification: </label><input name="phone"  onChange={(e)=>{
        setqualification(e.target.value)
    }} /><br/>

    <button onClick={call}>Click</button>
    </div>
  );
}

export default DoctorRegistration;

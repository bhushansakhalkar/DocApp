import Card from 'react-bootstrap/Card'
import React,{useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorDataService from "../services/doctors";
import {Link, Routes,Route,useNavigate,BrowserRouter as Router} from "react-router-dom";
import PatientDataService from "../services/patients";
import axios from 'axios';
import DoctorDetails from './doctor-details';
import Pagination from 'react-bootstrap/Pagination'
import MyNavbar from './navbar';

import Modal from 'react-bootstrap/Modal'
const DoctorList = () => {
   
    const navigate = useNavigate()
    const [doctors,setDoctors] = useState([]);
    const [nextpage,setNext] = useState({})
    const [prevpage,setPrev] = useState({})
    const [currentpage,setCurrent] = useState(1)
    const [token,setToken] = useState('')
    const [iid ,setIid] = useState('')
    const [query,setQuery] = useState('')
    const [show,setShow] = useState(false)
    const hide = ()=>{
        setShow(false)
    }
    const handlePageClick = () => {
        alert("hello")
       
      }

    useEffect(()=>{
        console.log('hello')
        console.log(localStorage.getItem("token"))
        setIid(localStorage.getItem('iid'))
       
        getDoc(query);
        
        
    },[]);

    const getDoc = (q) =>{
        // let query={
        //     "page":1,
        //     "limit":2,
        // }
       let t = localStorage.getItem('token')
        setToken(localStorage.getItem('token'))
        let page = 1
        let limit = 2
        console.log(q)
        
        DoctorDataService.getAll(page,limit,q,t)
        .then((response)=>{
            console.log(response.data);
            setDoctors(response.data.result);
            setNext(response.data.next)
            setPrev(response.data.prev)
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    let path2 = "/patient/myappointments/"+iid

    const sendQuery=(e)=>{
        let q = e.target.innerHTML
        setQuery(e.target.innerHTML)
        getDoc(q)
    }

    const deleteProfile = ()=>{
        PatientDataService.deleteProfile(iid)
        .then(()=>{
            navigate("/")
        })
        .catch(e=>console.log(e))
    }
    return (
    <div className="App">
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
        <h1 style={{textAlign:'center'}}>Doctor List</h1><br/>
        <MyNavbar title='DocApp'  pathSecond ={path2} pathThird={"/patient/updatePatient/"+iid}  second='View Appointment' third='Update Profile' fourth='Logout' fifth='Delete Profile'  />
        <div className="container-fluid mx-2 " >
                <div className="row mt-5 mx-2">
        <div className="col-md-3">
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">All</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">General Physician</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Cardiologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Dermatologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Endocrinologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Gastroenterologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Dentist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Nephrologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Neurologist</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Orthopedic</button>
                        <button onClick={(e)=>{sendQuery(e)}} className="btn btn-warning w-100 mb-4">Gynacologist</button>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4">
        <div style={{display:'flex',flexDirection:'row' }}>
        {doctors.map((doctor)=>{
            console.log(doctor)
            return(
                <div >
                <Card className='Card' style={{ width: '23rem',marginBottom:'1rem',marginRight:'2rem'}}>
        <Card.Body style={{flex:1}}>
            <Card.Title>{doctor.Fname +"  "+ doctor.Lname}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{doctor.Address}</Card.Subtitle>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>
            <Card.Link><Link to={"doctordetails/"+doctor._id}> More Info</Link></Card.Link>
        </Card.Body>
        </Card>

        
        </div>
        
            )
        })}
        
        </div>
        <Pagination>
        <Pagination.Prev onClick={()=>{
     
     let page = prevpage.page
     let limit = prevpage.limit
     DoctorDataService.getAll(page,limit,query,token)
     .then((response)=>{
         console.log(response.data);
         setDoctors(response.data.result);
         setCurrent(page)
         setNext(response.data.next)
            setPrev(response.data.prev)
         
     })
     .catch((e)=>{
         console.log(e);
     })
}} />

  <Pagination.Item>{currentpage}</Pagination.Item>
  <Pagination.Next onClick={()=>{
     
        let page = nextpage.page
        let limit = nextpage.limit
        DoctorDataService.getAll(page,limit,query,token)
        .then((response)=>{
            console.log(response.data);
            setDoctors(response.data.result);
            setCurrent(page)
            setNext(response.data.next)
            setPrev(response.data.prev)
            
        })
        .catch((e)=>{
            console.log(e);
        })
  }}/>
    
        </Pagination>
</div>

</div>
        
        </div>
                        
      
    </div>
    </div>
            </div>
  );
}

export default DoctorList;

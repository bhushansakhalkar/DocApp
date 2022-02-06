import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import DoctorDataService from '../services/doctors'

const Login = ()=>{
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const login = async(event)=>{
        event.preventDefault ()
        const result = await fetch('http://localhost:5000/api/doctor/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/JSON'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json())

        if(result.status === 'ok'){
            
            console.log('got the token: ', result.acesstoken)
            localStorage.setItem('token', result.acesstoken)
            console.log(result)
            console.log(result.type)
            if(result.type == 'Patient'){
                //patient home page send id to home page
                navigate('/patient/registration')
            }else{
                //doctor home page send id to home page
                navigate("/doctor")
            }
            
        } else {
            alert(result.error)
        }
       
    }
    return(
        <section className="container-fluid backgd">
        <section className="row justify-content-center">
            <section className="col-12 col-sm-6 col-md-3">
                <form id = "reg-login" className="form-container">
                    <h3 className="fw-normal mb-3 pb-3 " style={{letterSpacing: "1px"}}>Login</h3>
                    <div className="mb-3">
                      <label  className="form-label">User name</label>
                      <input type="text" className="form-control" id="username" onChange={(e)=>{
                          setUsername(e.target.value)
                      }} aria-describedby="emailHelp"/>
                    </div>
                    <div className="mb-3">
                      <label  className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" onChange={(e)=>{
                          setPassword(e.target.value)
                      }} />
                    </div>
                    <div className="col text-center">
                    <button type="submit" className="btn btn-block btn-lg btn-primary" onClick={login}>Submit</button>
                    </div>
                  </form>
            </section>
        </section>
    </section>
    )
}


export default Login;
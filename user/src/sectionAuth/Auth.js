import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  
import './Auth.css'
import Register from './Register';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { checkUser } from '../service/api';
function Auth() {
  const initials={
    username:'',
    password:'',
  }
  const [authdata,setAuthdata]=useState(initials)
  const navigate= useNavigate()

  const handleChange = (e) =>{
    setAuthdata({...authdata, [e.target.name]:e.target.value})
  }

  const savePost = async () =>{
    // console.log(authdata)
    let data = await checkUser(authdata);
    if (data.data.user){
      localStorage.setItem('token',data.data.user)
      alert('Login succesful');
      navigate(`/home`)
    }
    else{
      alert("Invalid username or password")
    }
  }
  return (
    <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                  <h1>LOGIN</h1>
              
                  <div class="form-outline mb-4">
                      <input onChange={(e) => handleChange(e)} name='username' type="text" id="form1Example13" class="form-control form-control-lg" />
                      <label class="form-label" for="form1Example13">UserName</label>
                  </div>

                  
                  <div class="form-outline mb-4">
                      <input onChange={(e) => handleChange(e)} name='password' type="password" id="form1Example23" class="form-control form-control-lg" />
                      <label class="form-label" for="form1Example23">Password</label>
                  </div>

                  <div class="d-flex justify-content-around align-items-center mb-4">
                      
                      
                      <Link to={'/register'}>ClICK HERE TO CREATE NEW ACC</Link>
                  </div>

                  
                  <Button onClick={() => savePost()} class="btn btn-primary btn-lg btn-block">Sign in</Button>

                  

              </form>
          </div>
          </div>
        </div>
    </section>
       
  )
}

export default Auth

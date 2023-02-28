
import React from 'react';
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import { useContext } from 'react';
import icon from './icon';
// import {useDispatch} from 'react-redux';

import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import { useContext } from 'react';



const Login = () => {
  const context = useContext(noteContext);
  const {showAlert} = context;
const [credentials,setCredentials]  =useState({email:"",password:""});

const [pass,setPass] = useState('password');
let navigate = useNavigate();
// const dispatch = useDispatch();




 const handleEye = ()=>{
  if (pass==='password') {
    setPass('text');
  }
  else{
    setPass('password');
  }
 }

let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response  = await fetch('http://localhost:5000/api/auth/login',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body :JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json =await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.auth_token);
            showAlert("User logged in successfully !","success");

            setCredentials({email:"",password:""});

            navigate("/")
           
        }
        else{
           showAlert("Invalid Credentials","danger")
        }


    }
    const onchange =(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    } 

    const googleSuccess =  async(res)=>{
      console.log(res);
      console.log('User login successful')
      const result = res.profileObj;
      const token = res.tokenId;
      console.log(result,token);
      // try {
      //   dispatch({type:'AUTH',data:{result,token}})
      // } catch (error) {
      //   console.log(error); 
      // }
    }
    const googleFailure= async(err)=>{
      console.log(err);
      console.log('Google Sign In was unsuccessful!, Try Again Later!');
    }
  

    
  return (
    <>
    <div className='mt-3'>
    <h2 className='my-2'>Login to continue to iCloud book</h2>
    <div className='container my-3'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>

    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" value={credentials.email}/>

    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp"/>

    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

    <div className="d-flex" style={{justifyContent:'space-between'}}>
    <input type={pass} className="form-control" id="password" name='password'  autoComplete ="on" onChange={onchange} value={credentials.password} />
    <i className="fa-solid fa-eye" onClick ={handleEye} style={{lineHeight:'35px',marginLeft:'-40px'}}></i></div>

    <input type="password" className="form-control" id="password" name='password'  autoComplete ="on" onChange={onchange}/>

  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
<<<<<<< HEAD
<div style ={{marginTop:'10px'}}>
<GoogleOAuthProvider clientId="988940801897-mrdr05rrn119oil8o7ru1e78behf4acb.apps.googleusercontent.com">
<GoogleLogin
  // onSuccess={credentialResponse => {
  //   console.log(credentialResponse);
  // }}
    onSuccess={googleSuccess}
    onFailure = {googleFailure} 
  // onError={() => {
  //   console.log('Login Failed');
  // }}
/>
</GoogleOAuthProvider>
</div>

 {/* <GoogleLogin
    clientId="988940801897-mrdr05rrn119oil8o7ru1e78behf4acb.apps.googleusercontent.com"
    render={(renderProps)=>(
    <button className='btn btn-primary' style={{cursor:'pointer',color:'black',borderRadius:'5px',backgroundColor:'lightBlue',margin:'10px auto',padding:'2px',outline:'none',display:'block',width:'100%'}} color ='primary' fullWidth onClick={renderProps.onClick} disabled ={renderProps.disabled} startIcon ={icon} variant ="contained">Sign In With Google</button>
    
     )} 
     onSuccess = {googleSuccess}
     onFailure= {googleFailure}
     cookiePolicy={'single_host_origin'}
     /> */}


    </div>
    </div>
    </>
  )
}

export default Login

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import noteContext from '../context/NoteContext';

const SignUp = () => {
  const context = useContext(noteContext);
  const {showAlert} = context;
const [credentials,setCredentials] =useState({name:"",email:"",password:"",cpassword:""});

var navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response  = await fetch('http://localhost:5000/api/auth/CreateUser',
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body :JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    })
    const json =await response.json();
    // console.log(json);

    if(json.success){
        localStorage.setItem('token',json.auth_token);
        navigate("/");
        showAlert("User signed in !","success");
    }
    else{
        showAlert("Enter valid credentials","warning");
    }
    
}
const onchange = (e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <>
    <div className ="container mt-3 my-3">
      <h2>Create your account on Cloud Notebook</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
    <input type="text" className="form-control" id="name"  name ="name"  value={credentials.name} minLength ={3} required onChange={onchange}/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name ="email" value ={credentials.email}aria-describedby="emailHelp" onChange={onchange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name ="password" value ={credentials.password} onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onchange} minLength=
    {5} required/>
  </div>
  
  <button disabled ={credentials.password!==credentials.cpassword}type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}

export default SignUp

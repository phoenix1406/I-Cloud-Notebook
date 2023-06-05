
import React from 'react';


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import { useContext } from 'react';

// import {useDispatch} from 'react-redux';




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



    
  return (
    <>
    <div className='mt-3'>
    <h2 className='my-2'>Login to continue to iCloud book</h2>
    <div className='container my-3'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>

    <input type="email" className="form-control" id="email" name='email' onChange={onchange} aria-describedby="emailHelp" value={credentials.email}/>

   
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

    <div className="d-flex" style={{justifyContent:'space-between'}}>
    <input type={pass} className="form-control" id="password" name='password'  autoComplete ="on" onChange={onchange} value={credentials.password} />
    <i className="fa-solid fa-eye" onClick ={handleEye} style={{lineHeight:'35px',marginLeft:'-40px'}}></i></div>

  

  </div>
 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>




    </div>
    </div>
    </>
  )
}

export default Login

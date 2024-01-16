import React from 'react'
import "./Signup.css"
import axios from "axios";
import { useState } from 'react'
import Headingcomponent from './Headingcomponent'
import {useNavigate} from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { authActions } from '../../store';
const Signin = () => {
const dispatch=useDispatch();

  const history =useNavigate();
  const[Inputs,setInputs]=useState({
    email:"",
    
  password:"",
  });
  const change=(e)=>{
    const{name,value}=e.target;
    setInputs({...Inputs,[name]:value});
  }
  const submit= async(e)=>{
    e.preventDefault();
    await axios
    .post("http://localhost:1000/api/v1/signin",Inputs)
    .then((response)=>{
 sessionStorage.setItem("id",response.data.others._id);
dispatch(authActions.login());
  history("/todo");
    });
  
  }
  

  return (
    <div> <div className='signup'>
    <div className='container'>
     <div className='row'>
     <div className='col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center'>
          <Headingcomponent first="Sign" second="In"/>
         </div>
         <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
             <div className='d-flex flex-column  p-3'>
                <input type='email' 
                placeholder='Enter Your Email' 
                name='email' 
                className='p-2 my-3 input-signup'
                value={Inputs.email}
                onChange={change}  />
             
                <input type='password' 
                placeholder='Enter Your password'
                 name='password'
                  className='p-2 my-3 input-signup'
                  value={Inputs.password}
                  onChange={change}  />
           
           <button className='b p-2' onClick={submit}>SignIn</button>
             </div>
          </div>
         
     </div>
    </div>
     </div></div>
  )
}

export default Signin
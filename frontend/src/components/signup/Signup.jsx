import  { useState } from 'react'
import "./Signup.css"
import Headingcomponent from './Headingcomponent'
import axios from "axios";
import {useNavigate} from "react-router-dom";



const Signup = () => {
  const history =useNavigate();
  const[Inputs,setInputs]=useState({
    email:"",
    username:"",
  password:"",
  });

const change=(e)=>{
  const{name,value}=e.target;
  setInputs({...Inputs,[name]:value});
}
const submit= async(e)=>{
  e.preventDefault();
  await axios
  .post("http://localhost:1000/api/v1/register",Inputs)
  .then((response)=>{
if(response.data.message === "User Already Exists"){
  alert(response.data.message);
}else{
  alert(response.data.message);
  setInputs({
      email:"",
      username:"",
    password:"",
    });
    history("/signin");
  }
  });

 


}
  return (
    <div className='signup'>
       <div className='container'>
        <div className='row'>
            <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column  p-3'>
                   <input type='email'
                   placeholder='Enter Your Email' 
                   name='email' 
                   className='p-2 my-3 input-signup'
                   onChange={change} 
                   value={Inputs.email}/>
                  
                   <input type='username' 
                   placeholder='Enter Your username' 
                   name='username' 
                   className='p-2 my-3 input-signup' 
                   onChange={change} 
                   value={Inputs.username}/>
                   
                   <input type='password' 
                   placeholder='Enter Your password'
                    name='password'
                     className='p-2 my-3 input-signup'
                     onChange={change} 
                     value={Inputs.password}/>
             
              <button className='b p-2' onClick={submit}>SignUp</button>
                </div>
             </div>
            <div className='col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none'>
                <Headingcomponent first="Sign" second="Up"/>
            </div>
        </div>
       </div>
        </div>
  )
}

export default Signup
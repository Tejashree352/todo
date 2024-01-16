import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';

const Update = ({display,update}) => {
  useEffect(()=>{
   setInputs(
    {
      title:update.title,
      body:update.body,
    }
   )
  },[update])
  const [Inputs,setInputs]=useState(
    {title:"",
      body:"",
    });
  const change=(e)=>{
 const {name,value}=e.target;
setInputs({ ...Inputs,[name]:value});

  };
  const submit= async()=>{
    await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`,Inputs)
    .then((response)=>{
      toast.success("Your task is Updated");
    });
  

    display("none")
  };
  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
        <h3>Update your task</h3>
        <input type='text' 
        className='todo-inputs w-100 my-4 p-3'
         value={Inputs.title} 
         name="title"
         onChange={change}/>

<textarea 
className='todo-inputs w-100 p-3'
value={Inputs.body} 
name="body"
onChange={change}/>
<div>
<button className='btn btn-dark my-4'onClick={submit}>UPDATE</button>
<button className='btn btn-danger my-4 mx-3'onClick={()=>{display("none")}}
 >CLOSE</button>
    </div>
    </div>
  )
}

export default Update
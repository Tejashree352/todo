import React, { useEffect, useState } from 'react'
import "./Todo.css"
import Todocard from './Todocard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import {  useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { UseSelector } from 'react-redux';
import axios from 'axios';
let toUpdateArray=[];

let id =sessionStorage.getItem("id");
const Todo = () => {
    const[Inputs,setInputs]=useState({title:"",body:""})

    const[Array,setArray]=useState([]);


const show =()=>{

document.getElementById("textarea").style.display="block";
};
const change =(e)=>{
    const{name,value}=e.target;
    setInputs({  ...Inputs,[name]:value});

}  
const submit = async () => {
    try {
      if (Inputs.title === '' || Inputs.body === '') {
        toast.error('Title or Body should not be empty');
      } else {
        if (id) {
          await axios.post('http://localhost:1000/api/v2/addTask', {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          });

          setInputs({ title: '', body: '' });
          toast.success('Your task is added');
        } else {
          setArray([...Array, Inputs]);
          setInputs({ title: '', body: '' });

          toast.error('Your task is not added! Please SignUp');
        }
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('An error occurred while adding the task');
    }
  };


const del=async(Cardid)=>{
    if(id){
await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`,
{
    data:{id:id},
})
.then((response)=>{
    toast.success("Your task is deleted");
})
    }else{
        toast.error("please signUp first");
    }
}
const dis=(value)=>{

    document.getElementById("todo-update").style.display=value;
}

const update=(value)=>{
    toUpdateArray=Array[value];
}

useEffect(()=>{
    if(id){
        const fetch=async ()=>{
            await axios.get(`http://localhost:1000/api/v2/getTask/${id}`)
            .then((response)=>{
                setArray(response.data.list)
            });
        };
        fetch();

    }
  
        },[submit])


    return (
        <>
        <div className='todo'>
            <ToastContainer/>
            <div className='todo-main container d-flex justify-content-center align-items-center my-4 flex-column '>
                <div className='d-flex flex-column todo-input-div w-60 p-2'>
                    <input type='text' 
                    placeholder='TITLE' 
                    className='my-2 todo-input'
                    name='title'
                    value={Inputs.title}          
                          onClick={show}
                    onChange={change}
                    >
                </input>


                    <textarea id="textarea"
                    type='text'
                    name='body' 
                    value={Inputs.body}
                    placeholder='BODY' 
                    className="p-2 todo-input" 
                    onChange={change}
                    >
             </textarea>
            
                </div>
                <div className='w-60 d-flex justify-content-end my-2'> 
                <button className='home-btn px-2 py-1'  onClick={submit}>ADD</button>
                </div>
                

            </div>
            <div className="todo-body">
<div className="container-fluid">
    <div className='row'>
        
        {Array && Array.map((item,index)=>(
            <div className='col-lg-3 col-10 mx-lg-5 mx-5 my-2' key={index}>
    <Todocard title={item.title} 
    body={item.body}
     id={item._id} 
     delid={del}
     display={dis}
     updateId={index}
     toBeUpdate={update}/>
    </div>))}
        </div>
    
</div>

            </div>
        </div>
        <div className="todo-update" id="todo-update">
            <div className='container update'>
                <Update display={dis} update={toUpdateArray}/> </div>
           
        </div>
        </>
    )
}

export default Todo
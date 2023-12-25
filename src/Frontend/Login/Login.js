import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login() {

const [fname,setFname] = useState('')
const [password,setPassword] = useState('')

const [store,setStore] = useState([])
const navi = useNavigate();
useEffect(()=>{
    axios.get("http://localhost:1000/getuser")
    .then((res)=> setStore(res.data))
    .catch((err)=>console.log(err))
  },[])
  
  function handlesubmit() {
    const userExists = store.find(user => user.Username === fname && user.Password === password);

    if (userExists) {
        alert('Login Success');
        navi('/');
    } else {
        alert('Invalid username or password');
    }
}




  return (
    <div>
         <form>
      <input type='text' className='form-control' onChange={(e)=> setFname(e.target.value)} placeholder='Username' />
      <input type='text' className='form-control' onChange={(e)=> setPassword(e.target.value)} placeholder='Password' />
      <button onClick={handlesubmit} className='btn btn-success'>Submit</button>
      </form>
    </div>
  )
}

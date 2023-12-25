import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import  axios from 'axios'


export default function Signup() {

const [fname,setFname] = useState('')
const [password,setPassword] = useState('')
const [repassword,setRepassword] = useState('')

const navi = useNavigate()


const handlesubmit = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:1000/signup',{
        Username:fname,
        Password:password,
        Repassword:repassword
    }).then((res)=>{
        console.log(res.data);
        alert("Signup Successfully")
        navi('/')

    }).catch((err)=>{
        console.log(err);
    })
}

  return (
    <div>
      <input type='text' className='form-control' placeholder='Username' onChange={(e)=> setFname(e.target.value)} />
      <input type='text' className='form-control' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} />
      <input type='text' className='form-control' placeholder='Repassword' onChange={(e)=> setRepassword(e.target.value)} />
      <button className='btn btn-primary' onClick={handlesubmit}>Submit</button>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Registration() {
    const navigate=useNavigate();
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [contact,setContact]=useState('')
    const [place,setPlace]=useState('')
    const [password,setPassword]=useState('') 
    const save=()=>{
        let params={
            name:name,
            email:email,
            contact:contact,
            place:place,
            password:password,
            userstatus:1
        }
        fetch('http://localhost:4000/truck/addtruckowner',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(params)
        }).then((res)=>res.json()).then((result)=>{
            console.log(result);
            navigate('/')
        })
    }
  return (
    <div class="container-fluid">
    <div class="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-8">
            <div class="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <a href="index.html" class="">
                        <h3 class="text-primary">Return Vehicle</h3>
                    </a>
                    <h3>Sign Up</h3>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingText" placeholder="enter shop name" onChange={(event)=>setName(event.target.value)}/>
                    <label for="floatingText">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="enter email" onChange={(event)=>setEmail(event.target.value)}/>
                    <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="number" class="form-control" id="floatingPassword" placeholder="enter contact number" onChange={(event)=>setContact(event.target.value)}/>
                    <label for="floatingPassword">Contact</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="enter location" onChange={(event)=>setPlace(event.target.value)}/>
                    <label for="floatingPassword">Location</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="enter Password" onChange={(event)=>setPassword(event.target.value)}/>
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="button" class="btn btn-primary py-3 w-100 mb-4" onClick={save}>Register</button>
                <p class="text-center mb-0">Already have an Account? <a href="/">Sign In</a></p>
            </div>
        </div>
    </div>
</div>
  )
}


export default Registration

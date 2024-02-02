import React, { useState } from 'react'
import axios from 'axios';

export default function Login() {

  const[text,settext] = useState("");
  const[pass,setpass] = useState("");

  const onchangetext = (e)=>{
    settext(e.target.value)
  }

  const onchangepass = (e)=>{
    setpass(e.target.value);
  }

  



  // const handleChange = ({currentTarget:input})=>{
  //   setdata({data,[input.name]:input.value})
  // }

  // const user = {
  //   username:data.username,
  //   password:data.password
  // }

  const onsubmitdata = async(e) =>{
    e.preventDefault();
    const data = {
      "name":text,
      "password":pass
    }
    const result = await axios.post('http://localhost:5000/goal/login',data)
    const success = result.data.success;
    if(success){
      const correctuser = result.data.correctuser
      const id = correctuser._id
      window.location = '/get/'+id
    }
    else{
      window.location = '/';
    }
  }


  // const handleChange = (e) =>{
  //   setdata(e.target.value)
  // }


  return (
    <div>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Username</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchangetext} value={text} />
          {/* <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={onchangepass} value={pass} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onsubmitdata} >Login</button>
        <a class="btn btn-primary" href="/register" role="button">Register</a>
      </form>
    </div>
  )
}

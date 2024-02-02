// import React, { Component } from 'react'
// import axios from 'axios';

// export default class Register extends Component {
//   constructor(props){
//     super(props)

//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);
//     this.onSubmit = this.onSubmit.bind(this)

//     this.state = {username:'',email:'',password:''}
//   }

//   //this.onChange will not work until we this bind username 


//   onChangeUsername(e){
//     this.setState({
//       username: e.target.value
//     })
//   }
//   onChangeEmail(e){
//     this.setState({
//       email: e.target.value
//     })
//   }
//   onChangePassword(e){
//     this.setState({
//       password: e.target.value
//     })
//   }

//   onSubmit(e){
//     e.preventDefault();

//     const newuser = {
//       username: this.state.username,
//       email: this.state.email,
//       password: this.state.password
//     }

//     axios.post('http://localhost:5000/users/add',newuser)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

//     window.location = '/';
//   }

  



//   render() {
//     return (
//       <div>
//         <form>
//       <div className="mb-3">
//         <label for="exampleInputEmail1" className="form-label">Username</label>
//         <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" onChange={this.onChangeUsername} value={this.state.username} />
//       </div>
//       <div className="mb-3">
//         <label for="exampleInputEmail1" className="form-label">Email address</label>
//         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.onChangeEmail} value={this.state.email}/>
//       </div>
//       <div className="mb-3">
//         <label for="exampleInputPassword1" className="form-label">Password</label>
//         <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.onChangePassword} value={this.state.password}/>
//       </div>
//       <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Register</button>
//       <a class="btn btn-primary" href="/" role="button">Back to login</a>
//     </form>
//       </div>
//     )
//   }
// }


import React, { useState } from 'react'
import axios from 'axios';

export default function Register() {
  const[text,settext] = useState("");
  const[email,setemail] = useState("");
  const[pass,setpass] = useState("");

  const onChangeText = (e)=>{
    settext(e.target.value)
  }
  const onChangeEmail = (e)=>{
    setemail(e.target.value)
  }
  const onChangePassword = (e)=>{
    setpass(e.target.value)
  }

  // const compmount = () =>{
  //   console.log("hello")
  // }

  const onSubmit = async(e) =>{
    e.preventDefault();
    console.log("hello")

    const newuser = {
      name:text,
      email:email,
      password:pass
    }

    console.log(newuser)

    try {
      const response = await axios.post('http://localhost:5000/goal/add',newuser)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

    window.location = '/';
  }

  return (
    <div>
        <form>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Username</label>
        <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" onChange={onChangeText} value={text} />
      </div>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeEmail} value={email}/>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChangePassword} value={pass}/>
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSubmit} >Register</button>
      <a class="btn btn-primary" href="/" role="button" >Back to login</a>
    </form>
      </div>
  )
}



// import React, { useState } from 'react'
// import axios from 'axios';

// export default function Register() {
//   const[text,settext] = useState("");
//   const[email,setemail] = useState("");
//   const[pass,setpass] = useState("");

//   const onChangeText = (e)=>{
//     settext(e.target.value)
//   }
//   const onChangeEmail = (e)=>{
//     setemail(e.target.value)
//   }
//   const onChangePassword = (e)=>{
//     setpass(e.target.value)
//   }

//   const onSubmit = async(e) =>{
//     e.preventDefault();
//     console.log("hello")

//     const newuser = {
//       name:text,
//       email:email,
//       password:pass
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/goal/add',newuser)
//       console.log(response.data)
//     } catch (error) {
//       console.log(error)
      
//     }

//     // window.location = '/';


//   }

  

//   return (
//     <div>
//         <form>
//       <div className="mb-3">
//         <label for="exampleInputEmail1" className="form-label">Username</label>
//         <input type="text" className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" onChange={onChangeText} value={text} />
//       </div>
//       <div className="mb-3">
//         <label for="exampleInputEmail1" className="form-label">Email address</label>
//         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeEmail} value={email}/>
//       </div>
//       <div className="mb-3">
//         <label for="exampleInputPassword1" className="form-label">Password</label>
//         <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChangePassword} value={pass}/>
//       </div>
//       <button type="submit" className="btn btn-primary" onSubmit={(e)=>onSubmit(e)} >Register</button>
//       <a class="btn btn-primary" href="/" role="button" >Back to login</a>
//     </form>
//       </div>
//   )
// }

import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";

const Signup = (props) => {
const [credentials, setCredentials] = useState({fname: "", lname: "", email: "", password: "", cpassword: ""})
let Navigate = useNavigate();

    const handleSubmit= async (e)=>{
    e.preventDefault();
    const {fname, lname, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/authorization/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
         },
         body: JSON.stringify({fname, lname, email, password})
    })
    const json= await response.json()
    console.log(json)

    if(json.success){
      //Save the authToken and redirect
      localStorage.setItem('token' , json.authtoken)
      Navigate('/')
      props.showAlert("Account Created Succesfully!", "success")
    }  
    else{
      // alert(json.error); 
      props.showAlert("Invalid Credentials!", "danger")
    }
}
const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value }) /* Here we using the spread operatotr which does that 
                                                         the roperties of ...note is remained there only and the 
                                                         properties enter further ...note will newly insert 
                                                         or overwrite them. */
    }
  return (
    <div className="container mt-2">
      <h2 className='my-3'>Create an account to use iNoteBook</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="fname" className="form-label">First Name</label>
    <input type="fname" className="form-control" onChange={onChange} id="fname" name="fname" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="lname" className="form-label">Last Name</label>
    <input type="lname" className="form-control" onChange={onChange} id="lname" name="lname" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" name= "password" required minLength={6}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} id="cpassword" name= "cpassword" required minLength={6}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" onChange={onChange} id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Signup
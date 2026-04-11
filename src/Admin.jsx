import React, { useState } from 'react'
import './Admin.css';
import {  useNavigate } from 'react-router';
import toast,{Toaster} from 'react-hot-toast';


function Admin() {
    const[email,setEmail]=useState("admin@gmail.com");
    const[password,setPassword]=useState("12345");
    const[message,setMessage]=useState("");
    const navigate=useNavigate();   
    const validemail="admin@gmail.com";
    const validpassword="12345";
    const isvaildd=validemail==="admin@gmail.com" && validpassword==="12345";
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(email===validemail && password===validpassword){
            toast.success("Admin login successfully..");
            setMessage("Login sucessfully..");
            setTimeout(()=>{
              navigate("/Adminhome")
            },1500)
            

        }
        else{
            console.log(email);
            console.log(password);
            toast.error("Admin login error..!");
            setMessage("Invalid password and username..");
        }
        
    }
  return (
    <div className='adminMain'>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
      style: {
      zIndex: 9999,
    },
  }}/>
    <div className='admincontainer'>
        <h2 className='adminlogin'>Admin Login</h2>
        
        <label htmlFor="email" className='emaillabel'>Email</label><br />
        <input type="email" className='email'  value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
        <label htmlFor="password" className='passwordlabel' >Password</label><br />
        <input type="password" className='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        
        {message && <p className='message' >{message}</p>}
        <button className={`adminbtn ${isvaildd ? "enabledd":""}`} type='submit' onClick={handleSubmit} disabled={!isvaildd} >Admin Login</button>
      
    </div>
    </div>
  )
}

export default Admin

import React, { useEffect, useRef, useState } from 'react'
import leftexit from './assets/left.svg';
import './Otp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Otp({length=6,onotpSubmit=()=>{ },email}) {
  const[otp,setOtp]=useState(new Array(length).fill(""));
  const[otpmsg , setOtpmsg]=useState("");
  const navigate=useNavigate();
  
  
  const inputRefs=useRef([]);

  useEffect(()=>{
    if(inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
    


  },[])
  const handleChange=(index,e)=>{
    const value=e.target.value;
    if(isNaN(value)) return;
    const newOpt=[...otp]
    newOpt[index]=value.substring(value.length-1);
    setOtp(newOpt);
    const combined=newOpt.join("");
    if(combined.length===length) onotpSubmit(combined);

    //move to next input box
    if(value && index<length-1 && inputRefs.current[index+1]){
      inputRefs.current[index+1].focus();

    }
    
    
    

  };
  const handleClick=(index)=>{
    inputRefs.current[index].setSelectionRange(1,1);
  }

  const handlekeydown=(index,e)=>{
    if(e.key==="Backspace" && inputRefs.current[index-1] && index>0 && !otp[index]){
      inputRefs.current[index-1].focus();
    }
  }

  const verifyOtp = async () => {
  const enteredOtp = otp.join("");
  const isvalid=enteredOtp.length===6;

  if (enteredOtp.length < length) {
    alert("Please enter complete OTP...");
    return;
  }

  try {
    const res = await axios.post("https://backend-fgbg.onrender.com/verifyOTP", {
      otp: enteredOtp,
      email: email
    });

    setOtpmsg(res.data.message);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      setOtp(new Array(length).fill(""));
      navigate("/");
    }

  } catch (err) {
    console.log(err);
  }
};


  

 

    
  return (
    <div className='otpcontainer'>
        <img src={leftexit} alt="exit from otp" className='leftexit' onClick={()=>navigate("/Signin")}/>
        <h2 className='headding'>Verify OTP</h2>
        <p className='otp'>Enter the OTP sent to  {email} </p>
        <p className='update'>Update Number</p>
        {otp.map((value,index)=>{
            return( <input type="text"
                            key={index}
                            className='otpinput'
                            value={value}
                            ref={(input)=>(inputRefs.current[index]=input)}
                            onChange={(e)=>handleChange(index,e)} 
                            onClick={()=>handleClick(index)}
                            onKeyDown={(e)=>handlekeydown(index,e)}/>
                            
            );
          })
        }
        {otpmsg && <p className='otpmsg'>{otpmsg}</p>}



    

        <button className={`btnotp ${isvalid?"enabled":" "}`} onClick={verifyOtp}>Verify OTP</button>

      
    </div>
  );
    }
    export default Otp



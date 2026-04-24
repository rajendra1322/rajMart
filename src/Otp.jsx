import React, { useEffect, useRef, useState } from 'react'
import leftexit from './assets/left.svg';
import './Otp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Otp({ length = 6, onotpSubmit = () => { }, email, redirect }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [otpmsg, setOtpmsg] = useState("");
  const navigate = useNavigate();


  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }



  }, [])
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOpt = [...otp]
    newOpt[index] = value.substring(value.length - 1);
    setOtp(newOpt);
    const combined = newOpt.join("");
    if (combined.length === length) onotpSubmit(combined);

    //move to next input box
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();

    }




  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);
  }

  const handlekeydown = (index, e) => {
    if (e.key === "Backspace" && inputRefs.current[index - 1] && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  }

  const verifyOtp = async () => {
    const enteredOtp = otp.join("");


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
        if (redirect) {
          navigate(redirect);
        } else {
          navigate("/");
        }
      }

    } catch (err) {
      console.log(err);
    }
  };







  return (
   <div className="min-h-screen  w-[1900px] flex items-center justify-center bg-white  ml-[-22px] mt-[-22px]">

  <div className="w-[400px] max-w-md bg-white rounded-2xl shadow-xl p-6 relative">

    {/* Back Button */}
    <img
      src={leftexit}
      alt="back"
      onClick={() => navigate(-1)}
      className="w-6 h-6 cursor-pointer absolute top-5 left-5 opacity-70 hover:opacity-100"
    />

    {/* Heading */}
    <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">
      Verify OTP
    </h2>

    <p className="text-center text-gray-500 mt-2">
      Enter the OTP sent to
    </p>

    <p className="text-center text-blue-600 font-medium break-all">
      {email}
    </p>

    {/* Update */}
    <p
      className="text-center text-sm text-blue-600 mt-2 cursor-pointer hover:underline"
      onClick={() => navigate("/Signin")}
    >
      Update Number
    </p>

    {/* OTP Inputs */}
    <div className="flex justify-center gap-3 mt-8">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          ref={(input) => (inputRefs.current[index] = input)}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handlekeydown(index, e)}
          maxLength={1}
          className="
            w-12 h-12 text-center text-lg font-bold
            border-b-2 border-gray-400
            focus:border-blue-500 outline-none
            transition-all duration-200
          "
        />
      ))}
    </div>

    {/* Error */}
    {otpmsg && (
      <p className="text-red-500 text-sm text-center mt-4">
        {otpmsg}
      </p>
    )}

    {/* Button */}
    <button
      onClick={verifyOtp}
      className="w-full mt-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
    >
      Verify OTP
    </button>

  </div>
</div>
  );
}
export default Otp



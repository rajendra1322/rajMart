import React, { useState } from 'react'
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
            localStorage.setItem("admin", "true");
            setTimeout(()=>{
              navigate("/Dashboard")
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
   <div className="min-h-screen w-[1900px] flex items-center  justify-center  px-4">

  <Toaster position='top-center'  />
  <div className="w-[500px] max-w-md h-[500px] bg-[white]  rounded-2xl shadow-2xl p-8">

    
    <h2 className="text-2xl font-bold text-center text-black mb-9 ml-[-240px]">
      Admin Login
    </h2>

    
    <div className="mb-4">
      <label className="block text-sm text-black-300 mb-1">
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
        className="w-full mb-4 px-4 py-2 rounded-lg bg-[white] border border-gray-700 text-black
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    
    <div className="mb-4">
      <label className="block text-sm text-black-300 mb-1">
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="w-full px-4 py-2 rounded-lg bg-[white] border border-gray-700 text-black
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>

    
    {message && (
      <p className="text-sm text-red-400 text-center mb-4">
        {message}
      </p>
    )}

    
    <button
      onClick={handleSubmit}
      disabled={!isvaildd}
      className={`w-full py-2 mt-24 rounded-lg font-semibold transition duration-200
        ${isvaildd
          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
    >
      Admin Login
    </button>

  </div>
</div>
  )
}

export default Admin

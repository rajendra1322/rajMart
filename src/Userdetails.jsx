import React, { useEffect, useState } from 'react'
import './Userdetails.css'
import Adminhome from './Adminhome'
import axios from 'axios';


function Userdetails  ()  {
    const[users,setUsers]=useState([]);
    useEffect(()=>{
       async function fetchData(){
          const res= await axios.get("https://backend-fgbg.onrender.com/getalluser");
          setUsers(res.data);

       }
       fetchData();
    },[])
    
  return (
   <div className="flex min-h-screen bg-gray-100 ">
  
  
  <div className="w-[260px] shadow-lg bg-white">
    <Adminhome />
  </div>

  
  <div className="flex-1 p-8 ml-[80px] w-[1500px]">
    
    <h1 className="text-3xl font-bold text-gray-800 mb-2 w-[1500px]">
      RajMart Users
    </h1>
    <p className="text-gray-500 mb-6 w-[900px]">
      Manage and view all registered users
    </p>

    
    <div className="grid gap-6 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

      {users.map((user) => (
        <div
          key={user._id}
          className="
            bg-gradient-to-br from-blue-400 to-indigo-600
            text-white p-5 rounded-2xl
            shadow-md hover:shadow-2xl
            transform hover:-translate-y-2 hover:scale-[1.02]
            transition-all duration-300 ease-in-out
            cursor-pointer relative overflow-hidden w-[350px]
          "
        >
          
          
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition duration-300"></div>

          {/* Avatar */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 mb-4 text-xl font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          
          <p className="text-lg font-semibold break-all">
            {user.email}
          </p>

          
          <p className="text-sm mt-2 opacity-90">
            📞 {user.number}
          </p>

        </div>
      ))}

    </div>
  </div>
</div>
  )
}

export default Userdetails
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
    <div className='adminleftuser'>
        <div className='userdetailsleft'>
            <Adminhome />
        </div >
        <div className='userdetailsright'>
           <h1 className='userdetailsh1'>RajMart users</h1>
           <hr />
           <div className='userdetailsgrid'>
           {users.map((user)=>(
            
                <div className='userdetailsbox' key={user._id}>
                <p className='userdetailsP'>{user.email}</p>
                <p className='userdetailsP'>{user.number}</p>

           </div>
           

            
        )
            
            )

            
            }
            </div>
           
        </div>
      
    </div>
  )
}

export default Userdetails
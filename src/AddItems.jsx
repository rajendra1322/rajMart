import React, { useEffect } from 'react'
// import "./AddItems.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Adminhome from './Adminhome'

function AddItems  ()  {
const [items,setItem]=useState([]);
const [enable,setEnable]=useState(false);
const[disablee,setDisablee]=useState(false);
  useEffect(()=>{
  axios.get("https://backend-fgbg.onrender.com/fetchProduct")
  .then(res=>setItem(res.data))
  
  .catch(err=>console.log(err))
   
  },[])
  

  const handleDelete=async(id)=>{
    try{
      let res=await axios.delete(`https://backend-fgbg.onrender.com/deleteProduct/${id}`);
      if(res.data.message==="deleted succesfully"){
        setEnable(true);
        setDisablee(true);
        setTimeout(()=>{
          setEnable(false);
          setDisablee(false);
          setItem(items.filter(item=>item._id!=id));

        },3000)
      
      }
      

    }
    catch(err){
      console.log(err,"deleting..error")
    }

  }
  
  return (
  
    <div className="flex min-h-screen bg-gray-50">

  
  <Adminhome />

  
  <div className="flex-1 p-8">

    
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-[30px]  font-bold text-gray-800 ml-48 ">
        Products Management
      </h2>

      <Link to="/Items">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-xl  transition hover:scale-105 mt-11  mr-5">
          + Add Item
        </button>
      </Link>
    </div>

    
    <div className="bg-white ml-[200px] rounded-2xl shadow-xl border border-gray-300 overflow-hidden">

      <table className="w-[1000px] text-left">

        
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th className="p-4">Product Name</th>
            <th className="p-4">View</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>

        
        <tbody>

          {items.map((item) => (
            <tr
              key={item._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium text-gray-700">
                {item.name}
              </td>

              <td className="p-4">
                <Link to={`/View/${item._id}`}>
                  <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                    View
                  </button>
                </Link>
              </td>

              <td className="p-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={disablee}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg transition"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>

    
    {enable && (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-red-200 text-red-500 px-6 py-3 rounded-xl animate-bounce">
        ❌ Deleted successfully
      </div>
    )}

  </div>
</div>
  )
}

export default AddItems

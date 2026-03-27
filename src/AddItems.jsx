import React, { useEffect } from 'react'
import "./AddItems.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Adminhome from './Adminhome'

function AddItems  ()  {
const [items,setItem]=useState([]);
const [enable,setEnable]=useState(false);
const[disablee,setDisablee]=useState(false);
  useEffect(()=>{
  axios.get("https://backend-lr7e.onrender.com/fetchProduct")
  .then(res=>setItem(res.data))
  
  .catch(err=>console.log(err))
   
  },[])

  const handleDelete=async(id)=>{
    try{
      let res=await axios.delete(`https://backend-lr7e.onrender.com/deleteProduct/${id}`);
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
    <div className='addsimple'>
      <Adminhome />
    <div className='mainadd'>
        <div className='additemscontainer'>
      <h2 className='add'>Add the items</h2>
      <Link to="/Items">
      <button className='addbtn'>Add+</button>
      </Link>
        <table className='productTable'>
          <thead>
          <tr>
            <th >products</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
          </thead>
          <tbody>
          {items.map( (item) => {
            return(
          <tr key={item._id}>
            <td>{item.name}</td>
            <td className='action'>
            <Link to={`/View/${item._id}`}>
            <button className='viewbtn'>View</button>
            </Link>
            </td>
            <td><button className='deltebtn' onClick={()=>handleDelete(item._id)} disabled={disablee}>Delete</button></td>
          
          </tr>
          
            )
            
          })}
          </tbody>
        </table>

        {enable && (<div className='deletedmessage'>
          <p className='delmsg'>❌deleted succesfully..</p>
        </div>
        )}
        
        
      </div>
    </div>
    </div>
  )
}

export default AddItems

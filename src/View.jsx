import React, { useEffect, useState } from 'react'
import './View.css'
import left from "./assets/left.svg"
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import axios from 'axios';


function View(){
    const navigate=useNavigate();
    const {id}=useParams();
    const[product,setProduct]=useState(null);

    useEffect(()=>{
      
      const fetchdata= async()=>{
      try{
      const res= await axios.get(`https://backend-lr7e.onrender.com/product/${id}`);
      setProduct(res.data);
      }
      catch(err){
        console.log(err);
      }
    };

    fetchdata();
    },[id])
    
    if(!product){
      return <h2>Loading....</h2>;
    }


  return (
    <div className='viewcontainer'>
    <div className='container'>
      <img src={left} alt="left arrow" className='leftimage' onClick={()=>navigate(-1)}/>
      
      <button className='editbtn' onClick={()=>navigate(`/Items/${id}`)}>Edit</button>
      
      <h1 className='view'>Product Details</h1>
      <img src={product.image} alt={product.name}  className='imageView'/>
      <p className='nameP'><strong>Name:</strong>{product.name}</p>
      <p className='quanP'><strong>Quantity:</strong>{product.quantity}</p>
      <p className='priceP'><strong>Price:</strong>{product.price}</p>
      <p className='priceP'><strong>Category:</strong>{product.category}</p>
      


    </div>
    </div>
  )
}

export default View

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';
import Adminhome from './Adminhome';


function View(){
    const navigate=useNavigate();
    const {id}=useParams();
    const[product,setProduct]=useState(null);

    useEffect(()=>{
      
      const fetchdata= async()=>{
      try{
      const res= await axios.get(`https://backend-fgbg.onrender.com/product/${id}`);
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
    
    <div className="flex min-h-screen bg-gray-50">

  <Adminhome />

  <div className="flex-1 p-8">
    <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-blue-600 transition hover:scale-105"
      >
        ←Back
      </button>

    <div className="flex items-center justify-between mt-[100px] w-[500px] ml-[420px] ">

      

      <h1 className="text-[30px] font-bold text-gray-800">
        Product Details
      </h1>

      <button
        onClick={() => navigate(`/Items/${id}`)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 hover:scale-105 rounded-xl"
      >
        Edit
      </button>

    </div>

    <div className="bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 max-w-3xl mx-auto w-[530px] h-[600px] mt-1 ml-[400px]">

      <div className="flex justify-center mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-[400px] h-[250px] object-cover rounded-xl mb-10 shadow-xl hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-4 bg-gray-100 rounded-xl hover:scale-105">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-semibold">{product.name}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl hover:scale-105">
          <p className="text-sm text-gray-500">Quantity</p>
          <p className="text-lg font-semibold">{product.quantity}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl hover:scale-105">
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-semibold">₹ {product.price}</p>
        </div>

        <div className="p-4 bg-gray-100 rounded-xl hover:scale-105">
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-lg font-semibold">{product.category}</p>
        </div>

      </div>

    </div>

  </div>

</div>
  )
}

export default View

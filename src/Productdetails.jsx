import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import './Productdetails.css'
import {addtocart} from '../src/utility/cart.js'
import toast,{ Toaster } from 'react-hot-toast'


function Productdetails (){
    const [product,setProduct]=useState(null);
    const[showmsg,setShowmsg]=useState(false);
    const[disable,setDisable]=useState(false);
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
    const fetchData=async()=>{
        try{
            const res=await axios.get(`https://backend-fgbg.onrender.com/product/${id}`);
            setProduct(res.data);


        }
        catch(err){
            console.log(err);
        }
    }
    fetchData();
    },[id])
    if(!product){
        return <h2>loading...</h2>
    }
    const usercount=localStorage.getItem("token");
    
    const handleAddtocart=async()=>{
      if(!usercount){
        toast.error("please login...");
        
      }
      else{
        toast.success("Product added to cart.")
      addtocart(product);
      
      setShowmsg(true);
      setDisable(true);
      setTimeout(()=>{
        setShowmsg(false);
        setDisable(false);
        navigate("/");
      },3000)
    }
      
    }

    
    
  return (
    
    <div>
        <Navigation />
      <div className='detailscontainer'>
        <Toaster position='top-center' />
        <div className='detailsdivide'>
        <div className='detailsone'>
          <img src={product.image} alt={product.image}  className='detailsimage'/>
         <button className='detailscart' onClick={handleAddtocart} disabled={disable}>Add to Cart</button>
         <button className='detailsbuy'> Buy Now</button>


        </div>
        <div className='detailstwo'>
          <h2 className='detailsname'>{product.name}</h2>
          <p className='detailsdesp'>{product.description}</p>
         <p className='detailswarranty'>Warranty:1 year</p>
         <div className='priceset'>
         <p className='detailsprice'>₹{product.price}.00 </p>
         <p className='discount'>35% off</p>
         </div>
         <p className='mrp'>MRP:₹{product.price+1000} (incl.of all taxes)</p>
         <hr />
         <h2 className='offermain'>offer(12)</h2>
         <p className='offerbank'>SBI-extra 500 off</p>
         <button className='offerviewbtn'>View all</button>
         <hr />
         <h2 className='delivto'>delivery to:</h2>


        </div>
        </div>
        {showmsg &&(
         <div className='cartToast'>
        <p>✅  Product added to cart.</p>
      </div>
        )}
        
        
      </div>
     
    </div>
  )
}

export default Productdetails

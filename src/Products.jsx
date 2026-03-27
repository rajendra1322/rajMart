import React, { useEffect, useState } from 'react'
import './Products.css';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router';



function Products () {
  const [product,Setproduct]=useState([])
  

  useEffect(()=>{
    axios.get("https://backend-lr7e.onrender.com/fetchProduct")
    .then(res=>Setproduct(res.data))
    .catch(err=>console.log("api error",err));
    
    

  },[])

  var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    
    
    <div className='productcontainer'  >
      {product.length > 0 ? (
      <Slider {...settings}>
      {product.map((item)=>{
      return(
      
        <Link to={`/Productdetails/${item._id}`}>
        <div className='products' key={item._id}>
        <img src={item.image} className='imageproduct'  width={100}/>
        <p className='productname'>{item.name}</p>
        
        <p className='productprice'>₹.{item.price}</p>
        <p className='productoffer'>35% OFF</p>
        
        </div>
        </Link>
          )
        })}
        </Slider>
      ):(<p>no product found</p>)}
        </div>
        

      
      
      
    
  )
}

export default Products

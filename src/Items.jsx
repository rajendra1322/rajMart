import React, { useEffect, useState } from 'react'
import './Items.css'
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router';



function Items () {
    const[name,setName]=useState("");
    const[quantity,setQuantity]=useState("");
    const[price,setPrice]=useState("");
    const[message,setMessage]=useState("");
    const[image,setImage]=useState(null);
    const[category,setCategory]=useState("");
    const {id}=useParams();
    const isEdit=Boolean(id);
    const navigate=useNavigate();

    useEffect(()=>{
      if(isEdit){
        const fetchData=async()=>{
        try{
          const res=await axios.get(`https://backend-fgbg.onrender.com/product/${id}`);
          if(res.data){
          setName(res.data.name);
          setQuantity(res.data.quantity);
          setPrice(res.data.price);
          setImage(res.data.image);
          setCategory(res.data.category);
          }

        }
        catch(err){
          console.log("fetch error",err);
        }
        };
        fetchData();
      }

    },[id,isEdit])

    const handleSubmit=async(e)=>{
      e.preventDefault();
      if (!name || !quantity || !price || !category) {
    setMessage("Please fill all fields and select an image.");
    return;
  }
      const form=new FormData();
      form.append("name",name);
      form.append("quantity",Number(quantity));
      form.append("price",Number(price));
      form.append("image",image);
      form.append("category",category);
      try{
        let res;
        if(isEdit){
          res=await axios.put(`https://backend-fgbg.onrender.com/updateItems/${id}`,form,{
         headers: { "Content-Type": "multipart/form-data" }});

        }else{
          res= await axios.post("https://backend-fgbg.onrender.com/addItems",form,{
  headers: { "Content-Type": "multipart/form-data" }});

        }
       
        setMessage(res.data.message);
        if(res.data.message==="product saved.." || res.data.message==="update successfully done.."){
          setName("");
          setQuantity("");
          setPrice("");
          setImage(null)
          setCategory("");
          setTimeout(() => {
            navigate("/AddItems");
      }, 3000);
          
        }
      }
      catch(err){
        console.log(err,"servererrororor");
        setMessage(err.response?.data?.message);
      }



    }
    const options=[
      "shoes",
      "mobiles",
      "speakers",
      "earbuds",
      "t-shirts",
      "pants",
      "shirts",
      "sports",
      "footwear",
      "mouse",
      "footwear",
      "electronics",
      "laptops"

    ]
    const onhandlerselect=(e)=>{
      setCategory(e.target.value);

    }
    
    
  return (
    <div className='itemsmain'>
    <div className='itemscontainer'>
        <h2 className='additems'>{isEdit? "update Items" :"Add Items"}</h2>
        <form  onSubmit={handleSubmit}>
        <div className='input'>
            <label htmlFor="name">Product Name</label>
            <input type="text" className='pname' value={name} onChange={(e)=>setName(e.target.value)} />
            <label htmlFor="quantity">Quantity</label>
            <input type="number" className='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
            <label htmlFor="price">Price</label>
            <input type="text" className='prize' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <label htmlFor="url"></label>
            <input type="file" className='imageurl' onChange={(e)=>setImage(e.target.files[0])}/>
            <label htmlFor="Category">Category</label>
            <select className='selectoption' onChange={onhandlerselect} value={category}>
              <option>select the category</option>
              {options.map((option,index)=>{
              return(
                <option key={index} >
                  {option}
                  </option>
              );
              })}
            </select>

          

            
        </div>
        {message && <p className='messagepopup'>{message}</p>}
        <button className='btnadd' type='submit'>{isEdit?"Update":"Add"}</button>
        </form>
      
    </div>
    
    </div>
  )
}

export default Items
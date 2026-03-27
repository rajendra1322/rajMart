import React, { useEffect, useState } from 'react'
import './Makepayment.css'
import  jiomartlogo from './assets/jiomartlogo.png'
import jiobag from './assets/jiobag.svg'
import sbi from './assets/ssbi.webp'
import yes from './assets/yes.webp'
import union from './assets/union.webp'
import icici from './assets/icici.webp'
import rbi from './assets/RBI.webp'
import canara from './assets/ccanara.webp'
import credpay from './assets/credpay.webp'
import cash from './assets/cash.webp';
import { useNavigate } from 'react-router'
import toast,{ Toaster } from 'react-hot-toast'
import axios from 'axios'


function Makepayment  ()  {
  const[payments,setPayments]=useState([]);
  const[proced,setProced]=useState(false);
  const navigate=useNavigate();
  const[sucess,setSucess]=useState(false);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
    const datas=JSON.parse(localStorage.getItem("cart")) || [];
    if(datas.length===0){
      setPayments([]);
      return;
    }
    const ids=datas.map(item=>item.productId);
    const res=await axios.post("https://backend-lr7e.onrender.com/getproductbyId",{ids});

    const updated=res.data.map(product=>{
      const cartitem=datas.find(c=>c.productId==product._id.toString());
      return{
        ...product,quantity:cartitem?.quantity || 1
      }
    })
    setPayments(updated);
  }
  catch(err){
    console.log(err);
  }
}
  fetchData();
  


  },[])
  const totamount=payments.reduce((sum,item)=>{
    return sum+(item.quantity*item.price);
  },0);
  
  const rightarrow=">";

  const handlepayment=()=>{
    const cod=localStorage.setItem("paymentType",JSON.stringify("cash on delivery")) || [];
    setProced(true);
   

  }
  const handlecancel=()=>{
    setProced(false);
    navigate("/Makepayment")
  }
  const handleproced=()=>{
    try{
    const cod=JSON.parse(localStorage.getItem("paymentType")) || [];     
    const data=JSON.parse(localStorage.getItem("cart")) || [];
    const user=JSON.parse(localStorage.getItem("userstore")) || [];
    const addressget=JSON.parse(localStorage.getItem("address")) || [];
    if(addressget.length===0){
      toast.error("Delivery Address is not selected..!");
      navigate("/OrderReview");
    }else{
    
      const res=axios.post("https://backend-lr7e.onrender.com/ordersave",{
            products:data,
            users:user,
            paymentType:cod,
            deliveryaddress:addressget,

        })
        
        localStorage.removeItem("cart");
        localStorage.removeItem("paymentType")
        localStorage.removeItem("address");
      setTimeout(()=>{
      navigate("/",{state:{showToast:true}});

    },1000)
  }
  }catch(err){
    console.log(err);
  }
    }
  
  return (
    
    <div className='paymentcontainer'>
      <Toaster  position='top-center'/>
      <div className='paymenttop'>
        <div className='paymenttopwhite'>
          <img src={jiobag} alt="jiomartlogo" className='paymenttopimg' />
          <p className='paymenttopP'>Amount payable:{totamount}</p>
        </div>


      </div>
      <div className='paymentbanks'>
        <p className='paymentbanksP'>Netbanking</p>
        <div className='paymentbanksgrid'>
          <img src={sbi} alt="sbi" className='banklogo'/>
          <img src={rbi} alt="rbi" className='banklogo'/>
          <img src={union} alt="union" className='banklogo'/>
          <img src={icici} alt="icici" className='banklogo'/>
          <img src={yes} alt="yes" className='banklogo'/>
          <img src={canara} alt="canara" className='banklogo' />

          
        </div>
        <hr />
      <p className='paymentmore'>More banks</p>
      </div>

      <div className='paymentcredpay'>
        <img src={credpay} alt="credpay" className='credpayimg'/>
        <p className='credpayP'>CRED Pay</p>
        <p className='credpayright'>{rightarrow}</p>
      </div>
      <div className='paymentCOD' onClick={handlepayment}>
        <img src={cash} alt="cashondelivery"  className='paymentcashlogo'/>
        <p className='paymentcashP'>Cash On Delivery</p>
        <p className='paymentright'>{rightarrow}</p>
      </div>
      {proced && (
        <div className='procedmsg'>
          <div className='procedmsgcontainer'>
            <h3 className='procedh3'>Cash On Delivery</h3>
            <p className='procedP'>Do you wish to continue with cash on delivery?</p>
            <button className='procedbtn' onClick={handleproced}>Proceed</button>
            <button className='procedbtn'onClick={handlecancel}>Cancel</button>

          </div>
          </div>
      )}
      
      
    {sucess && (
      <div>
        <Toaster 
        position="top-center"
        reverseOrder={false}
        />
        

      </div>
    )}
    </div>
    

  )
}

export  default Makepayment
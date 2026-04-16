import  { useEffect, useState } from 'react'
import './Cartdetails.css'
import Navigation from './Navigation';
import { useNavigate } from 'react-router';
import axios from 'axios';


function Cartdetails  () {
    const [details,setDetails]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData=async()=>{
            try{
            const cartdata=JSON.parse(localStorage.getItem("cart")) || [];
            if(cartdata.length===0){
                setDetails([]);
                return;
            }
            const ids=cartdata.map(item=>item.productId);
            const res=await axios.post("https://backend-fgbg.onrender.com/getproductbyId",{ids});

            const updatedcart=res.data.map(product=>{
                const cartitem=cartdata.find(c=>c.productId==product._id.toString());
            
            return{
                ...product,
                quantity: cartitem?.quantity || 1
            }
            });
            setDetails(updatedcart);
        }
        catch(err){
            console.log(err);
        }

        }
        fetchData();
    },[])
    const totalAmt=details.reduce((sum,item)=>{
        return sum+(item.price*item.quantity);
    },0)
    const totquantity=details.length;
    const greater=">";
    
    const handleminus=(id)=>{
        let product=JSON.parse(localStorage.getItem("cart"))|| [];
        let updated=product.map((item)=>{
            if(item.productId===id){
                return {
                    ...item,
                    quantity:item.quantity>1?item.quantity-1 : 1
                };

            }
            return item;
    })
    localStorage.setItem("cart",JSON.stringify(updated));
    setDetails(prev =>
        prev.map(item =>
            item._id == id
                ? {
                    ...item,
                    quantity: item.quantity > 1 ? item.quantity - 1 : 1
                }
                : item
        )
    );
    window.dispatchEvent(new Event("cartUpdated"));

    }
    const handleplus=(id)=>{
        let product=JSON.parse(localStorage.getItem("cart")) || [];
        let updated=product.map((item)=>{
            if(item.productId===id){
                return{
                    ...item,
                    quantity:item.quantity+1
                };
            }
            return item;
        })
        localStorage.setItem("cart",JSON.stringify(updated));
         setDetails(prev =>
        prev.map(item =>
            item._id == id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );
        window.dispatchEvent(new Event("cartUpdated"));

    }
    const handlesaveitlater=(id)=>{
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let updated=cart.filter((item)=>item.productId!=id);
        localStorage.setItem("cart",JSON.stringify(updated));
        setDetails(prev=>prev.filter(items=>items._id!=id));
        window.dispatchEvent(new Event("cartUpdated"));
    }
    const handleplace=()=>{
        navigate("/OrderReview")
        
    }
  return (
    <div>
        <Navigation />
        <div className='maincontainer'>
        <div className='cartdetailscontainer'>
        <h2 className='cartdetailsh2'>My Cart</h2>
        <div className='seconddiv'>
         <p className='cartdetailsP'>Scheduled Basket({totquantity})</p>
         <p className='amountleft'>₹ {totalAmt}</p>
        </div>
        <p className='freedel'>Yay! You get Free delivery with this Basket</p>
        {details.map((item)=>(
        <div className='cartproduct' key={item._id}>
            <p className='deliverydate'>Delivery between 23 mar to 26 mar</p>
            <div className='detailspro'>
            <div className='detailspone'>
            <img src={item.image} alt={item.image} width={300} className='cartimage' />
            </div>
            <div className='detailsptwo'>
            <p> {item.name}</p>
            <p>₹ {item.price}</p>
            </div>
            </div>
             <div className='lastline'>
                <div className='lastone'>
                    <p className='lastsave'onClick={()=>handlesaveitlater(item._id)}>save it later</p>
                </div>
                <div className='lasttwo'>
                    <div className='lastright'>
                    <p className='lastRone' onClick={()=>handleminus(item._id)}>-</p>
                    <p className='lastRtwo'>{item.quantity}</p>
                    <p className='lastRthree' onClick={()=>handleplus(item._id)}>+</p>
                    </div>
                </div>
            

         </div>
         
         </div>
         ))}
       


     </div>
     <div className='cartdetailscontainertwo'>
        <div className='twotop'>
            <div>
            <p className='topone'>1</p>
            <p><strong>MyCart</strong></p>
            </div>
            <div>
            <p className='lineone'>_________</p>
            </div>
            <div>
            <p className='toptwo'>2</p>
            <p>OrderReview</p>
            </div>
            <div>
            <p className='linetwo'>__________</p>
            </div>
            <div>
            <p className='topthree'>3</p>
            <p>Payment</p>
            </div>
            
        </div>
        <div className='paymentdiv'>
            <h2 className='paymenth2'>Payment Details</h2>
            
            <div className='paymentone'>
                <p className='payone'>MRP Total</p>
                <p className='paytwo'>₹ {totalAmt+2769}</p>
            </div>
            <hr />
            <div className='paymentone'>
                <p className='payone' >Product Discount</p>
                <p className='paydcount'>-₹{2769}</p>
            </div>
            <hr />
            <div className='paymentone'>
                <p className='payone'>Delivery Fee(Scheduled)</p>
                <p className='payfree'>Free</p>
            </div>
            <hr />
            <div className='paymentone'>
                <p className='payone'>Total</p>
                <p className='paytwo'>₹ {totalAmt}</p>
            </div>
            <p className='paysaved'>You Saved ₹2769</p>
            
        </div>
        <div className='applycoupon'>
            <p className='graphic'>%</p>
            <p className='apply'>Apply Coupon</p>
            <p className='greater'>{greater}</p>
        </div>
        <p className='msglb'>Items in this order will arrive in multiple deliveries</p>
        <button className='btnplace' onClick={handleplace}>Place Order</button>

     </div>
     </div>
    </div>
  )
}

export default Cartdetails

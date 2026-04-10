import React, { useEffect,useState } from 'react'
import './OrderReview.css';
import jiomart from './assets/jiomartlogoo.png';
import pen from './assets/pen.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';



function OrderReview  ()  {
    const[orders,setOrder]=useState([]);
    const[showdetails,setShowdetails]=useState(null);
    const[addres,setAddress]=useState(false);
    const [showform,setShowform]=useState(false);
    const [houseno,setHouseno]=useState("");
    const[buildingno,setBuildingno]=useState("");
    const[homeaddress,setHomeaddress]=useState("");
    const[area,setArea]=useState("");
    const[rname,setRname]=useState("");
    const[message,setMessage]=useState("");
    const[addresstore,setAddresstore]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchData=async()=>{
        try{
        const res=JSON.parse(localStorage.getItem("cart")) || [];
        if(res.length===0){
            setOrder([]);
            return;
        }
        const ids=res.map(item=>item.productId);
        const datas=await axios.post("https://backend-lr7e.onrender.com/getproductbyId",{ids});
        const updateddata=datas.data.map(product=>{
            const cartitem=res.find(c=>c.productId==product._id.toString())
        return{
            ...product,
            quantity:cartitem?.quantity || 1
        }
        })
        setOrder(updateddata)
        }
        catch(err){
            console.log(err);
        }
    }
    fetchData();

    },[])
    const quan=orders.length;
    const totalAmt=orders.reduce((sum,item)=>{
        return sum+(item.quantity*item.price);
    },0)
    const handledetails=(id)=>{
        setShowdetails(prev=>(prev===id?null:id))     

    }
    const handlemakepay=()=>{
        navigate("/Makepayment");
    }
    const handleAddress=()=>{
        setAddress(prev=>!prev);
    }
    const handleNew=()=>{
        setShowform(true);
    }
    const pincode=JSON.parse(localStorage.getItem("pincode")) ||[];
    const usesnum=JSON.parse(localStorage.getItem("userstore")) || [];
    const numbers=usesnum.number;

    const handlesaveaddress=(e)=>{
        e.preventDefault();
        const saveaddres={
            id:Date.now(),
            Rname:rname,
            Rnumber:numbers,
            pincode,
            houseNumber:houseno,
            area:area,
            address:homeaddress,
            building:buildingno,
        }
        const existing=JSON.parse(localStorage.getItem("address")) || [];
        const updated=[...existing,saveaddres];
        localStorage.setItem("address",JSON.stringify(updated));
        setAddresstore(updated);
        toast.success("Address saved..");
        setShowform(false);
        }
    useEffect(()=>{      
       const getaddress=JSON.parse(localStorage.getItem("address")) || [];
       setAddresstore(getaddress);
     },[])
     const savedaddrs=Array.isArray(addresstore)?addresstore:[addresstore];
  return (
    <>
    <div className='ordertop' onClick={()=>setAddress(false)} >
        <Toaster position='top-center '/>
        <img src={jiomart} alt="jiomartlogo"  className='orderimgtop'/>
    </div>
    <div className='ordercontainertop'>
        <h2 className='orderh2'>order Review</h2>
       <div className='orderbone'>
       <div className='orderaddress'>
        <p className='deliveryP'>Delivery Address</p>
        <hr />
        <div className='addressdiv'>
            
            {savedaddrs.length===0 ? (
               <p className='selectP'>Select the Address</p>
            ):(
               savedaddrs.map((add)=>{  
                return(                
                    <div className='addresssavedivhome' key={add.id}>
                        <p className='addresssavename'>{add?.Rname}</p>
                        <p>{add.houseNumber},{add.building},{add.address}</p>
                        <p>{add.area},{add.pincode}</p>
                        <p>{add.Rnumber}</p>

                    </div>
                   
                        )
                    }
                    )
            )}
        
        <img src={pen} alt="pen" className='orderpen' onClick={handleAddress}/>
        
        </div>
       </div>
           {addres && (
            <div className={`addressdivcontainer ${addres?'show':""}`} onClick={()=>setAddress(false)} >
                <div className={`addresscontainer ${addres?'show':""}`}onClick={(e)=>e.stopPropagation()}>
                    {!showform ?(
                    <>
                    <div className='addresstop'>
                    <h2 className='addressh2'>Select Address</h2>
                    <p className='addressP' onClick={()=>setAddress(false)}>X</p>
                    </div>
                    <div className='addresssavemain'>
                    <h4  className='addressh4'>Saved Addresses</h4>
                    {savedaddrs.map((add)=>{  
                        return(                
                    <div className='addresssavediv' key={add.id}>
                        <p className='addresssavename'>{add.Rname}</p>
                        <img src={pen} alt="penedit" className='addresssavepen' />
                        <p>{add.houseNumber},{add.building},{add.address}</p>
                        <p>{add.area},{add.pincode}</p>
                        <p>{add.Rnumber}</p>

                    </div>
                        )
                    }
                    )}
                    </div>

                    <button className='addressbtnn' onClick={handleNew}>+ Add New Address</button>
                    </>
                    ) : (
                        <>
                        <div className='addressaddmain'>
                        <div className='addressaddtop'>
                            <h2 className='addressaddh2'>Add Address</h2>
                            <p className='addressaddP' onClick={()=>setShowform(false)}>X</p>                            
                        </div>
                        <h4 className='addressaddh4'>Address Details</h4>
                        <label htmlFor="pincode" className='addresslabel'>Pincode</label><br />
                        <input type="text" defaultValue={pincode} className='addressinput'/><br />
                        <label htmlFor="houseNO" className='addresslabel'>House No.</label><br />
                        <input type="text" className='addressinput' value={houseno} onChange={(e)=>setHouseno(e.target.value)}/><br />
                        <label htmlFor="Building" className='addresslabel'>Building/Apartment Name</label><br />
                        <input type="text"  className='addressinput'value={buildingno} onChange={(e)=>setBuildingno(e.target.value)}/><br />
                        <label htmlFor="Building" className='addresslabel'>Address *</label><br />
                        <input type="text" className='addressinput' value={homeaddress} onChange={(e)=>setHomeaddress(e.target.value)}/><br />
                        <label htmlFor="Building" className='addresslabel'>Landmark / Area *</label><br />
                        <input type="text" className='addressinput' value={area} onChange={(e)=>setArea(e.target.value)}/><br />
                        </div>
                        <div className='addressaddcontact'>
                            <h2 className='addressaddcontacth2'>Delivery Contact Details</h2>
                            <p className='addressaddcontactP'>This mobile number will receive an OTP, required for collecting the order.</p>
                            <label htmlFor="name" className='addresslabel'>Receivers Name *</label><br />
                            <input type="text" className='addressinput' value={rname} onChange={(e)=>setRname(e.target.value)} /><br />
                            <label htmlFor="number" className='addresslabel'> Receivers Number *</label><br />
                            <input type="text" defaultValue={numbers} className='addressinput'/><br />
                        </div>
                        <button className='addressaddsave' onClick={handlesaveaddress}>Save & Proceed</button>

                        </>
                    )}
                </div>

                
            </div>
        )}
       <div className='schedulediv' >
        <p className='scheduleorder'>Schedule({quan})</p>
        <p className='priceorder'>₹{totalAmt} </p>

       </div>
       {orders.map((items)=>(
       <div className='productsorder' key={items._id}>
        <p className='deliverymsg'>Delivery by Mar 23</p>
        <div className='arrowdiv'>
            <p className='orderprice'>₹{items.price*items.quantity}</p>
            <p className='arrow' onClick={()=>{handledetails(items._id)}}>{showdetails===items._id?"^":"v"}</p>
        </div>
        <div className='secretdetails'>
        <img src={items.image} alt={items.image} width={100}  height={100} className='ordersimg'/>
        {showdetails===items._id &&(
        <div className='secretdetailsone' key={items._id}>
        <p>{items.name}</p>
        <p>{items.price}</p>
        
        </div>
        )}
        </div>
       </div>
       ))}
       </div>
       <div className='orderbtwo'>
        <div className='ordersecondtop'>
            <div>
            <p className='secondone'>✔</p>
            <p>My Cart</p>
            </div>
            <div>
            <p className='lines'>_________</p>
            </div>
            <div>
            <p className='secondtwo'>2</p>
            <p><strong>Order Review</strong></p>
            </div>
            <div>
            <p className='linesnext'>________</p>
            </div>
            <div>
            <p className='secondthree'>3</p>
            <p>Payment</p>
            </div>
        </div>
        <div className='orderamount'>
            <h2 className='orderh2'>Payment Details</h2>
            <div className='orderpayone'>
                <p>MRP Total</p>
                <p>₹{totalAmt+2769}</p>
            </div>
            <hr />
            <div className='orderpaytwo'> 
                <p>Product Discount</p>
                <p className='orderpaydiscount'>-2769</p>
            </div>
            <hr />
            <div className='orderpaythree'>
                <p>Delivery Fee (Scheduled)</p>
                <p className='orderpayfree'>FREE</p>
            </div>
            <hr />
            <div className='orderpayfour'>
                <p>Total</p>
                <p>₹{totalAmt}</p>
            </div>
            <hr />
            <p className='orderpaysave'>you saved ₹2769</p>

        </div>
        <button className='orderbtn' onClick={handlemakepay}>Make Payment</button>
       

        
       </div>
    </div>
    </>
  )
}

export default OrderReview

import React, { useEffect, useState } from 'react'
import './Orders.css';
import Adminhome from './Adminhome';
import axios from 'axios';


function Orders ()  {
    const [order ,setOrders]=useState([]);
    const [hoverid,setHoerId]=useState(null);
    const[addresshover,setAddresshover]=useState(null);
    const[address,setAddress]=useState([]);
    useEffect(()=>{
        const fetchorder=async()=>{
        const res=await axios.get("https://backend-lr7e.onrender.com/getorder");
        setOrders(res.data);
        }
        fetchorder();

    },[])
   
    
    
   
  return (
    <div className='adminorder' >
        <div className='adminorderleft'>
        <Adminhome/>
        </div>
        <div className='adminordercontainer'>
            <h2 className='adminorderh2'>OrderDetails</h2>
            
                <table className='adminordertable'>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Totalproducts</th>
                            <th>Total</th>
                            <th>Order Time</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>view</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map ( (item)=>{
                        return (                          
                        <tr key={item._id}>

                            <td>{item.users[0]?._id}</td>
                            <td onMouseEnter={()=>setHoerId(item._id)}
                            onMouseLeave={()=>setHoerId(null)}
                            className={hoverid===item._id?"active":""}
                            style={{cursor:"grab", position:"relative"}}>
                            {item.products.length}
                            {hoverid===item._id && (
                                <div className='hoverbox'>
                                    {item.products.map((prod,index)=>(
                                    <div className='hoveritem' key={index}>
                                        <img src={prod.image} alt={prod.image} className='hoverimage' width={200} />
                                        <div className='hoverP'>
                                            <p className='hovernameP'>{prod.name} ({prod.quantity})</p>
                                            <p className='hoverpriceP'>{prod.price}</p>
                                            <p className='hoverpriceP'>{prod.category}</p>
                                            
                                        </div>

                                    </div>
                                    ))}
                                </div>

                            )}
                            </td>
                            <td>{item.totalamount}</td>
                            <td>{item.createdAt}</td>
                            <td onMouseEnter={()=>setAddresshover(item._id)}
                                onMouseLeave={()=>setAddresshover(null)}
                                className={addresshover===item._id?"active":""}
                                style={{cursor:"grab",position:"relative"}}>
                                {item.deliveryaddress[0]?.area}
                                {addresshover===item._id &&(
                                    <div className='addresshover'>
                                        {item.deliveryaddress.map((addrs,add)=>(
                                            <div className='addresshoveritem' key={add}>
                                                <p className='addresshoverP'>{addrs.Rname}</p>
                                                <p className='addresshoverPP'>{addrs.houseNumber},{addrs.building}</p>
                                                <p className='addresshoverPP'>{addrs.address},{addrs.area}</p>
                                                <p className='addresshoverPP'>{addrs.Rnumber}-{addrs.pincode}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                </td>
                            <td>{item.users[0]?.phone}</td>
                            <td><button>VIEW</button></td>

                        </tr>
                        )
                        })}
                    </tbody>
                </table>
            

        </div>
      
    </div>
  )
}

export default Orders
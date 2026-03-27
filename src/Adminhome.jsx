import React from 'react'
import './Adminhome.css'
import home from './assets/home.svg';
import product from './assets/product.svg';
import orderss from './assets/orders.svg';
import category from './assets/category.svg';
import users from './assets/users.svg';
import logout from './assets/logout.svg';
import { useNavigate } from 'react-router';


function Adminhome  ()  {
    const navigate=useNavigate();
    const handleproductsclick=()=>{
        navigate("/AddItems");
    }
    const handleorders=()=>{
        navigate("/Orders");
    }
    const handlelogout=()=>{
        navigate("/");
    }
  return (
    <div>
    <div className='adminhomecontainer'>
        <div className='adminhomeleft'>
            <h3 className='adminlefth2'>Admin Home</h3>
            <div className='adminleftoptions'>
                <div className='adminleftoptionone'>
                    <img src={home} alt="homelogo" className='adminleftimg'/>
                    <p className='adminleftP'>Dashboard</p>
                </div>
                <div className='adminleftoptionone' onClick={handleproductsclick}>
                    <img src={product} alt="homelogo" className='adminleftimg'/>
                    <p className='adminleftP'>Products</p>
                </div>
                <div className='adminleftoptionone' onClick={handleorders}>
                    <img src={orderss} alt="homelogo" className='adminleftimg'/>
                    <p className='adminleftP'>Orders</p>
                </div>
                <div className='adminleftoptionone'>
                    <img src={category} alt="homelogo" className='adminleftimg'/>
                    <p className='adminleftP'>Category</p>
                </div>
                <div className='adminleftoptionone'>
                    <img src={users} alt="homelogo" className='adminleftimg'/>
                    <p className='adminleftP'>Users</p>
                </div>
                <div className='adminleftoptionone' onClick={handlelogout}>
                    <img src={logout} alt="homelogo" className='adminleftimglog' />
                    <p className='adminleftP'>logout</p>
                </div>
            </div>             
            <div className='adminhomeright'></div>
        </div>
      
    </div>
    </div>
  )
}

export default Adminhome
 
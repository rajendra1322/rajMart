import React from 'react'
import './Edit.css'
import left from './assets/left.svg'
import { Navigate, useNavigate } from 'react-router'


function Edit(){
    const navigate=useNavigate();
  return (
    
        <div className='edit'>
            <div className='inputspace'>
            <img src={left} alt="left arrow" className='editleft' onClick={()=>navigate(-1)}/>
            <h2 className='editheadding'>Update Product</h2>
            <label htmlFor="editname">Product Name</label><br />
            <input type="text" className='editpname'  /><br />
            <label htmlFor="editquantity">Quantity</label><br />
            <input type="number" className='editquantity' /><br />
            <label htmlFor="editprice">Price</label><br />
            <input type="text" className='editprice' /><br />
            <label htmlFor="url"></label><br />
            <input type="file" className='editimageurl'/>
            </div>
            <p></p>
            <button className='Editbutton'>Edit</button>
            </div>

       
        
        
      
    
  )
}

export default Edit
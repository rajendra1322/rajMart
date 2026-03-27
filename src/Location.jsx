
import { useState } from "react";
import "./Location.css"
import message from "/home/rajendra/dregali/workspace/jioMart/src/assets/message-solid-full.svg"

function Location() {
    
    return (
       <div className="outerlayer">
        <div className="innerlayer">
            <h1 className="textD">Select Delivery Location</h1>
            <button className="btnX">X</button>
            <p>Sign in or set delivery location to see product availability, offers and discounts.</p>
            <button>Sign In to select address</button>


        </div>
       </div> 
    );
    
}
export default Location
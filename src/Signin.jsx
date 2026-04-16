import { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Otp from "./Otp";

function Signin(props) {

    
    const[number,setNumber]=useState("");
    const[message,setMessage]=useState("");
    const[email,setMail]=useState("");
    const[showotp,setShowopt]=useState(false);
    const isvalid=number.length===10;
    const navigate=useNavigate();
    

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
        const res= await axios.post("https://backend-fgbg.onrender.com/signin",{number,email});
        setMessage(res.data.message);

        if(res.data.message==="OTP sent successfully"){
            setNumber("");
            setShowopt(true);
            
            

        }
        

        
        }catch(err){
            console.log(err);
            console.log("server error..");
        }
    }

    const onotpSubmit=(otp)=>{
        console.log("sucessfully send ",otp);
    }

    


    return (
        <>
        { !showotp ? (<form onSubmit={handleSubmit}>
            <div className="container">

                <Link to="/">

                    <div className="close">X</div>
                </Link>
                <h2>Almost there!</h2>
                <p className="firstp">Simply sign in to place your order</p>
                <div className="label">
                    <label htmlFor="number" className="labeled">Mobile Number</label><br />
                    <input
                        type="text"
                        className="num"
                        placeholder="+91-"
                        value={number}
                        maxLength={10}
                        onChange={(e)=>setNumber(e.target.value.replace(/\D/g,""))}
                        
                    />
                    {message && <p className="message">{message}</p>}
                </div>
                    <div className="labelmail">
                    <label htmlFor="email" className="labeled">Email </label><br />
                    <input
                        type="text"
                        className="num"
                        placeholder="xxxx@gmail.com"
                        value={email}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    {message && <p className="message">{message}</p>}
                    

                </div>

                <div className="footer">
                    <p className="footerp">By signing in, you agree to our <a>Terms and Conditions of Use</a>and <a >Privacy Policy.</a></p>
                    <button type="submit" disabled={!isvalid} className={`btn ${isvalid ? "enabled" : ""}`}>Sign In </button>

                </div>


            </div>
        </form> ) : ( 
            
            <Otp length={6} onotpSubmit={onotpSubmit} email={email} />
        )}  

        </> 
        

    );

}
export default Signin
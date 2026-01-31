import "./Signin.css";
import { Link } from "react-router-dom";
function Signin(){

    return (
        
        <div className="container">
            <Link to="/">

            <div className="close">X</div>
            </Link>
            <h2>Almost there!</h2>
            <p className="firstp">Simply sign in to place your order</p>
            <div className="label">
            <label htmlFor="number" className="labeled">Mobile Number</label><br />
            <input type="phone" className="num" placeholder="+91-" />
            </div>
            
            <div className="footer">
                <p className="footerp">By signing in, you agree to our <a>Terms and Conditions of Use</a>and <a >Privacy Policy.</a></p>
                <button className="btn">Sign In </button>
            
            </div>
            

        </div>
       
    );

}
export default Signin
import logo from "./assets/jiomartlogoo.png"
import search from "./assets/search.svg"
import hamburger from "./assets/hamburger.svg"
import shopping from "./assets/shopping.svg"
import user from "./assets/user.svg"
import "./Navigation.css"
import Signin from "./signin"
import { Link } from "react-router-dom"


function Navigation(){
    return(
        
            <nav className="navbar">
    <div className="navbarleft">
        <Link to="/">
       <img src={logo} alt="jiomartlogo" className="logoleft" />
       </Link>
        
    </div>
    <div className="navbarmiddle">



    
    <div className="middlemain">
        
        <div className="search">
            <img src={search} alt="search" className="searchicons" />

        </div>
        <div className="text">
            <input type="text" placeholder="Search In JioMart" className="searchtext" />


        </div>
        
        <div className="hamburger">
            <img src={hamburger} alt="hamicon" className="iconham" />

        </div>
    
    
    </div>
    <div className="rightmain">
    <div className="rightnav" >
        <div className="shopp">
            <img src={shopping} alt="shopping" className="shopping" />

        </div>
        <div className="userlogo">
        
         <img src={user} alt="user" className="user" />
         
      <Link to="/signin">
      <span className="intext">SignIn</span>
       </Link>
       
      </div>
      </div>
    
     </div>
     </div>
     </nav>
        
    );

}

export default Navigation
import logo from "./assets/jiomartlogoo.png"
import search from "./assets/search.svg"
import hamburger from "./assets/hamburger.svg"
import shopping from "./assets/shopping.svg"
import user from "./assets/user.svg"
import "./Navigation.css"
import { data, Link, useLocation, useNavigate } from "react-router-dom"
import livenow from "./assets/livenow.png"
import every from "./assets/everything.webp"
import home from "./assets/home.webp"
import happy from "./assets/first.webp"
import fashion from "./assets/second.webp"
import phone from "./assets/third.webp"
import appliances from "./assets/fourth.webp"
import groceries from "./assets/fifth.webp"
import nine from "./assets/sixth.webp"
import global from "./assets/seven.webp"
import mb from "./assets/milk.webp"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import pin from "./assets/locationnn.svg"
import locationn from "./assets/locationn.svg"
import bag from './assets/spbag.webp';


function Navigation() {
    const navigatee = useNavigate();
    var settings = {
        dots: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1

    };
    const [showLocation, setshowLocaiton] = useState(false);
    const [showcart, setShowcart] = useState(false);
    const [cart, setCart] = useState([]);
    const [showpincode, setShowpincode] = useState(false);
    const [eemail, setEmail] = useState("");
    const location=useLocation();
    useEffect(() => {
        const fetchData = async() => {
            try{
            const localdatas = JSON.parse(localStorage.getItem("cart")) || [];
            if(localdatas.length===0){
                setCart([]);
                return;
            }
            const ids=localdatas.map(item=>item.productId);
            const res=await axios.post("https://backend-lr7e.onrender.com/getproductbyId",{ids});

            const updatedcart=res.data.map(product=>{
                const cartItem=localdatas.find(c=>c.productId==product._id.toString());
            
            return{
                ...product,
                quantity: cartItem.quantity
            }
            });
            setCart(updatedcart);
        }
        catch(err){
            console.log(err)
        }
            

        };
        fetchData();
        window.addEventListener("cartUpdated", fetchData);
        return () => { window.removeEventListener("cartUpdated", fetchData) };
    }, [])

    const totalAmount = cart.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
    }, 0);
    const totalQuantity = cart.length;
    const toggleCart = () => {
        setShowcart((prev) => !prev);
        window.dispatchEvent(new Event("updatedCart"));
    }

    const handlepinclick = (e) => {
        e.preventDefault();
        setShowpincode(true);
    }
    const [pinn, setPinc] = useState("");
    const isValid = pinn.length === 6;
    const handlepinsave = (e) => {
        e.preventDefault();
        try {
            localStorage.setItem("pincode", pinn);
            window.dispatchEvent(new Event("updatedCart"));

            navigatee("/");
            setShowpincode(false);
            setshowLocaiton(false);

        } catch (err) {
            console.log(err);
        }

    }

    const currentpin = localStorage.getItem("pincode");
    let place;
    if (currentpin >= 560001 && currentpin <= 562101) {

        place = "Bangalore..";
    }
    else if (currentpin >= 574201 && currentpin <= 575001) {
        place = "Dakshina.."
    }

    const handleCart = () => {
        navigatee("/Cartdetails");
    }

    

    useEffect(() => {

        async function fetchData() {
            try {
                const getgmail = await axios.get('https://backend-lr7e.onrender.com/getuser',)
                const userEmail=getgmail.data[0];
                if (userEmail) {
                    setEmail(userEmail);

                    localStorage.setItem("userstore",JSON.stringify(userEmail));
                    window.dispatchEvent(new Event("updatedCart"));
                    
                    
                    
                }


            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    
    useEffect(()=>{
        const mail=JSON.parse(localStorage.getItem("userstore"));
        if(mail){
            setEmail(mail);
            
            
        }
    },[])
    useEffect(()=>{
        
        if(location.state?.showToast){
            toast.success("product placed sucessfully...");
            navigatee(".", { replace: true, state: null });
            
        }
    },[location,navigatee])

    const handleAccount=()=>{
        navigatee("/Useraccount");
    }
    
   


    return (
        <>

            <nav className="navbar">
                <div className="main">
                    <div className="navbarleft">
                        <Link to="/">
                        <div className="jiologorajmart">
                            <img src={bag} alt="jiomartlogo" className="logoleft" />
                            <p className="jiologoname">RajMart</p>
                        </div>
                        </Link>

                    </div>
                    <div className="navbarmiddle">
                        <div className="middlemain">

                            <div className="search">
                                <img src={search} alt="search" className="searchicons" />

                            </div>
                            <div className="text">
                                <input type="text" placeholder="Search In RajMart" className="searchtext" />


                            </div>

                            <div className="hamburger">
                                <img src={hamburger} alt="hamicon" className="iconham" />

                            </div>


                        </div>
                        <div className="rightmain">
                            <div className="rightnav" >
                                <div className="shopp" onClick={toggleCart}>
                                    <img src={shopping} alt="shopping" className="shopping" />
                                    {totalQuantity > 0 && (
                                        <span className="quantityspan">{totalQuantity}</span>
                                    )}
                                    {showcart && (
                                        <div className="addoverlay">
                                            <div className="addpopup">
                                                <div className="addheadding">
                                                    <p className="addheaddingP">cart name</p>
                                                    <p>({totalQuantity}) Items</p>

                                                </div>

                                                {cart.map((item) => (
                                                    <div className="addpopupheader" key={item._id}>
                                                        <p className="addname">{item.name}</p>
                                                        <p className="addprice">{item.quantity}X{item.price}</p>

                                                    </div>


                                                ))}
                                                <div className="addtotaldiv">
                                                    <p className="addtotal">Total amount to be paid:</p>
                                                    <p className="addtotalamount">    {totalAmount}</p>


                                                </div>
                                                <button className="addtobtn" onClick={handleCart}>Proceed to Cart</button>

                                            </div>
                                        </div>
                                    )}

                                </div>
                                

                                    
                                    {eemail ? (
                                        
                                        <span className="firstletter" onClick={handleAccount}>
                                            {eemail?.email.charAt(0).toUpperCase() || "M"}
                                        </span>
                                        
                                    ):(
                                    <Link to="/Signin">
                                        <div className="userlogo">
                                        <img src={user} alt="user" className="user" />
                                        <span className="intext">SignIn</span>
                                        </div>
                                    </Link>
                                    )}

                                

                                <Link to="/Admin">                                    
                                    <span className="admin">Admin</span>
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </nav>

            <div className="location" onClick={() => setshowLocaiton(true)}>
                <p className="deliveryText">Scheduled delivery to:
                    <strong> {place}{currentpin}</strong>

                    <span className="arrow">▼</span>

                </p>




            </div>
            {showLocation && (
                <div className="overlay">
                    <div className="popup">
                        <div className="popupheader">
                            <h1 className="header">Select Delivery Location</h1>
                            <span className="spanX" onClick={() => setshowLocaiton(false)}>X</span>
                        </div>
                        <p className="pL">Sign in or set delivery location to see product availability, offers and discounts.</p>
                        <button className="locbtn">Sign In to select address</button>

                        <div className="pincodediv">
                            <img src={pin} alt="pincode" className="locationimg" />
                            <a href="/" className="atag" onClick={handlepinclick}>Enter a pincode</a>
                        </div>
                        <div className="locationdiv">
                            <img src={locationn} alt="pincode" className="locationimg" />
                            <a href="/" className="atag">Direct My Location</a>
                        </div>
                    </div>
                </div>
            )}
            {showpincode && (
                <div className="overlay">
                    <div className="popup">
                        <div className="popupincode">
                            <h2 className="h2pin">Enter PIN Code</h2>
                            <p className="ppin">Enter PIN code to see product availability, offers and discounts.</p>
                            <p className="ppinn">Pin code</p>
                            <input type="text" placeholder="Enter your pincode" className="inputpin" value={pinn} onChange={(e) => setPinc(e.target.value)} maxLength={6} />
                            <button className={`btnpin ${isValid ? "enabled" : ""}`} onClick={handlepinsave} >Apply</button>

                        </div>
                    </div>
                </div>

            )}

            <div className="topplaces">
                <Slider {...settings}>
                    <div className="itemstop">
                        <img src={livenow} alt="livenow logo" className="imagetop" />
                        <a href="/" className="atop">Live Now</a>
                    </div>
                    <div className="itemstop">
                        <img src={every} alt="" className="imagetop" />
                        <a href="/" className="atop">Everything store</a>
                    </div>
                    <div className="itemstop">
                        <img src={home} alt="" className="imagetop" />
                        <a href="/" className="atop">Home&Styles</a>
                    </div>
                    <div className="itemstop">
                        <img src={happy} alt="" className="imagetop" />
                        <a href="/" className="atop">Happy Hour Sale</a>
                    </div>
                    <div className="itemstop">
                        <img src={fashion} alt="" className="imagetop" />
                        <a href="/" className="atop">Fashion</a>
                    </div>
                    <div className="itemstop">
                        <img src={phone} alt="" className="imagetop" />
                        <a href="/" className="atop">Smartphone</a>
                    </div>
                    <div className="itemstop">
                        <img src={appliances} alt="" className="imagetop" />
                        <a href="/" className="atop">Electronics</a>
                    </div>
                    <div className="itemstop">
                        <img src={groceries} alt="" className="imagetop" />
                        <a href="/" className="atop">Groceries</a>
                    </div>
                    <div className="itemstop">
                        <img src={nine} alt="" className="imagetop" />
                        <a href="/" className="atop">99To999</a>
                    </div>
                    <div className="itemstop">
                        <img src={global} alt="" className="imagetop" />
                        <a href="/" className="atop">Global Store</a>
                    </div>
                    <div className="itemstop">
                        <img src={mb} alt="" className="imagetop" />
                        <a href="/" className="atop">Milkbasket</a>
                    </div>
                </Slider>
            </div>
            <div className="hrline">
            </div>


        </>
    );

}

export default Navigation
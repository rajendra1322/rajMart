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
import MapPicker from "./Mappicker"


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
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const localdatas = JSON.parse(localStorage.getItem("cart")) || [];
                if (localdatas.length === 0) {
                    setCart([]);
                    return;
                }
                const ids = localdatas.map(item => item.productId);
                const res = await axios.post("https://backend-fgbg.onrender.com/getproductbyId", { ids });

                const updatedcart = res.data.map(product => {
                    const cartItem = localdatas.find(c => c.productId == product._id.toString());

                    return {
                        ...product,
                        quantity: cartItem.quantity
                    }
                });
                setCart(updatedcart);
            }
            catch (err) {
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
    const isVaild = cart.length > 0;
    const toggleCart = () => {
        setShowcart((prev) => !prev);
        window.dispatchEvent(new Event("updatedCart"));
    }

    const handlepinclick = (e) => {
        e.preventDefault();
        setShowpincode(true);
        setshowLocaiton(false);
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



    async function fetchData() {
        try {
            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "https://backend-fgbg.onrender.com/getuser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data) {
                setUserData(res.data);
            }

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {

        if (location.state?.showToast) {
            toast.success("product placed sucessfully...");
            navigatee(".", { replace: true, state: null });

        }
    }, [location, navigatee])

    const handleAccount = () => {
        navigatee("/Useraccount");
    }

    const [mapLocation, setmapLocation] = useState(null);

    const getAddress = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();
            return data.display_name || "Address not found";
        } catch (err) {
            console.log(err);
            return "Error fetching address";
        }
    };

    
    const [loading, setLoading] = useState(false);
    const handleSave = async () => {
        if (!mapLocation) {
            alert("Please select location on map");
            return;
        }

        setLoading(true);

        const addr = await getAddress(mapLocation.lat, mapLocation.lng);

        setAddress(addr);

        localStorage.setItem("userAddress", addr);
        localStorage.setItem("userLocation", JSON.stringify(mapLocation));

        setLoading(false);
    };
    const handleContinue = () => {
        setshowLocaiton(false);

        
    };
    const [address, setAddress] = useState("");
    useEffect(() => {
        const savedAddress = localStorage.getItem("userAddress");
        const savedLocation = localStorage.getItem("userLocation");

        if (savedAddress && savedLocation) {
            setAddress(savedAddress);
            setmapLocation(JSON.parse(savedLocation));
        }
    }, []);






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
                                                <button className={`addtobtn ${isVaild ? "enabled" : ""}`} onClick={handleCart} disabled={!isVaild} >Proceed to Cart</button>

                                            </div>
                                        </div>
                                    )}

                                </div>



                                {userData ? (

                                    <span className="firstletter" onClick={handleAccount}>
                                        {userData?.email?.charAt(0).toUpperCase() || "M"}
                                    </span>

                                ) : (
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

            <div className="location" onClick={() => {setshowLocaiton(true)}}>
                <p className="deliveryText">Scheduled delivery to:
                    <strong> {place}{currentpin}</strong>

                    <span className="arrow">▼</span>

                </p>




            </div>
            {showLocation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="w-[420px] bg-white rounded-2xl shadow-xl p-5">

                       
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">
                                Select Delivery Location
                            </h2>
                            <button
                                onClick={() => setshowLocaiton(false)}
                                className="text-gray-500 hover:text-black text-lg"
                            >
                                ✕
                            </button>
                        </div>

                       
                        <p className="text-sm text-gray-600 mb-4">
                            Set your delivery location to check availability, offers and discounts.
                        </p>

                       
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-lg mb-3">
                            Sign In to select address
                        </button>

                        
                        <div className="flex items-center my-3">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="px-2 text-gray-500 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        
                        <div
                            onClick={handlepinclick}
                            className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-100 mb-3"
                        >
                            <img src={pin} alt="pin" className="w-5 h-5" />
                            <span className="text-sm font-medium">
                                Enter a pincode
                            </span>
                        </div>

                        
                        <div className="border rounded-lg p-3">
                            <div className="h-[200px] rounded-md overflow-hidden mb-3">
                                <MapPicker setLocation={setmapLocation} />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!mapLocation || loading}
                                className={`w-full py-2 rounded-lg font-medium ${mapLocation
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? "Fetching Address..." : "Use This Location"}
                            </button>
                        </div>

                       
                        {address && (
                            <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                                <p className="text-sm font-semibold mb-1">
                                    Selected Address:
                                </p>
                                <p className="text-sm text-gray-700 break-words">
                                    {address}
                                </p>

                                <button
                                    onClick={handleContinue}
                                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
                                >
                                    Continue
                                </button>
                            </div>
                        )}

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
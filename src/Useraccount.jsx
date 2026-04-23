import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import './Useraccount.css'
import users from './assets/users.svg';
import axios from 'axios';
import myorders from './assets/myorder.svg'
import heart from './assets/heart.svg'
import mylist from './assets/mylist.svg'
import location from './assets/locationnn.svg'
import pan from './assets/pan.svg';
import legal from './assets/legal.svg'
import about from './assets/about.svg'
import logout from './assets/logout.svg'
import { flushSync } from 'react-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useSearchParams } from "react-router-dom";





function Useraccount() {
    const [myaccountdown, setMyaccountdown] = useState(null);
    const [myorder, setMyorder] = useState(false);
    const [accountdtl, setAccountdtl] = useState(true);
    const [orders, setOrders] = useState([]);
    const [userdtl, setUserdtl] = useState(null);
    const navigate = useNavigate();
    const greater = ">";
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const handledownarrow = (section) => {
        if (myaccountdown === section) {
            setMyaccountdown(null);
        }
        else {
            setMyaccountdown(section);
        }

    }
    useEffect(() => {
        async function fetchdata() {
            const token = localStorage.getItem("token");

            const res = await axios.get("https://backend-fgbg.onrender.com/myorders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOrders(res.data);

        }
        fetchdata();
    }, [])



    useEffect(() => {
        async function fetchdata() {
            try {
                const token = localStorage.getItem("token");

                const userRes = await axios.get(
                    "https://backend-fgbg.onrender.com/getuser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUserdtl(userRes.data);

            } catch (err) {
                console.log(err);
            }
        }

        fetchdata();
    }, []);


    const handlemyorder = () => {
        setAccountdtl(false);
        setMyorder(true);


    }
    const address = JSON.parse(localStorage.getItem("address") || "[]");
    const defaultaddress = address[0] || null;

    const handleinformationon = () => {
        setAccountdtl(true);
        setMyorder(false);
    }

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();

            toast.success("Logged out successfully");

            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    };
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (!orderId) return;

        const token = localStorage.getItem("token");

        if (!token) {
            navigate(
                `/Signin?redirect=${encodeURIComponent(`/Useraccount?orderId=${orderId}`)}`
            );
            return;
        }

        const fetchOrder = async () => {
            try {
                const res = await axios.get(
                    `https://backend-fgbg.onrender.com/public/order/${orderId}`
                );
                setOrder(res.data);
            } catch (err) {
                console.log("QR Fetch Error:", err);
            }
        };

        fetchOrder();
    }, [orderId, navigate]);



    return (
        <div>
            <Navigation />
            <div className='useraccountcontainer'>
                <div className='useraccountpartone'>
                    <h2 className='useraccounth2'>My Account</h2>
                    <div className='useraccountbone'>
                        <div className='useraccountbonetop' onClick={handleinformationon}>
                            <img src={users} alt="userlogo" className='useraccountimg' />

                            <div className='useraccountbonetopone'>
                                <p className='useraccountname'>{defaultaddress?.Rname}</p>
                                <p className='useraccountmail'>{userdtl?.email}</p>
                                <p className='useraccountnum'>{userdtl?.number}</p>
                            </div>

                            <p className='useraccountgreater'>{greater}</p>
                        </div>


                        <div className='useraccountmyaccount' onClick={() => handledownarrow("payment")}>
                            <p className='useraccountmyaccountoptions'>My account</p>
                            <p className={`greaterdown ${myaccountdown === "payment" ? "open" : ""}`}>{greater}</p>
                        </div>
                        {myaccountdown === "payment" && (
                            <div className='myaccountoptions'>
                                <div className='myaccountoptionone' onClick={handlemyorder}>
                                    <img src={myorders} alt="orderimg" className='orderimages' />
                                    <p className='myaccountname'>My Orders</p>
                                </div>

                                <div className='myaccountoptionone' >
                                    <img src={heart} alt="wishlist" className='orderimages' />
                                    <p>Wishlist</p>
                                </div>
                                <div className='myaccountoptionone'>
                                    <img src={mylist} alt="mylist" className='orderimages' />
                                    <p>My List</p>
                                </div>
                                <div className='myaccountoptionone'>
                                    <p className='couponorder'>%</p>
                                    <p>Coupons</p>
                                </div>
                                <div className='myaccountoptionone'>
                                    <img src={location} alt="delivery address" className='orderimages' />
                                    <p>Deliverry Addresses</p>
                                </div>
                                <div className='myaccountoptionone'>
                                    <img src={pan} alt="pan card" className='orderimages' />
                                    <p>PAN Card Information</p>
                                </div>
                            </div>
                        )}
                        <div className='useraccountmyaccount'>
                            <p className='useraccountmyaccountoptions'>Payment Modes</p>
                            <p className='greaterdown'>{greater}</p>
                        </div>
                        <div className='useraccountmyaccount'>
                            <p className='useraccountmyaccountoptions'>Helps & Support</p>
                            <p className='greaterdown'>{greater}</p>
                        </div>
                        <div className='useraccountmyaccount'>
                            <p className='useraccountmyaccountoptions'>Offers & Discounts</p>
                            <p className='greaterdown'>{greater}</p>
                        </div>
                        <div className='useraccountmyaccount' onClick={() => handledownarrow("more")}>
                            <p className='useraccountmyaccountoptions'>More Information</p>
                            <p className={`greaterdown ${myaccountdown === "more" ? "open" : ""}`}>{greater} </p>
                        </div>
                        {myaccountdown === "more" && (
                            <div className='myaccountoptions'>

                                <div className='myaccountoptionone'>
                                    <img src={about} alt="about jiomart" className='orderimages' />
                                    <p>About us</p>
                                </div>
                                <div className='myaccountoptionone'>
                                    <img src={legal} alt="delivery address" className='orderimages' />
                                    <p>Legal Information</p>
                                </div>
                                <div className='myaccountoptionone' onClick={handleLogout}>
                                    <img src={logout} alt="pan card" className='orderimageslogout' />
                                    <p>Sign Out</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                <div className='useraccountbtwo'>
                    {accountdtl && (
                        <div>
                            <h2 className='useraccounttwoh2'>Account Information</h2>
                            <div className='usertwobox'>
                                <div className='usertwodetails'>
                                    <p className='usertwoname'>Full Name</p>
                                    <p className='usertwovalue'>{defaultaddress?.Rname}</p>
                                </div>
                                <div className='usertwodetails'>
                                    <p className='usertwoname'>Email ID</p>
                                    <p className='usertwovalue'>{userdtl?.email}</p>
                                </div>
                                <div className='usertwodetails'>
                                    <p className='usertwoname'>Mobile No.</p>
                                    <p className='usertwovalue'>{userdtl?.number}</p>
                                </div>
                                <div className='usertwodetails'>
                                    <p className='usertwoname'>Default Address</p>
                                    {defaultaddress ? (
                                        <p className='usertwovalue'> {defaultaddress?.Rname},{defaultaddress.houseNumber},{" "}
                                            {defaultaddress.building},{defaultaddress.address},{" "}
                                            {defaultaddress.area}-{defaultaddress.pincode}.
                                        </p>
                                    ) : (
                                        <p>no address </p>
                                    )}
                                </div>



                                <button className='btnedit'>Edit</button>
                            </div>

                        </div>
                    )}
                    <>
                        {order ? (
                            // ✅ QR Scanned Order
                            <div className='myorderproducts'>
                                <p className='myorderstatus'>Scanned Order</p>

                                {order.products?.map((product) => (
                                    <div className='myorderproddetails' key={product.id}>
                                        <img src={product.image} className='myorderimage' />

                                        <div>
                                            <p>{product.name}</p>
                                            <p>Qty: {product.quantity}</p>
                                            <p>₹ {product.price}</p>
                                        </div>
                                    </div>
                                ))}

                                <p>Total: ₹ {order.totalamount}</p>
                                <p>Status: {order.status}</p>
                            </div>

                        ) : myorder ? (
                            // ✅ Normal Orders List
                            <div className='myorder'>
                                <div className='myorderdivtop'>
                                    <p className='myordertop'>My Orders</p>
                                    <p className='myordertopone'>Refunds</p>
                                </div>

                                {orders.map((order) => (
                                    <div className='myorderproducts' key={order._id}>
                                        <p className='myorderstatus'>{order.status}</p>

                                        {order.products?.map((product) => (
                                            <div className='myorderproddetails' key={product._id}>
                                                <img src={product.image} className='myorderimage' />

                                                <div className='myorderproone'>
                                                    <p className='myorderone'> {product.category}</p>
                                                    <p className='myordertwo'>{product.name}</p>
                                                    <p className='myorderthree'>  {product.quantity} Items</p>
                                                    <p className='myorderthree'>₹ {order.totalamount}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <button className='myorderbtn'>cancel</button>
                                    </div>
                                ))}
                            </div>

                        ) : null}

                    </>



                </div>

            </div>
        </div>
    )
}

export default Useraccount

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



                <div className="useraccountbtwo w-2/3">

  {/* ================= QR SCANNED MODE ================= */}
  {order ? (
    <div className="bg-white p-5 rounded-xl shadow mt-[100px] ml-[20px]">

      <h2 className="text-lg font-semibold text-purple-600 mb-4 mr-[30px]">
        Scanned Order
      </h2>

      {order.products?.map((product) => (
        <div key={product.id} className="flex gap-4 items-center border-b py-3">

          <img
            src={product.image}
            className="w-16 h-16 rounded object-cover"
          />

          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {product.quantity}
            </p>
            <p className="text-sm font-semibold">
              ₹{product.price}
            </p>
          </div>

        </div>
      ))}

      <div className="mt-4 font-bold">
        Total: ₹{order.totalamount}
      </div>

      <p className="text-gray-600">
        Status: {order.status}
      </p>

    </div>
  ) : (
    <>
      {/* ================= NORMAL MODE ================= */}

      {/* ACCOUNT INFORMATION */}
      {accountdtl && (
        <div className="bg-white p-5 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Account Information
          </h2>

          <p>Full Name: {defaultaddress?.Rname}</p>
          <p>Email ID: {userdtl?.email}</p>
          <p>Mobile No: {userdtl?.number}</p>

          <p className="mt-2">
            Address:{" "}
            {defaultaddress
              ? `${defaultaddress.Rname}, ${defaultaddress.houseNumber}, ${defaultaddress.building}, ${defaultaddress.address}, ${defaultaddress.area} - ${defaultaddress.pincode}`
              : "No address"}
          </p>

          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
            Edit
          </button>

        </div>
      )}

      {/* NORMAL ORDERS */}
      {myorder && (
        <div className="space-y-4">

          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-xl shadow">

              <p className="text-green-600 font-medium">
                {order.status}
              </p>

              {order.products?.map((product) => (
                <div key={product._id} className="flex gap-4 mt-3">

                  <img
                    src={product.image}
                    className="w-14 h-14 rounded"
                  />

                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.quantity} items
                    </p>
                    <p className="font-semibold">
                      ₹{order.totalamount}
                    </p>
                  </div>

                </div>
              ))}

              <button className="mt-3 text-red-500 text-sm">
                Cancel
              </button>

            </div>
          ))}

        </div>
      )}

    </>
  )}

</div>
            </div>
        </div>
    )
}

export default Useraccount

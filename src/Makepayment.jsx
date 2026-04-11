import React, { useEffect, useState } from 'react'
import './Makepayment.css'
import jiobag from './assets/jiobag.svg'
import sbi from './assets/ssbi.webp'
import yes from './assets/yes.webp'
import union from './assets/union.webp'
import icici from './assets/icici.webp'
import rbi from './assets/RBI.webp'
import canara from './assets/ccanara.webp'
import credpay from './assets/credpay.webp'
import cash from './assets/cash.webp';
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import razor from './assets/razorlogo.webp'


function Makepayment() {
  const [payments, setPayments] = useState([]);
  const [proced, setProced] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = JSON.parse(localStorage.getItem("cart")) || [];
        if (datas.length === 0) {
          setPayments([]);
          return;
        }
        const ids = datas.map(item => item.productId);
        const res = await axios.post("https://backend-lr7e.onrender.com/getproductbyId", { ids });

        const updated = res.data.map(product => {
          const cartitem = datas.find(c => c.productId == product._id.toString());
          return {
            ...product, quantity: cartitem?.quantity || 1
          }
        })
        setPayments(updated);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData();



  }, [])
  const totamount = payments.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);

  const rightarrow = ">";

  const handlepayment = () => {
    localStorage.setItem("paymentType", JSON.stringify("cash on delivery"));
    setProced(true);


  }
  const handlecancel = () => {
    setProced(false);
    
  }
  const handleproced = async () => {
    try {
      const cod = JSON.parse(localStorage.getItem("paymentType")) || "cash on delivery";
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      const user = JSON.parse(localStorage.getItem("userstore")) || {};
      const addressget = JSON.parse(localStorage.getItem("address")) || [];

      // ✅ check user
      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }

      // ✅ check cart
      if (!data || data.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      // ✅ check address
      if (!addressget || addressget.length === 0) {
        toast.error("Delivery Address is not selected..!");
        navigate("/OrderReview");
        return; // 🔥 IMPORTANT FIX
      }

      const formattedUser = {
        _id: user._id,
        email: user.email,
        number: user.number
      };

      // ✅ API call
      const res = await axios.post(
        "https://backend-lr7e.onrender.com/ordersave",
        {
          products: data,
          users: [formattedUser],
          paymentType: cod,
          deliveryaddress: addressget,
        }
      );

      console.log("Order response:", res.data);

      // ✅ safe success check
      if (res?.data?.message === "Order saved successfully") {
        toast.success("Order placed successfully");

        localStorage.removeItem("cart");
        localStorage.removeItem("paymentType");

        setTimeout(() => {
          navigate("/", { state: { showToast: true } });
        }, 1000);
      } else {
        toast.error("Order not saved");
      }

    } catch (err) {
      console.log("ORDER ERROR:", err);

      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };
  const handleRazorpay = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      const user = JSON.parse(localStorage.getItem("userstore")) || {};
      const address = JSON.parse(localStorage.getItem("address")) || [];

      // ✅ validation
      if (!address || address.length === 0) {
        toast.error("Delivery Address is not selected..!");
        navigate("/OrderReview");
        return;
      }

      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }

      // ✅ create order
      const res = await axios.post(
        "https://backend-lr7e.onrender.com/razorpayorder",
        { products: data }
      );

      const order = res.data;

      // ✅ IMPORTANT check
      if (!order || !order.id) {
        console.log("Invalid order:", order);
        toast.error("Unable to create payment order");
        return;
      }

      // ✅ Razorpay loaded check
      if (!window.Razorpay) {
        toast.error("Razorpay not loaded");
        return;
      }

      let paymentSuccess = false;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "RajMart",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          paymentSuccess = true;

          try {
            console.log("Payment response:", response);

            const verifyRes = await axios.post(
              "https://backend-lr7e.onrender.com/verify-razorpay",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                products: data,
                users: [{
                  _id: user._id,
                  email: user.email,
                  number: user.number
                }],
                deliveryaddress: address,
              }
            );

            console.log("Verify response:", verifyRes.data);

            // ✅ strict check
            if (verifyRes?.data?.success === true) {
              toast.success("Payment Successful");

              localStorage.removeItem("cart");
              localStorage.removeItem("paymentType"); // ✅ add this

              setTimeout(() => {
                navigate("/");
              }, 1500);
            } else {
              toast.error(verifyRes?.data?.error || "Payment verification failed"); // ✅ better error
            }

          } catch (err) {
            console.log("VERIFY ERROR:", err);

            toast.error(
              err?.response?.data?.error || "Verification failed"
            );
          }
        },

        prefill: {
          name: user?.name || "Customer",
          email: user?.email,
          contact: user?.number,
        },

        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);

      // ✅ proper failure handling
      rzp.on("payment.failed", function (response) {
        console.log("Payment failed:", response.error);

        if (!paymentSuccess) {
          toast.error(response?.error?.description || "Payment failed");
        }
      });

      rzp.open();

    } catch (err) {
      console.log("INIT ERROR:", err);
      toast.error("Error initiating Razorpay");
    }
  };
  return (

    <div className='paymentcontainer'>
      <Toaster position='top-center' />
      <div className='paymenttop'>
        <div className='paymenttopwhite'>
          <img src={jiobag} alt="jiomartlogo" className='paymenttopimg' />
          <p className='paymenttopP'>Amount payable:{totamount}</p>
        </div>


      </div>
      <div className='paymentbanks'>
        <p className='paymentbanksP'>Netbanking</p>
        <div className='paymentbanksgrid'>
          <img src={sbi} alt="sbi" className='banklogo' />
          <img src={rbi} alt="rbi" className='banklogo' />
          <img src={union} alt="union" className='banklogo' />
          <img src={icici} alt="icici" className='banklogo' />
          <img src={yes} alt="yes" className='banklogo' />
          <img src={canara} alt="canara" className='banklogo' />


        </div>
        <hr />
        <p className='paymentmore'>More banks</p>
      </div>

      <div className='paymentcredpay'>
        <img src={credpay} alt="credpay" className='credpayimg' />
        <p className='credpayP'>CRED Pay</p>
        <p className='credpayright'>{rightarrow}</p>
      </div>
      <div className='paymentCOD' onClick={handleRazorpay}>
        <img src={razor} alt="razorpay" className='razorlogo' />
        <p className='paymentcashP'>Pay with Razorpay</p>
        <p className='paymentright'>{rightarrow}</p>
      </div>
      <div className='paymentCOD' onClick={handlepayment}>
        <img src={cash} alt="cashondelivery" className='paymentcashlogo' />
        <p className='paymentcashP'>Cash On Delivery</p>
        <p className='paymentright'>{rightarrow}</p>
      </div>
      {proced && (
        <div className='procedmsg'>
          <div className='procedmsgcontainer'>
            <h3 className='procedh3'>Cash On Delivery</h3>
            <p className='procedP'>Do you wish to continue with cash on delivery?</p>
            <button className='procedbtn' onClick={handleproced}>Proceed</button>
            <button className='procedbtn' onClick={handlecancel}>Cancel</button>

          </div>
        </div>
      )}


      {sucess && (
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />


        </div>
      )}
    </div>


  )
}

export default Makepayment
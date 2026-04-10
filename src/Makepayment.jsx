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
    const cod = localStorage.setItem("paymentType", JSON.stringify("cash on delivery"));
    setProced(true);


  }
  const handlecancel = () => {
    setProced(false);
    navigate("/Makepayment")
  }
  const handleproced = async () => {
    try {
      const cod = JSON.parse(localStorage.getItem("paymentType")) || [];
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      const user = JSON.parse(localStorage.getItem("userstore")) || [];
      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }
      const formattedUser = {
        _id: user._id,
        email: user.email,
        number: user.number
      };
      const addressget = JSON.parse(localStorage.getItem("address")) || [];
      if (addressget.length === 0) {
        toast.error("Delivery Address is not selected..!");
        navigate("/OrderReview");
      } else {

        const res = await axios.post("https://backend-lr7e.onrender.com/ordersave", {
          products: data,
          users: [formattedUser],
          paymentType: cod,
          deliveryaddress: addressget,

        })

        localStorage.removeItem("cart");
        localStorage.removeItem("paymentType");
        setTimeout(() => {
          navigate("/", { state: { showToast: true } });

        }, 1000)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleRazorpay = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      const user = JSON.parse(localStorage.getItem("userstore")) || {};
      const address = JSON.parse(localStorage.getItem("address")) || [];

      if (address.length === 0) {
        toast.error("Delivery Address is not selected..!");
        navigate("/OrderReview");
        return;
      }
      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }


      const res = await axios.post(
        "https://backend-lr7e.onrender.com/razorpayorder",
        { products: data }
      );

      const order = res.data;


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "RajMart",
        description: "Order Payment",
        order_id: order.id,

        methods: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        },

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "https://backend-lr7e.onrender.com/verify-razorpay",
              {
                ...response,
                products: data,
                users: [{
                  _id: user._id,
                  email: user.email,
                  number: user.number
                }],
                deliveryaddress: address,
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful ");

              localStorage.removeItem("cart");

              setTimeout(() => {
                navigate("/", { state: { showToast: true } });
              }, 1500);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.log(err);
            toast.error("Payment failed");
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
      rzp.on("payment.failed", function (response) {
        console.log(response.error);
        toast.error("Payment failed ");
      });
      rzp.open();

    } catch (err) {
      console.log(err);
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
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Otp from "./Otp";

function Signin(props) {


    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");
    const [email, setMail] = useState("");
    const [showotp, setShowopt] = useState(false);
    const isvalid = number.length === 10;
    const navigate = useNavigate();

    


    const [searchParams] = useSearchParams();
    const redirect = decodeURIComponent(searchParams.get("redirect") || "");
    // console.log("Redirect URL:", redirect);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://backend-fgbg.onrender.com/signin", { number, email });
            setMessage(res.data.message);

            if (res.data.message === "OTP sent successfully") {
                setNumber("");
                setShowopt(true);



            }



        } catch (err) {
            console.log(err);
            console.log("server error..");
        }
    }

    const onotpSubmit = (otp) => {
        console.log("sucessfully send ", otp);
    }




    return (
      <>
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">

    {!showotp ? (
      <form onSubmit={handleSubmit} className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-xl p-6 relative w-[500px] h-[700px] ml-[700px]">

          
          <Link to="/">
            <div className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer text-xl">
              ✕
            </div>
          </Link>

          
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Almost there!
          </h2>
          <p className="text-gray-500 mb-6">
            Simply sign in to place your order
          </p>

          
          <div className="mb-4">
            <label className="text-sm text-gray-600">Mobile Number</label>
            <input
              type="text"
              placeholder="+91-"
              value={number}
              maxLength={10}
              onChange={(e) =>
                setNumber(e.target.value.replace(/\D/g, ""))
              }
              className="w-full mt-1 mb-[30px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="text"
              placeholder="xxxx@gmail.com"
              value={email}
              onChange={(e) => setMail(e.target.value)}
              className="w-full mt-1 mb-[240px] p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          
          {message && (
            <p className="text-red-500 text-sm mb-3">{message}</p>
          )}

          
          <p className="text-xs text-gray-500 mb-4">
            By signing in, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer">
              Privacy Policy
            </span>
          </p>

          
          <button
            type="submit"
            disabled={!isvalid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${
                isvalid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
          >
            Sign In
          </button>

        </div>
      </form>
    ) : (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Otp
            length={6}
            onotpSubmit={onotpSubmit}
            email={email}
            redirect={redirect}
          />
        </div>
      </div>
    )}
  </div>
</>


    );

}
export default Signin
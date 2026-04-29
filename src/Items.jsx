import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Adminhome from './Adminhome';
import toast, { Toaster } from 'react-hot-toast';





function Items() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`https://backend-fgbg.onrender.com/product/${id}`);
          if (res.data) {
            setName(res.data.name);
            setQuantity(res.data.quantity);
            setPrice(res.data.price);
            setImage(res.data.image);
            setCategory(res.data.category);
          }

        }
        catch (err) {
          console.log("fetch error", err);
        }
      };
      fetchData();
    }

  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price || !category) {
      setMessage("Please fill all fields and select an image.");
      return;
    }
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", Number(quantity));
    form.append("price", Number(price));
    form.append("image", image);
    form.append("category", category);
    try {
      let res;
      if (isEdit) {
        res = await axios.put(`https://backend-fgbg.onrender.com/updateItems/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });

      } else {
        res = await axios.post("https://backend-fgbg.onrender.com/addItems", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });

      }

      setMessage(res.data.message);
      if (res.data.message === "product saved.." || res.data.message === "update successfully done..") {
        setName("");
        setQuantity("");
        setPrice("");
        setImage(null)
        setCategory("");
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/AddItems");

        }, 3000);

      }
    }
    catch (err) {
      console.log(err, "servererrororor");
      setMessage(err.response?.data?.message);
    }



  }
  const options = [
    "shoes",
    "mobiles",
    "speakers",
    "earbuds",
    "t-shirts",
    "pants",
    "shirts",
    "sports",
    "footwear",
    "mouse",
    "footwear",
    "electronics",
    "laptops"

  ]
  const onhandlerselect = (e) => {
    setCategory(e.target.value);

  }


  return (

    <div className="flex min-h-screen bg-gray-50">



      <Adminhome />
      <Toaster position='top-center' />


      <div className="flex-1 flex items-center justify-center p-6">



        <div className="w-[530px] ml-[400px]  max-w-xl bg-white border border-gray-100 shadow-2xl rounded-2xl p-8">


          <h2 className="text-[30px] ml-[-10px]  mt-[-10px] font-bold text-gray-800 mb-8 text-center ">
            {isEdit ? "Update Item" : "Add Item"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">


            <div>
              <label className="text-sm text-gray-600">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>


            <div>
              <label className="text-sm text-gray-600">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>


            <div>
              <label className="text-sm text-gray-600">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>


            <div>
              <label className="text-sm text-gray-600">Product Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full mt-1 text-sm border border-gray-200 rounded-xl p-0
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100"
              />
            </div>


            <div>
              <label className="text-sm text-gray-600">Category</label>
              <select
                value={category}
                onChange={onhandlerselect}
                className="w-full mt-1 px-4 mb-8 py-2 border border-gray-200 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select category</option>
                {options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
            </div>


            {message && (
              <div className="bg-blue-50 text-blue-600 text-sm px-4 py-2 rounded-xl text-center">
                {message}
              </div>
            )}


            <button
              type="submit"
              className="w-full  bg-blue-600 hover:bg-blue-900  hover:scale-105  text-white font-semibold py-2 rounded-xl shadow-md transition"
            >
              {isEdit ? "Update Item" : "Add Item"}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Items
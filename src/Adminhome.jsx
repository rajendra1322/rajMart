import React from 'react'
// import './Adminhome.css'
import home from './assets/home.svg';
import product from './assets/product.svg';
import orderss from './assets/orders.svg';
import category from './assets/category.svg';
import users from './assets/users.svg';
import logout from './assets/logout.svg';
import { useNavigate } from 'react-router';


function Adminhome() {
  const navigate = useNavigate();
  const handleproductsclick = () => {
    navigate("/AddItems");
  }
  const handleorders = () => {
    navigate("/Orders");
  }
  const handlelogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  }
  const handledashboard = () => {
    navigate("/Dashboard")
  }
  const handleuser = () => {
    navigate("/Userdetails")
  }
  return (

    <div className="flex min-h-screen w-[1920px] bg-gray-50">


      <aside className="w-[350px] bg-white border-r border-gray-200 shadow-sm flex flex-col">

        <div className="px-6 py-5 border-b">
          <h3 className="text-[40px] font-bold text-gray-800">
            Admin Panel
          </h3>
          <p className="text-md text-gray-500">Management Dashboard</p>
        </div>


        <nav className="flex-1 px-4 py-6 space-y-2">


          <div onClick={handledashboard}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   hover:bg-blue-50 hover:translate-x-1 transition-all duration-200">
            <img src={home} className="w-6 h-6" />
            <p className="text-gray-700 font-medium">Dashboard</p>
          </div>

          <div onClick={handleproductsclick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   hover:bg-blue-50 hover:translate-x-1 transition-all duration-200">
            <img src={product} className="w-6 h-6" />
            <p className="text-gray-700 font-medium">Products</p>
          </div>

          <div onClick={handleorders}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   hover:bg-blue-50 hover:translate-x-1 transition-all duration-200">
            <img src={orderss} className="w-6 h-6" />
            <p className="text-gray-700 font-medium">Orders</p>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                      hover:bg-blue-50 hover:translate-x-1 transition-all duration-200">
            <img src={category} className="w-6 h-6" />
            <p className="text-gray-700 font-medium">Category</p>
          </div>

          <div onClick={handleuser}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   hover:bg-blue-50 hover:translate-x-1 transition-all duration-200">
            <img src={users} className="w-6 h-6" />
            <p className="text-gray-700 font-medium">Users</p>
          </div>

        </nav>


        <div className="px-4 py-5 border-t">
          <div onClick={handlelogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                   hover:bg-red-50 hover:translate-x-1 transition-all duration-200">
            <img src={logout} className="w-6 h-6 rotate-180" />
            <p className="text-red-500 font-medium">Logout</p>
          </div>
        </div>

      </aside>




    </div>
  )
}

export default Adminhome

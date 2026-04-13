
import { Route, Routes } from "react-router";
import Navigation from "./Navigation.jsx";
import Signin from "./Signin.jsx";
import Location from "./Location.jsx"
import Footer from "./Footer.jsx";
import Card from "./Card.jsx";
import Offersection from "./Offersection.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Admin from "./Admin.jsx";
import AddItems from "./AddItems.jsx";
import Items from "./Items.jsx";
import View from "./View.jsx";
import Products from "./Products.jsx";
import { Toaster } from "react-hot-toast";


const App = () => {

  const[data,setdata]=useState(null);
  

  async function getData(){
    let res=await axios.get(`https://backend-lr7e.onrender.com`);
    console.log(res);
    setdata(res.data);
    
  };
  useEffect(()=>{
    getData();
  },[]
)
  return(
    <>
    <Toaster position="top-center" />
    
    <Routes>
      <Route path="/" element={<Navigation/>}></Route>
      <Route path="/Signin" element={<Signin/>}></Route>
      <Route path="/Location" element={<Location/>}></Route>
      <Route path="/Admin" element={<Admin />}></Route>
      <Route path="/AddItems" element={<AddItems />}></Route>
      <Route path="/Items" element={<Items />}></Route>
      <Route path="/View/:id" element={<View />}></Route>      
    </Routes>
    <Card />
    <Offersection />
    <Card />
    <Products />
    
    
    
   
    <Footer />
        
    
    </>
    
    

  );
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Admin from './Admin.jsx'
import AddItems from './AddItems.jsx'
import Items from './Items.jsx'
import View from './View.jsx'
import Signin from './Signin.jsx'
import Edit from './Edit.jsx'
import Productdetails from './Productdetails.jsx'
import Cartdetails from './Cartdetails.jsx'
import OrderReview from './OrderReview.jsx'
import Makepayment from './Makepayment.jsx'
import Adminhome from './Adminhome.jsx'
import Orders from './Orders.jsx'
import Useraccount from './Useraccount.jsx'
import "leaflet/dist/leaflet.css";
import Dashboard from './Dashboard.jsx'
import Userdetails from './Userdetails.jsx'






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/Signin' element={<Signin/>}></Route>
      <Route path='/Admin' element={<Admin/>}></Route>
      <Route path='/AddItems' element={<AddItems/>}></Route>
      <Route path='/Items' element={<Items/>}></Route>
      <Route path='/Items/:id' element={<Items/>}></Route>
      <Route path='/View/:id' element={<View/>}></Route>
      <Route path='Edit/:id' element={<Edit />}></Route>
      <Route path='Productdetails/:id' element={<Productdetails />}></Route>
      <Route path='/Cartdetails' element={<Cartdetails />}></Route>
      <Route path='/OrderReview' element={<OrderReview />}></Route>
      <Route path='/Makepayment' element={<Makepayment />}></Route>
      <Route path='/Adminhome' element={<Adminhome />}></Route>
      <Route path='/Orders' element={<Orders />}></Route>
      <Route path='/Useraccount' element={<Useraccount />}></Route>
      <Route path='/Dashboard' element={<Dashboard />}></Route>
      <Route path='/Userdetails' element={<Userdetails />}></Route>
      <Route path='/*' element={<App/>}></Route>
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)

import logo from './logo.svg';
import './App.scss';
import { useState } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ProtectedRouts from './utils/ProtectedRoutes';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Guest_Home from './pages/Guest_Home';
import Users from './pages/Users';

const App=()=> {
  return(
    <BrowserRouter>
      <Routes>
      <Route element={<ProtectedRouts/>}>
          <Route index element={<Home/>}/>
          <Route path="/products/:id" element={<SingleProduct/>}/>
          <Route path="/category/:id" element={<Category/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/products" element={<Product/>}/> 
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/users" element={<Users/>}/>
      </Route>
        <Route path="/guest_home" element={<Guest_Home/>}/> 
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

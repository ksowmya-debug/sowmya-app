import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import ProductList from "./pages/ProductList";
import UserManagement from "./pages/UserManagement";
import { Toaster } from "react-hot-toast";   
import "react-toastify/dist/ReactToastify.css";    
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
     </BrowserRouter>
    
      
  );
}
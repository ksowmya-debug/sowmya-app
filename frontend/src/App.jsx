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
import "./App.css";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Layout from "./Components/Layout";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster/>
    <AuthProvider> {/* Wrap Routes with AuthProvider */}
      <CartProvider> {/* Wrap Routes with CartProvider */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/users" element={<UserManagement />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </CartProvider>
     </AuthProvider>
     </BrowserRouter>
    
      
  );
}
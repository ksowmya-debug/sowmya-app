import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useCart } from '../context/CartContext'; // Import useCart
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const navigate=useNavigate();
    const { Auth, logout } = useAuth(); // Use Auth and logout from useAuth
    const { totalItems } = useCart(); // Use totalItems from useCart

    const handelLogout=()=>{
        logout(); // Use logout from useAuth
        navigate('login')
    }
  return (
<>
<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: 'transparent'}}>

  <div className="container-fluid">
    <Link className="navbar-brand" to="/">SOM-DMART</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        {Auth && Auth.isAdmin && (
          <li className="nav-item">
            <Link className="nav-link" to="/users">Users</Link>
          </li>
        )}
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/cart">
            <FaShoppingCart /> ({totalItems})
          </Link>
        </li>
        {!Auth ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handelLogout}>Logout</button>
            </li>
            
          </>
        )}
      </ul>
    </div>
  </div>
</nav>
</>
  )
}
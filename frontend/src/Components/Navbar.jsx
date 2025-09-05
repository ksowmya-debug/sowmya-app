import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/Slices/AuthSlice'
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar({ onAddProductClick }) {
  const dispatch=useDispatch();
    const navigate=useNavigate();
    const { totalItems } = useSelector(state => state.cart);
    const { Auth } = useSelector(state => state.auth);

    const handelLogout=()=>{
        dispatch(logout());
        navigate('login')
    }
  return (
<>
<div className="navbar bg-orange-500 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl hover:bg-orange-600">SOWMMYA-MALL</a>
    <div className="hidden md:flex gap-4 ml-4"> {/* Hidden on small, flex on medium and up */}
        <Link to="/" className="btn btn-ghost text-lg hover:bg-orange-600">Home</Link>
        <Link to="/about" className="btn btn-ghost text-lg hover:bg-orange-600">About</Link>
        
        <Link to="/dashboard" className="btn btn-ghost text-lg hover:bg-orange-600">Dashboard</Link>
        {Auth && Auth.isAdmin && <Link to="/users" className="btn btn-ghost text-lg hover:bg-orange-600">Users</Link>}
        <Link to="/products" className="btn btn-ghost text-lg hover:bg-orange-600">Products</Link>
    </div>
  </div>
  <div className="flex gap-2">
    <Link to="/cart" className="btn btn-ghost btn-circle hover:bg-orange-600">
        <div className="indicator">
            <FaShoppingCart className="h-5 w-5" />
            <span className="badge badge-sm indicator-item">{totalItems}</span>
        </div>
    </Link>
    
    {!Auth ? (
      <>
        <Link to="/login" className="btn btn-ghost text-lg hover:bg-orange-600 hidden md:block">Login</Link> {/* Hidden on small, block on medium and up */}
        <Link to="/register" className="btn btn-ghost text-lg hover:bg-orange-600 hidden md:block">Signup</Link> {/* Hidden on small, block on medium and up */}
      </>
    ) : (
      <>
        <button onClick={handelLogout} className="btn btn-ghost text-lg hover:bg-orange-600 hidden md:block">Logout</button> {/* Hidden on small, block on medium and up */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-orange-600">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li onClick={onAddProductClick}><a>Add product</a></li>
          </ul>
        </div>
      </>
    )}
    <div className="md:hidden"> {/* Hamburger menu for small screens */}
      <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
    </div>
  </div>
</div>
<div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      {Auth && Auth.isAdmin && <li><Link to="/users">Users</Link></li>}
      <li><Link to="/products">Products</Link></li>
      {!Auth ? (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Signup</Link></li>
        </>
      ) : (
        <>
          <li><button onClick={handelLogout}>Logout</button></li>
          <li onClick={onAddProductClick}><a>Add product</a></li>
        </>
      )}
    </ul>
  </div>
</div>
</>
  )
}
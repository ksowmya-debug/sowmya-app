import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from "react-hot-toast"
import { useAuth } from '../context/AuthContext'; // Import useAuth

export default function Login() {

  const navigate=useNavigate()
  const { login } = useAuth(); // Use login from useAuth
  

  const [value, setValue] = useState({
    email: "",
    password: "",
  })
  
    const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, value);
      const data = response.data;
      console.log(data);

      if (response.status == 200) {
        toast.success(data.msg);
        login(data.user); // Use login from useAuth
        console.log("logged in successfully");
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Login failed!");
      }
    }
  };
  

  return (
  <>
   <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0 ">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
           som-dmart   
      </a>
      <div className="login-box">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      type="text"
                  name="email"
                  value={value.email}
                  onChange={handleChange}
                  id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password"  value={value.password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-500" required=""/>
                  </div>
                
                  <button type="submit" className="w-full btn-3d-blue">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Do not have an account yet? <Link to="/register" className="font-medium text-blue-900 hover:underline dark:text-blue-900">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</>
  )
}
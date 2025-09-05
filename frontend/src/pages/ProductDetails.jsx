import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'; // Import toast

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/getProduct/${id}`)
        setProduct(response.data.product)
        toast.success('Product details loaded successfully!'); // Success toast
      } catch (error) {
        console.error("Error fetching product:", error)
        toast.error('Failed to load product details.'); // Error toast
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-100 p-8'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Product Details
          </h1>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
          {product ? (
            <div>
              <img src={`${import.meta.env.VITE_BACKEND_URL}${new URL(product.imageUrl).pathname}`} alt={product.name} className="w-full h-64 object-cover mb-4"/>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div style={{ wordBreak: 'break-all' }}>
                <p>Original URL: {product.imageUrl}</p>
                <p>Backend URL Env: {import.meta.env.VITE_BACKEND_URL}</p>
                <p>Constructed URL: {`${import.meta.env.VITE_BACKEND_URL}${new URL(product.imageUrl).pathname}`}</p>
              </div>
              <p className="text-gray-700 mb-4">{product.desc}</p>
              <p className="text-xl font-semibold">${product.price}</p>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </>
  )
}
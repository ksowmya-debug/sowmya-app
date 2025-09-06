import React from 'react';
import { FaEdit, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/Slices/CartSlice';
import toast from 'react-hot-toast';

export default function Card({ product, onEditClick }) {
  const dispatch = useDispatch();
  const { Auth } = useSelector(state => state.auth);
  const { totalItems } = useSelector(state => state.cart);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent link navigation
    if (!Auth) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      const res = await fetch(`https://sowmya-app-backend.onrender.com/cart/${Auth._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(addToCart({ product, quantity: 1 }));
        toast.success(`Product added to cart! Total items: ${totalItems + 1}`);
      } else {
        toast.error(`Failed to add to cart: ${data.msg}`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart.");
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent link navigation
    onEditClick(product);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent link navigation
    // Implement delete logic here
    console.log('Delete button clicked for product:', product);
  };

  return (
    <>
      <div className="card bg-orange-200 w-64 shadow-sm relative overflow-hidden">
        <Link to={`/product/${product._id}`}>
          <figure className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="transition-transform duration-300 ease-in-out hover:scale-105 w-full h-72 object-cover" />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-semibold">{product.name}</h2>
            <p className='text-sm text-gray-600'>{product.desc}</p>
          </div>
        </Link>
        
        {/* Buttons overlay */} 
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button
            className="btn btn-circle btn-success btn-sm text-white"
            onClick={handleEditClick}
          >
            <FaEdit />
          </button>
          <button
            className='btn btn-circle btn-error btn-sm text-white'
            onClick={handleDeleteClick}
          >
            <FaTrash />
          </button>
          <button
            className='btn btn-circle btn-primary btn-sm text-white'
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sowmya-app-backend.onrender.com/product/getAllProducts');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-5 bg-yellow-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-5">All Products</h1>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => (
            <div key={product._id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-lg font-bold text-green-600">${product.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
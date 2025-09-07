import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Image } from 'react-bootstrap';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/getAllProducts`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">All Products</h1>
      {products.length === 0 ? (
        <p className="text-center">No products available.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><Image src={product.imageUrl} thumbnail style={{ width: '80px', height: '80px' }} /></td>
                <td>{product.name}</td>
                <td>{product.desc}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
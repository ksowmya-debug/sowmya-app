import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'; // Import toast
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useCart();
  const { Auth } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://sowmya-app-backnd.onrender.com/product/getProduct/${id}`)
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

  const handleAddToCart = async () => {
    if (!Auth) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      await addToCart(product, 1);
      toast.success('Product added to cart!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart.");
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Product Details</h1>
      <Row className="justify-content-center">
        {product ? (
          <Col md={8}>
            <Image src={product.imageUrl} fluid className="mb-4" />
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <h3>${product.price}</h3>
            <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          </Col>
        ) : (
          <Col><p>Loading product details...</p></Col>
        )}
      </Row>
    </Container>
  )
}
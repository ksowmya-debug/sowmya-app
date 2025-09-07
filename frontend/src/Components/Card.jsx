import React from 'react';
import { FaEdit, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext'; // Import useCart
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Card as BootstrapCard, Button } from 'react-bootstrap';

export default function Card({ product, onEditClick }) {
  const { addToCart } = useCart();
  const { Auth } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent link navigation
    if (!Auth) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      await addToCart(product, 1); // Use addToCart from CartContext
      toast.success(`Product added to cart!`);
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
    <BootstrapCard style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <BootstrapCard.Img variant="top" src={product.imageUrl} />
        <BootstrapCard.Body>
          <BootstrapCard.Title>{product.name}</BootstrapCard.Title>
          <BootstrapCard.Text>{product.desc}</BootstrapCard.Text>
          <BootstrapCard.Text>${product.price}</BootstrapCard.Text>
        </BootstrapCard.Body>
      </Link>
      <div className="d-flex justify-content-around p-2">
        <Button variant="success" onClick={handleEditClick}><FaEdit /></Button>
        <Button variant="danger" onClick={handleDeleteClick}><FaTrash /></Button>
        <Button variant="primary" onClick={handleAddToCart}><FaShoppingCart /></Button>
      </div>
    </BootstrapCard>
  );
}
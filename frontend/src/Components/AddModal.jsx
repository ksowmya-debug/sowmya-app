import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AddModal({ onClose, onProductAdded }) {
  const { Auth } = useAuth();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    desc: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Auth || !Auth._id) {
      toast.error("User not authenticated.");
      return;
    }
    try {
      const response = await axios.post(`https://sowmya-app-backnd.onrender.com/product/create/${Auth._id}`, productData);
      if (response.data.success) {
        toast.success(response.data.msg);
        onProductAdded(response.data.product);
        onClose();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product.');
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="name">Product Name</Form.Label>
            <Form.Control type="text" name="name" value={productData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="price">Price</Form.Label>
            <Form.Control type="number" name="price" value={productData.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="desc">Description</Form.Label>
            <Form.Control as="textarea" name="desc" value={productData.desc} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="imageUrl">Image URL</Form.Label>
            <Form.Control type="text" name="imageUrl" value={productData.imageUrl} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function EditModal({ onClose, onProductUpdated, product }) {
  const [productData, setProductData] = useState(product);

  useEffect(() => {
    setProductData(product);
  }, [product]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://sowmya-app-backnd.onrender.com/product/update/${productData._id}`, productData);
      if (response.data.success) {
        toast.success(response.data.msg);
        onProductUpdated(response.data.product);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product.');
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
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
            Update Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
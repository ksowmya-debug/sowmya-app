import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function EditUserModal({ onClose, onUserUpdated, user }) {
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${userData._id}`, userData);
      if (response.data.success) {
        toast.success(response.data.msg);
        onUserUpdated(response.data.user);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user.');
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName">User Name</Form.Label>
            <Form.Control type="text" name="userName" value={userData.userName} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Is Admin" name="isAdmin" checked={userData.isAdmin} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
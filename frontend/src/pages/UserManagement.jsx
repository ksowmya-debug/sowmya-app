import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EditUserModal from '../Components/EditUserModal';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUserData, setNewUserData] = useState({
        userName: '',
        email: '',
        password: '',
        isAdmin: false
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getAllUsers`);
            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users.');
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
                if (response.data.success) {
                    toast.success(response.data.msg);
                    fetchUsers(); // Refresh the list
                } else {
                    toast.error(response.data.msg);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user.');
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleUserUpdated = (updatedUser) => {
        // Update the user in the local state
        setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
        toast.success('User updated successfully!');
        handleCloseEditModal();
    };

    const handleAddUser = () => {
        setShowAddUserModal(true);
    };

    const handleCloseAddUserModal = () => {
        setShowAddUserModal(false);
        setNewUserData({
            userName: '',
            email: '',
            password: '',
            isAdmin: false
        });
    };

    const handleNewUserChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewUserData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleNewUserSubmit = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, newUserData);
            if (response.data.success) {
                toast.success('User added successfully!');
                fetchUsers();
                handleCloseAddUserModal();
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            toast.error('Failed to add user.');
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4">User Management</h1>
            <Button variant="primary" onClick={handleAddUser} className="mb-4">Add New User</Button>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(user)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {showEditModal && selectedUser && (
                <EditUserModal
                    onClose={handleCloseEditModal}
                    onUserUpdated={handleUserUpdated}
                    user={selectedUser}
                />
            )}

            <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" name="userName" value={newUserData.userName} onChange={handleNewUserChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={newUserData.email} onChange={handleNewUserChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={newUserData.password} onChange={handleNewUserChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check type="checkbox" label="Is Admin" name="isAdmin" checked={newUserData.isAdmin} onChange={handleNewUserChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddUserModal}>Close</Button>
                    <Button variant="primary" onClick={handleNewUserSubmit}>Add User</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
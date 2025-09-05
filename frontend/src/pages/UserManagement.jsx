import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EditUserModal from '../Components/EditUserModal';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://sowmya-app-backend.onrender.com/user/getAllUsers');
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
                const response = await axios.delete(`https://sowmya-app-backend.onrender.com/users/delete/${userId}`);
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
        // Placeholder for add user functionality
        toast.info('Add new user');
        console.log('Add new user');
    };

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-5">User Management</h1>
            <button onClick={handleAddUser} className="btn btn-primary mb-4">Add New User</button>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button onClick={() => handleEdit(user)} className="btn btn-sm btn-info mr-2">Edit</button>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showEditModal && selectedUser && (
                <EditUserModal
                    onClose={handleCloseEditModal}
                    onUserUpdated={handleUserUpdated}
                    user={selectedUser}
                />
            )}
        </div>
    );
}
import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userManagement.js';

const userManagementRouters = express.Router();

userManagementRouters.get('/', getAllUsers);
userManagementRouters.get('/:id', getUserById);
userManagementRouters.put('/:id', updateUser);
userManagementRouters.delete('/:id', deleteUser);

export default userManagementRouters;
import express from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    updateCart
} from '../controllers/cart.js';

const cartRouters = express.Router();

cartRouters.get('/:userId', getCart);
cartRouters.post('/:userId', addToCart);
cartRouters.delete('/:userId/:productId', removeFromCart);
cartRouters.put('/:userId', updateCart);

export default cartRouters;
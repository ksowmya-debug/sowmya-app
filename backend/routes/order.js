import express from 'express';
import {
    checkout,
    getProductSalesData
} from '../controllers/order.js';

const orderRouters = express.Router();

orderRouters.post('/checkout/:userId', checkout);
orderRouters.get('/sales-data', getProductSalesData);

export default orderRouters;
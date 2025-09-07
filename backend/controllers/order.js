import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/product.js';

export const checkout = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        // Filter out items where product is null after populate
        cart.items = cart.items.filter(item => {
            if (!item.product) {
                console.warn(`Product with ID ${item._id} not found for cart item during checkout. Skipping.`);
                return false; // Exclude this item
            }
            return true; // Include this item
        });

        if (cart.items.length === 0) {
            return res.status(400).json({ msg: 'No valid items to checkout after filtering.' });
        }

        let totalAmount = 0;
        const orderItems = cart.items.map(item => {
            const itemPrice = item.product.price * item.quantity;
            totalAmount += itemPrice;
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };

export const getProductSalesData = async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            { $unwind: '$items' },
            { $group: {
                _id: '$items.product',
                totalQuantitySold: { $sum: '$items.quantity' }
            }},
            { $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'productDetails'
            }},
            { $unwind: '$productDetails' },
            { $project: {
                _id: 0,
                productName: '$productDetails.name',
                totalQuantitySold: 1
            }}
        ]);

        res.status(200).json({ success: true, salesData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};
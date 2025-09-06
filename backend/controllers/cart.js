import Cart from '../models/Cart.js';
import Product from '../models/product.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId });
        console.log("Raw Cart (before populate):", cart); // Added for debugging
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const baseUrl = req.protocol + '://' + req.get('host');

        const transformedCart = {
            ...cart._doc, // Get a plain JavaScript object of the cart
            items: cart.items.map(item => {
                if (item.product && item.product.imageUrl) {
                    return {
                        ...item._doc, // Get a plain JavaScript object of the item
                        product: {
                            ...item.product._doc, // Get a plain JavaScript object of the populated product
                            imageUrl: `${baseUrl}${item.product.imageUrl}` // Transform to absolute URL
                        }
                    };
                }
                return item._doc; // Return original item if product or imageUrl is missing
            })
        };

        console.log("Transformed Cart:", transformedCart);
        res.json(transformedCart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req.params;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { userId } = req.params;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ msg: 'Product not in cart' });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
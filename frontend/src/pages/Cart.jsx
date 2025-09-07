import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext'; // Import useCart
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';

export default function Cart() {
    const { items, totalItems, removeFromCart, updateCart, clearCart } = useCart();
    const { Auth } = useAuth();

    const handleCheckout = async () => {
        if (!Auth) {
            toast.error('Please login to checkout.');
            return;
        }
        if (items.length === 0) {
            toast.error('Your cart is empty.');
            return;
        }
        try {
            const res = await fetch(`https://sowmya-app-backnd.onrender.com/order/checkout/${Auth._id}`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.ok) {
                clearCart(); // Clear cart using CartContext
                toast.success(data.msg);
            } else {
                toast.error(`Checkout failed: ${data.msg}`);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Checkout failed.');
        }
    };

    return (
        <Container className="my-5">
            <h1 className="mb-4">Shopping Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ListGroup>
                    {items.map(item => (
                        item.product ? (
                            <ListGroup.Item key={item.product._id} className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <Image src={item.product.imageUrl} thumbnail style={{ width: '80px', height: '80px', marginRight: '15px' }} />
                                    <div>
                                        <h5>{item.product.name}</h5>
                                        <p>{item.product.desc}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateCart(item.product._id, parseInt(e.target.value))}
                                        className="form-control w-25 me-3"
                                    />
                                    <Button variant="danger" onClick={() => removeFromCart(item.product._id)}>Remove</Button>
                                </div>
                            </ListGroup.Item>
                        ) : null
                    ))}
                </ListGroup>
            )}
            <div className="text-end mt-3">
                <h3>Total Items: {totalItems}</h3>
                <Button variant="primary" onClick={handleCheckout} className="mt-2">Checkout</Button>
            </div>
        </Container>
    );
}
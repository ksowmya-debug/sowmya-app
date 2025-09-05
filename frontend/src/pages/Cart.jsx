import { useEffect } from 'react';
import { removeFromCart, updateCart, setCart } from '../redux/Slices/CartSlice';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() {
    const dispatch = useDispatch();
    const { items, totalItems } = useSelector(state => state.cart);
    const { Auth } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchCart = async () => {
            if (!Auth) return;
            try {
                const res = await fetch(`http://localhost:3000/cart/${Auth._id}`);
                const data = await res.json();
                if (res.ok) {
                    dispatch(setCart({ items: data.items }));
                } else {
                    toast.error(`Failed to fetch cart: ${data.msg}`);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
                toast.error('Failed to fetch cart.');
            }
        };
        fetchCart();
    }, [Auth, dispatch]);

    const handleRemoveFromCart = async (productId) => {
        if (!Auth) return;
        try {
            const res = await fetch(`http://localhost:3000/cart/${Auth._id}/${productId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                dispatch(removeFromCart(productId));
                toast.success('Item removed from cart.');
            } else {
                const data = await res.json();
                toast.error(`Failed to remove item: ${data.msg}`);
            }
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            toast.error('Failed to remove from cart.');
        }
    };

    const handleUpdateCart = async (productId, quantity) => {
        if (!Auth) return;
        try {
            const res = await fetch(`http://localhost:3000/cart/${Auth._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity }),
                }
            );
            if (res.ok) {
                dispatch(updateCart({ productId, quantity }));
                toast.success('Cart updated.');
            } else {
                const data = await res.json();
                toast.error(`Failed to update cart: ${data.msg}`);
            }
        } catch (error) {
            console.error('Failed to update cart:', error);
            toast.error('Failed to update cart.');
        }
    };

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
            const res = await fetch(`http://localhost:3000/order/checkout/${Auth._id}`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(setCart({ items: [] })); // Clear cart in Redux
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
        <div className="container mx-auto mt-10 p-5 bg-yellow-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-5">Shopping Cart</h1>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {items.map(item => (
                        <div key={item.product._id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center">
                                <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover mr-4" />
                                <div>
                                    <h2 className="font-bold">{item.product.name}</h2>
                                    <p>{item.product.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleUpdateCart(item.product._id, parseInt(e.target.value))}
                                    className="w-16 text-center border rounded mr-4"
                                />
                                <button onClick={() => handleRemoveFromCart(item.product._id)} className="btn btn-error">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-5 text-right">
                        <h2 className="text-2xl font-bold">Total Items: {totalItems}</h2>
                        <button onClick={handleCheckout} className="btn btn-primary mt-4">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
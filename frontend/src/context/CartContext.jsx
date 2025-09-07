import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in the same directory

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { Auth } = useAuth(); // Get Auth from AuthContext
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch cart on initial load or when Auth changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!Auth) {
        setItems([]);
        setTotalItems(0);
        return;
      }
      try {
        const res = await fetch(`https://sowmya-app-backnd.onrender.com/cart/${Auth._id}`);
        const data = await res.json();
        if (res.ok) {
          setItems(data.items || []);
          setTotalItems(data.items ? data.items.reduce((total, item) => total + item.quantity, 0) : 0);
        } else {
          console.error(`Failed to fetch cart: ${data.msg}`);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
    fetchCart();
  }, [Auth]);

  const addToCart = async (product, quantity = 1) => {
    if (!Auth) return;
    try {
      const res = await fetch(`https://sowmya-app-backnd.onrender.com/cart/${Auth._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      const data = await res.json();
      if (res.ok) {
        // Update local state based on response or refetch
        setItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.product._id === product._id);
          if (existingItemIndex > -1) {
            const newItems = [...prevItems];
            newItems[existingItemIndex].quantity += quantity;
            return newItems;
          } else {
            return [...prevItems, { product, quantity }];
          }
        });
        setTotalItems(prevTotal => prevTotal + quantity);
      } else {
        console.error(`Failed to add to cart: ${data.msg}`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!Auth) return;
    try {
      const res = await fetch(`https://sowmya-app-backnd.onrender.com/cart/${Auth._id}/${productId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems(prevItems => prevItems.filter(item => item.product._id !== productId));
        setTotalItems(prevTotal => prevTotal - (items.find(item => item.product._id === productId)?.quantity || 0));
      } else {
        const data = await res.json();
        console.error(`Failed to remove item: ${data.msg}`);
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateCart = async (productId, quantity) => {
    if (!Auth) return;
    try {
      const res = await fetch(`https://sowmya-app-backnd.onrender.com/cart/${Auth._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      if (res.ok) {
        setItems(prevItems => prevItems.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        ));
        setTotalItems(items.reduce((total, item) => total + item.quantity, 0));
      } else {
        const data = await res.json();
        console.error(`Failed to update cart: ${data.msg}`);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotalItems(0);
  };

  return (
    <CartContext.Provider value={{ items, totalItems, addToCart, removeFromCart, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

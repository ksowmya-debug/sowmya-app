import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalItems: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload.items;
            state.totalItems = action.payload.items.reduce((total, item) => total + item.quantity, 0);
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.product._id === newItem.product._id);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.product._id !== productId);
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        },
        updateCart: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.product._id === productId);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity;
            }
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        },
    },
});

export const { setCart, addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../redux/Slices/CartSlice';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const dispatch = useDispatch();
    const { items, totalItems } = useSelector(state => state.cart);
    const { Auth } = useSelector(state => state.auth);
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            if (!Auth) return;
            try {
                const res = await fetch(`https://sowmya-app-backend.onrender.com/cart/${Auth._id}`);
                const data = await res.json();
                if (res.ok) {
                    dispatch(setCart(data));
                } else {
                    console.error('Failed to fetch cart:', data.msg);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };
        fetchCart();
    }, [Auth, dispatch]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const res = await fetch('https://sowmya-app-backend.onrender.com/order/sales-data');
                const data = await res.json();
                if (res.ok) {
                    setSalesData(data.salesData);
                } else {
                    console.error('Failed to fetch sales data:', data.msg);
                }
            } catch (error) {
                console.error('Failed to fetch sales data:', error);
            }
        };
        fetchSalesData();
    }, []);

    const chartData = {
        labels: salesData ? salesData.map(item => item.productName) : [],
        datasets: [
            {
                label: 'Quantity Sold',
                data: salesData ? salesData.map(item => item.totalQuantitySold) : [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                    'rgba(255, 99, 71, 0.6)',
                    'rgba(60, 179, 113, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(255, 99, 71, 1)',
                    'rgba(60, 179, 113, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mx-auto mt-10 p-5 bg-gradient-to-r from-blue-900 to-blue-400 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
            <h2 className="text-2xl font-bold mb-3">Your Cart Items</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {items.map(item => (
                        item.product ? (
                            <div key={item.product._id} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover mr-4" />
                                    <div>
                                        <h2 className="font-bold">{item.product.name}</h2>
                                        <p>{item.product.desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ) : null
                    ))}
                    <div className="mt-5 text-right">
                        <h2 className="text-2xl font-bold">Total Items in Cart: {totalItems}</h2>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold mb-3 mt-10">Product Sales Data</h2>
            {salesData && salesData.length > 0 ? (
                <div className="w-full md:w-1/2 mx-auto">
                    <Pie data={chartData} />
                </div>
            ) : (
                <p>No sales data available yet. Make some purchases!</p>
            )}
        </div>
    );
}
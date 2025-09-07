import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useCart } from '../context/CartContext'; // Import useCart
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const { items, totalItems } = useCart();
    const { Auth } = useAuth();
    const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const res = await fetch('https://sowmya-app-backnd.onrender.com/order/sales-data');
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
        <Container className="my-5">
            <h1 className="mb-4">Dashboard</h1>
            <h2 className="mb-3">Your Cart Items</h2>
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
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </ListGroup.Item>
                        ) : null
                    ))}
                </ListGroup>
            )}

            <h2 className="mb-3 mt-5">Product Sales Data</h2>
            {salesData && salesData.length > 0 ? (
                <div style={{ width: '50%', margin: 'auto' }}>
                    <Pie data={chartData} />
                </div>
            ) : (
                <p>No sales data available yet. Make some purchases!</p>
            )}
        </Container>
    );
}
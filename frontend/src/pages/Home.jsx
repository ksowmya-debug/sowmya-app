import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import AddModal from '../Components/AddModal'
import EditModal from '../Components/EditModal'
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useCart } from '../context/CartContext';
import { toast } from "react-hot-toast";
import { FaShoppingCart, FaEdit, FaEye } from 'react-icons/fa';

import { Container, Row, Col, Card as BootstrapCard, Button } from 'react-bootstrap'; // Import Bootstrap components


export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const { Auth } = useAuth(); // Use Auth from useAuth
  const { addToCart } = useCart();
  const [showAddModal, setShowAddModal] = useState(false); // New state for AddModal visibility
  const [showEditModal, setShowEditModal] = useState(false); // New state for EditModal visibility
  const [productToEdit, setProductToEdit] = useState(null); // State to hold the product being edited

  console.log('User', Auth)

  useEffect(() => {
    if (!Auth) {
      navigate('/login');
    }
  }, [Auth, navigate]) // Added dependency array
  useEffect(() => {
    GetProducts()
  }, [Auth])


  // Function to fetch products
  const GetProducts = async () => {
    try {
      let url = 'https://sowmya-app-backnd.onrender.com/product/getAllProducts';
      const response = await axios.get(url);
      const data = response.data;
      setProducts(data.products);
      // set only products array
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = async (product) => {
    if (!Auth) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      await addToCart(product, 1);
      toast.success(`Product added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart.");
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setShowAddModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  // Function to handle product added from modal
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Function to open the EditModal
  const handleOpenEditModal = (product) => {
    console.log('handleOpenEditModal triggered with product:', product);
    setProductToEdit(product);
    setShowEditModal(true);
  };

  return (
    <>
      <Container className="my-5">
        <div className='text-center mb-4'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Welcome to our card collection!
          </h1>
          <p className='text-gray-800'>Hello🥰, Explore the different options below</p>
          <Button variant="primary" onClick={handleOpenModal}>Add Product</Button>
        </div>
        <Row className="justify-content-center">
          {products.length === 0 && (
            <Col><p className='text-center text-gray-500'>No products available.</p></Col>
          )}

          {products.map((item) => {
            return (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <BootstrapCard>
                  <div className="card-img-container">
                    <BootstrapCard.Img className="product-image" variant="top" src={item.imageUrl} />
                    <div className="card-buttons">
                        <Button variant="primary" size="sm" onClick={() => handleAddToCart(item)}>
                            <FaShoppingCart />
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleOpenEditModal(item)}>
                            <FaEdit />
                        </Button>
                        <Link to={`/product/${item._id}`}>
                            <Button variant="info" size="sm">
                                <FaEye />
                            </Button>
                        </Link>
                    </div>
                  </div>
                  <BootstrapCard.Body>
                    <BootstrapCard.Title>{item.name}</BootstrapCard.Title>
                    <BootstrapCard.Text>{item.desc}</BootstrapCard.Text>
                  </BootstrapCard.Body>
                </BootstrapCard>
              </Col>
            );
          })}


        </Row>
      </Container>
      {/* Conditionally render the AddModal */}
      {showAddModal && (
        <AddModal onClose={handleCloseModal} onProductAdded={handleProductAdded} />
      )}
      {/* Conditionally render the EditModal */}
      {showEditModal && productToEdit && (
        <EditModal
          onClose={() => setShowEditModal(false)}
          onProductUpdated={(updatedProduct) => {
            setProducts((prevProducts) =>
              prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
            );
            setShowEditModal(false);
          }}
          product={productToEdit}
        />
      )}
    </>
  )
}

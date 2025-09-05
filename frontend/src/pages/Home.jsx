import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddModal from '../Components/AddModal'
import EditModal from '../Components/EditModal'



export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const { Auth } = useSelector((state) => state.auth)
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
      let url = 'http://localhost:3000/product/getAllProducts';
      const response = await axios.get(url);
      const data = response.data;
      setProducts(data.products);
      // set only products array
    } catch (error) {
      console.log(error)
    }
  }

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
       <Navbar onAddProductClick={handleOpenModal}/>
    
      <div className='min-h-screen bg-yellow-600 p-8'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Welcome to our card collection!
          </h1>
          <p className='text-gray-800'>Hello🥰, Explore the different options below</p>
          
        </div>
        <div className='flex flex-wrap justify-center'>
          {products.length === 0 && (
            <h1 className='text-center text-gray-500'>No products available.</h1>
          )}

          {products.map((item) => {
            return <Card key={item._id} product={item} onEditClick={handleOpenEditModal} />;
          })}


        </div>
      </div>
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
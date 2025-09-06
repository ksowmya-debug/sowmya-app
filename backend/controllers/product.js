import ProductModel from "../models/product.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Product from "../models/product.js"; // adjust path if needed



const productCreate = async (req, res) => {
  try {
    const userId=req.params.userId;
    const { name, price, desc, imageUrl } = req.body;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID format",
      });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    if (!name || !price || !desc || !imageUrl) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all the fields",
      });
    }

    // Create product in separate collection
    const createProduct = new ProductModel({
      name,
      price,
      desc,
      imageUrl,
      userId,
    });

    await createProduct.save();

    // Also add product to user's products array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          products: {
            productId: createProduct._id,
            name: createProduct.name,
            price: createProduct.price,
            desc: createProduct.desc,
            imageUrl: createProduct.imageUrl,
          },
        },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      msg: "Product created successfully",
      product: createProduct,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const update = async (req, res) => {
  try {
    const productId = req.params.Id;
    const { name, price, desc, imageUrl } = req.body;

    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, desc, imageUrl },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      product: updateProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.Id;
    const findProduct = await Product.findById(productId);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.Id;
    console.log("Searching for product with ID:", productId);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid product ID format",
      });
    }

    const findProduct = await Product.findById(productId);
    console.log("Product found:", findProduct);

    if (!findProduct) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }
    return res.status(200).json({
      success: true,
      msg: "Product found successfully",
      product: findProduct,
    });
  } catch (error) {
    console.log("Error in getProduct:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("userId", "userName email");
    const baseUrl = req.protocol + '://' + req.get('host'); // Get dynamic base URL
    console.log("Base URL:", baseUrl);

    const productsWithAbsoluteUrls = products.map(product => {
      console.log(`Original imageUrl from DB for ${product.name}:`, product.imageUrl); // Added for debugging
      const absoluteImageUrl = `${baseUrl}${product.imageUrl}`;
      console.log(`Product ${product.name} Image URL:`, absoluteImageUrl);
      return {
        ...product._doc, // Use _doc to get a plain JavaScript object
        imageUrl: absoluteImageUrl // Prepend base URL
      };
    });

    console.log("All products:", productsWithAbsoluteUrls);
    return res.status(200).json({
      success: true,
      msg: "Products retrieved successfully",
      count: productsWithAbsoluteUrls.length,
      products: productsWithAbsoluteUrls,
    });
  } catch (error) {
    console.log("Error in getAllProducts:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID format",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Products retrieved successfully",
      products: user.products,
      userName: user.userName,
      _id: user._id,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

export { productCreate, update, deleteProduct, getProduct, getAllProducts, getProductsByUserId };

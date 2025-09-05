import mongoose from "mongoose";
import Product from "./models/product.js";
import DbCon from "./libs/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "backend/.env" });

const products = [
  {
    name: "Snacks & Munchies",
    price: 90,
    desc: "Description for product 9",
    imageUrl: "http://localhost:3000/images/product9.png",
  },
  {
    name: "Silver Wrist Watch",
    price: 10,
    desc: "Description for product 1",
    imageUrl: "http://localhost:3000/images/product1.png",
  },
  {
    name: "Wireless Headphones",
    price: 20,
    desc: "Description for product 2",
    imageUrl: "http://localhost:3000/images/product2.png",
  },
  {
    name: "Red Running Shoe",
    price: 30,
    desc: "Description for product 3",
    imageUrl: "http://localhost:3000/images/product3.png",
  },
  {
    name: "Vintage Camera",
    price: 50,
    desc: "Description for product 5",
    imageUrl: "http://localhost:3000/images/product5.png",
  },
  {
    name: "Smartwatch",
    price: 60,
    desc: "Description for product 6",
    imageUrl: "http://localhost:3000/images/product6.png",
  },
  {
    name: "Black Backpack",
    price: 70,
    desc: "Description for product 7",
    imageUrl: "http://localhost:3000/images/product7.png",
  },
  {
    name: "Smartphone",
    price: 80,
    desc: "Description for product 8",
    imageUrl: "http://localhost:3000/images/product8.png",
  },
  {
    name: "Stylish Sunglasses",
    price: 40,
    desc: "Description for product 4",
    imageUrl: "http://localhost:3000/images/product4.jpg",
  },
];

const seedDB = async () => {
  await DbCon();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database seeded!");
  mongoose.connection.close();
};

seedDB();

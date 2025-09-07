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
    imageUrl: "/images/product9.png",
  },
  {
    name: "Rice,Dal & Atta",
    price: 10,
    desc: "Description for product 1",
    imageUrl: "/images/product1.png",
  },
  {
    name: "Baby Care",
    price: 20,
    desc: "Description for product 2",
    imageUrl: "/images/product2.png",
  },
  {
    name: "Bakery and Buiscuits",
    price: 30,
    desc: "Description for product 3",
    imageUrl: "/images/product3.png",
  },
  {
    name: "Breakfast & Instant Food",
    price: 50,
    desc: "Description for product 5",
    imageUrl: "/images/product5.png",
  },
  {
    name: "Chicken,Meat & Fish",
    price: 60,
    desc: "Description for product 6",
    imageUrl: "/images/product6.png",
  },
  {
    name: "Pet Care",
    price: 70,
    desc: "Description for product 7",
    imageUrl: "/images/product7.png",
  },
  {
    name: "Personal Care",
    price: 80,
    desc: "Description for product 8",
    imageUrl: "/images/product8.png",
  },
  {
    name: "SHOP online",
    price: 40,
    desc: "Description for product 4",
    imageUrl: "/images/product4.jpg",
  },
  {
    name: "Dairy & Bakery",
    price: 100,
    desc: "Description for product 10",
    imageUrl: "/images/product10.png",
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

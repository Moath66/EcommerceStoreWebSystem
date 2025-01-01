const router = require("express").Router();
const Product = require("../models/Product");
const Category = require('../models/Category');
const {verifyTokenAndAuthorization ,verifyTokenAndAdmin} = require("./verifyToken");
const multer = require('multer');
const path = require('path');
const express = require("express");

 // Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

 // Create a new product
router.post('/create',upload.single('image'), async (req, res) => {
    const { title, description, categories, size,contactno, color, price, userId } = req.body;
    const img = req.file ? req.file.path : '';
    try {
      const newProduct = new Product({
        title,
        description,
        img,
        categories,
        size,
        color,
        price,
        contactno,
        userId
      });
  
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get all products by category
  router.get('/category/:categoryId', async (req, res) => {
    try {
      const products = await Product.find({ categories: req.params.categoryId }).populate('categories');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//  update Product
router.put('/update/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, description, categories, size, contactno, color, price, userId } = req.body;
  const img = req.file ? req.file.path : undefined;

  try {
    const updateData = {
      title,
      description,
      categories,
      size,
      color,
      price,
      contactno,
      userId,
    };

    // Only update the image if a new image is provided
    if (img) {
      updateData.img = img;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete 

router.delete("/:id" , async(req,res)=>{
    try {
         await Product.findByIdAndDelete(req.params.id);
         res.status(200).json("Product has been deleted");
    } catch (error) {
          res.status(500).json(error);
    }
})

// Get Product by id
router.get("/find/:id" , async(req,res)=>{
    try {
          const Product = await Product.findById(req.params.id);
           res.status(200).json(Product);
           } catch (error) {
              res.status(500).json(error);
              }
              })
    
 3
 // Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('categories');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

 // Get products by user ID
router.get('/user/:userId', async (req, res) => {
    try {
      const products = await Product.find({ userId: req.params.userId }).populate('categories');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router
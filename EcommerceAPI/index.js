const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const categoryRoutes = require('./routes/category');
const path = require('path');
const cors = require('cors')
dotenv.config();
app.use(express.json()); // Middleware para permitir o envio de dados em formato JSON
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:4200', // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
 // Serve static files from the uploads directory
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/categories', categoryRoutes);
 //  connect to MongoDB database
mongoose.connect(process.env.Mongo_Url)
.then(() =>{
  console.log('Database Connected successfully!')
  app.listen(process.env.port || 4000,()=>{
    console.log(" server is running s on 3000");
   })
}
)
.catch(() => console.log('Databases connection failed'));
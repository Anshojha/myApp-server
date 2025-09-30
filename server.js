import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRouter.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoutes.js';

const app = express()

const port = process.env.PORT || 4000;

// Database connection
await connectDB()

// Cloudinary Connection
await connectCloudinary()

// This will allowed  to access the multiple origin
const allowedOrigin = ['http://localhost:5173']

// Middleware configurtation
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin : allowedOrigin, credentials : true}))

app.get('/', (req, res) => res.send("API is working!! "))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


app.listen(port , ()=> {
    console.log(`Sever is serving successfully on http://localhost:${port}`)
})
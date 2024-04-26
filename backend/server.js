import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//import products from './data/products.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;

connectDB(); // connect to monogdb

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie Parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API IS RUNNING...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
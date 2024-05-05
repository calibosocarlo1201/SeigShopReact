import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js';
import { createProduct, createReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';
import { protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createReview);
// router.get('/', asyncHandler(async (req, res) => {
//     const product = await Product.find({});
//     res.json(product);
// }));

// router.get('/:id', asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if(product){
//         return res.json(product);
//     }else{
//         res.status(404);
//         throw new Error('Resource not found');
//     }

// }));

export default router;
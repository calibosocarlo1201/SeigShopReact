import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not found.');
    }
});

const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 500,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Product Description'
    })

    const createdProduct = await product.save();
    res.status(200).json(createPcreatedProductroduct);
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name, price, description, image, brand, category, countInStock
    }, { new: true });

    if(product){
        res.status(200).json(product)
    }else{
        res.status(400)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.deleteOne({_id: req.params.id});

    if(product.deletedCount > 0){
        res.status(200).json({ message: 'Product Deleted Successfully', deletedCount: product.deletedCount})
    }else{
        res.status(400);
        throw new Error('Resource not found');
    }
})

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct}
import mongoose, { mongo } from "mongoose";

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: number,
        required: true,
    },
    comment:{ 
        type: string,
        required: true,
    }
}, {
    timestamps: true,
})


const productSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema)

export default Product
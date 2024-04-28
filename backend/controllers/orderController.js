import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create New Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(404);
        throw new Error("No order items")
    }else{
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                id: undefined,
            })),
            user: req.user._id,
            shippingAddress, 
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }
})

// @desc    Get login user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    // const product
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
})

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    // const product
    const orders = await Order.findById(req.params.id).populate('user', 'name email');

    if(orders){
        res.status(200).json(orders)
    }else{
        res.status(404)
        throw new Error("Order not found")
    }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // const product
    res.send('update order to paid');
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // const product
    res.send('update order to delivered');
})

// @desc    Get All Orders
// @route   GET /api/orders/
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    // const product
    res.send('get all orders');
})

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders }
 
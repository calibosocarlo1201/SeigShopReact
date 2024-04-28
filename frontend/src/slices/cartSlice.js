import {createSlice} from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems:[], shppingAdress: {}, paymentMethod: 'PayPal' };
//const initialState = { cartItems:[] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            }else{
                state.cartItems = [...state.cartItems, item];
            }
            
            updateCart(state)
        },
        removeFromCart: (state,action) => {
            // YUNG IRERETURN NYAN IS YUNG MGA CART SA ITEMS NA YUNG ID IS NOT EQUAL TO ACTION PAYLOAD(WHICH IS YUNG ID NA IRERECEIVE)
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            updateCart(state)
        },
        saveShippingAddres: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },   
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddres, savePaymentMethod } = cartSlice.actions

export default cartSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = localStorage.getItem('cart')
//   ? JSON.parse(localStorage.getItem('cart'))
//   : { cartItems: []};

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       // NOTE: we don't need user, rating, numReviews or reviews
//       // in the cart
//       const { user, rating, numReviews, reviews, ...item } = action.payload;

//       const existItem = state.cartItems.find((x) => x._id === item._id);

//       if (existItem) {
//         state.cartItems = state.cartItems.map((x) =>
//           x._id === existItem._id ? item : x
//         );
//       } else {
//         state.cartItems = [...state.cartItems, item];
//       }

//     }
//   },
// });

// export const {
//   addToCart
// } = cartSlice.actions;

// export default cartSlice.reducer;
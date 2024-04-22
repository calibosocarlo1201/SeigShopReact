import {createSlice} from '@reduxjs/toolkit'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems:[] };

const addDecimals = (num) => {
    return Math.round(num * 100 / 100).toFixed(2);
}

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

            // Cacl Items Price
            state.itemPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Cacl Shipping Price
            state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

            // Cacl Tax Price
            state.taxPrice = addDecimals(Number(0.15 * state.itemPrice).toFixed(2));

            // Cacl Total Price
            state.totalPrice = (
                Number(state.ietmPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        }
    },
});

export const { addToCart } = cartSlice.actions

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
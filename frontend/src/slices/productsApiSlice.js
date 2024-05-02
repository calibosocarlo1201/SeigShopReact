import {PRODUCTS_URL} from '../constants'
import apiSlice from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url:PRODUCTS_URL,
            }) ,
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (prodId) => ({
                url: `${PRODUCTS_URL}/${prodId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => {
                return {
                    url: `${PRODUCTS_URL}/${data.prodId}`,
                    method: 'PUT',
                    body: data
                };
            }
        })
    })
});

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation} = productsApiSlice;
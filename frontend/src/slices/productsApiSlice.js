import {PRODUCTS_URL, UPLOAD_URL} from '../constants'
import apiSlice from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url:PRODUCTS_URL,
            }) ,
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
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
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => {
                return {
                    url: `${PRODUCTS_URL}/${data.prodId}`,
                    method: 'PUT',
                    body: data
                };
            },
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data,
            })
        }),
        deleteProduct: builder.mutation({
            query: (prodId) => ({
                url: `${PRODUCTS_URL}/${prodId}`,
                method: 'DELETE'
            })
        })
    })
});

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation,
    useDeleteProductMutation } = productsApiSlice;
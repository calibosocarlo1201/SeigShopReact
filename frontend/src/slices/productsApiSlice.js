import {PRODUCTS_URL, UPLOAD_URL} from '../constants'
import apiSlice from './apiSlice'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({pageNumber, keyword}) => ({
                url:PRODUCTS_URL,
                params: {
                    pageNumber,
                    keyword,
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (prodId) => ({
                url: `${PRODUCTS_URL}/${prodId}`
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
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
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products'],
        })
    })
});

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation,
    useDeleteProductMutation, useCreateReviewMutation } = productsApiSlice;
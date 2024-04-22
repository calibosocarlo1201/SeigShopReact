import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constants'

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Products', 'Order', 'User'],
    endpoints : () => ({})
});

export default apiSlice;
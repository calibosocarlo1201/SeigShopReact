import {USERS_URL} from '../constants'
import apiSlice from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }) ,
            keepUnusedDataFor: 5
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products'],
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => USERS_URL,
            keepUnusedDataFor: 5,
            providesTags: ['Users'],
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, 
    useGetUserDetailsQuery, useUpdateUserMutation} = userApiSlice;
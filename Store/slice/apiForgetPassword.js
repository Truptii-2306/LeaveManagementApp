import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const forgotApi = createApi({
  reducerPath: 'forgotApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4001',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOtp: builder.mutation({
      query: (obj) => ({
        url: '/auth/forgotpassword',
        method: 'POST',
        body: obj,
      }),
    }),
    setResetPassword: builder.mutation({
        query: (obj) => ({
          url: '/auth/reset-password',
          method: 'POST',
          body: obj,
        }),
      }),
  }),
  
});

export const { useGetOtpMutation, useSetResetPasswordMutation } = forgotApi;
export default forgotApi;
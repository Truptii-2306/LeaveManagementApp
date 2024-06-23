import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    getAllCategory: builder.query({
      query: () => "/inventory/allCategory",
    }),

    addCategory: builder.mutation({
        query: (newCategory) => ({
          url: '/inventory/category',
          method: 'POST',
          body: newCategory,
        }),
    }),
  }),

});

export const { useGetAllCategoryQuery, useAddCategoryMutation } = categoryApi;
export default categoryApi;
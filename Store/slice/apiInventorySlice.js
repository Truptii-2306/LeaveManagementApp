import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const inventoryApi = createApi({
  reducerPath: "inventoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4001",
    tagTypes: ['Inventory'],
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({

    getInventory: builder.query({
      query: () => "/inventory",
      providesTags: ['inventory'],
    }),

    getListOfInventoey:builder.query({
      query:()=>"/inventory/list_of_inventories",
      providesTags: ['inventory']
    }),

    addInventory: builder.mutation({
        query: (newInventory) => ({
          url: '/inventory',
          method: 'POST',
          body: newInventory,
        }),
        invalidatesTags:['inventory']
      }),

    deleteInventory: builder.mutation({
      query:(empId)=>({
        url:`/inventory/${empId}`,
        method:"DELETE",
      }),
      invalidatesTags: ['inventory'],
    })
    
  }),

});

export const { useGetInventoryQuery,useGetListOfInventoeyQuery, useAddInventoryMutation,useDeleteInventoryMutation } = inventoryApi;
export default inventoryApi;

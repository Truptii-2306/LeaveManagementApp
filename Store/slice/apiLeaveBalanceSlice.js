import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const leaveBalanceApi = createApi({
  reducerPath: "leaveBalanceApi",
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
    getRemainingBalance: builder.query({
      query: (employeeId) => `/leave/remaining-balance/${employeeId}`,
    }),

    getWorkFromHomeBalance: builder.query({
      query: (employeeId) => `/leave/remaining-balance/work-from-home/${employeeId}`,
    }),

    getAnnunalLeaveBalance: builder.query({
      query: () => "/holidays/remaining-holidays",
    }),
  }),
});

export const { useGetRemainingBalanceQuery,useGetWorkFromHomeBalanceQuery, useGetAnnunalLeaveBalanceQuery } = leaveBalanceApi;
export default leaveBalanceApi;

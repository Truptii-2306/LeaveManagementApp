import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const leaveReqApi = createApi({
  reducerPath: "leaveReqApi",
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

    getLeavesById: builder.query({
      query: (emplyeeId) => `/leave/${emplyeeId}/requests`,
      providesTags:[{ data: 'leave' }]
    }),

    applyLeave: builder.mutation({
      query: (leave) => ({
        url: "/leave",
        method: "POST",
        body: leave,
      }),
      invalidatesTags: [{ data: 'leave' }]
    }),

    getEmpOnLeaveToday:builder.query({
      query:()=>({
        url:"/leave/employees/employees-leave-on-today"
      }),
      providesTags: [{ data: 'leave' }]
    }),

    getPendingRequest:builder.query({
      query: () => `/leave/employees/pending-requests`,
      providesTags:[{data:"leave"}]
    }),

    getPendingRequestById:builder.query({
      query: (emp_id) => `/leave/${emp_id}/pending-requests`,
      providesTags:[{data:"leave"}]
    }),

    updateLeaveStatus:builder.mutation({
      query:({ id, status }) => ({
        url: `/leave/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags:[{data:"leave"}]
    }),

    getRemainingBalance: builder.query({
      query: (employeeId) => `/leave/remaining-balance/${employeeId}`,
      providesTags:[{data:'LeaveBalance'}]
    }),

    getWorkFromHomeBalance: builder.query({
      query: (employeeId) => `/leave/remaining-balance/work-from-home/${employeeId}`,
      providesTags:[{data:'LeaveBalance'}]
    }),

    getAnnunalLeaveBalance: builder.query({
      query: () => "/holidays/remaining-holidays",
      providesTags:[{data:'LeaveBalance'}]
    }),
    }),
});

export const {
    useApplyLeaveMutation,
    useGetLeavesByIdQuery,
    useGetEmpOnLeaveTodayQuery,
    useGetPendingRequestQuery,
    useUpdateLeaveStatusMutation,
    useGetPendingRequestByIdQuery,
    useGetAnnunalLeaveBalanceQuery,
    useGetRemainingBalanceQuery,
    useGetWorkFromHomeBalanceQuery
} = leaveReqApi;
export default leaveReqApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const holidaysApi = createApi({
  reducerPath: "holidaysApi",
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
    getHolidays: builder.query({
      query: () => "/holidays",
      providesTags: [{ data: "Holidays" }],
    }),

    addHoliday: builder.mutation({
      query: ({ data1, file }) => ({
        url: "/holidays/upload",
        method: "POST",
        body: formData(data1, file),
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers;
        },
      }),
      invalidatesTags: [{ data: "Holidays" }],
    }),
    deleteHoliday: builder.mutation({
      query: (holidayId) => ({
        url: `/holidays/${holidayId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ data: "Holidays" }],
    }),
    
    upcomingHolidays:builder.query({
      query:()=>({
      url:"/holidays/upcoming",
          invalidatesTags: [{ data: "Holidays" }],
      })
  })
  }),
});

export const {
  useGetHolidaysQuery,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpcomingHolidaysQuery,
} = holidaysApi;
export default holidaysApi;

function formData(data1, file) {
  const formData = new FormData();
  formData.append("data1", JSON.stringify(data1));
  formData.append("file", file);
  return formData;
}

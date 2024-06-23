import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectApi = createApi({
  reducerPath: "projectApi",
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
    getProjects: builder.query({
      query: () => "/project",
      providesTags:[{ data: 'Project' }]
    }),

    getProjectById: builder.query({
      query: (projectId) => `/project/${projectId}`,
      providesTags:[{ data: 'Project' }]
    }),

    addProject: builder.mutation({
      query: (newProject) => ({
        url: "/project",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: [{ data: 'Project' }]
    }),

    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ data: 'Project' }]
    }),

    updateProject: builder.mutation({
      query: ({ id, updatedProjectDetails }) => ({
        url: `/project/${id}`,
        method: 'PATCH',
        body: updatedProjectDetails,
      }),
      invalidatesTags: [{ data: 'Project' }]
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} = projectApi;
export default projectApi;
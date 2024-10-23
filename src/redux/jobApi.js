import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


export const jobApi = createApi({
    reducerPath: "jobApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND }),
    tagTypes: ["Job"],
    endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: ({ page, limit }) => `jobs?page=${page}&limit=${limit}`,
          }),
        getJob: builder.query({
            query: (id) => ({
                url: `jobs/${id}`,
                method: "GET",
            }),
        }),
        createJob: builder.mutation({
            query: (data) => ({
                url: "jobs",
                method: "POST",
                body: data,
            }),
        }),
        updateJob: builder.mutation({
            query: (data) => ({
                url: `jobs/${data.id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteJob: builder.mutation({
            query: (id) => ({
                url: `jobs/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetAllJobsQuery, useGetJobQuery, useCreateJobMutation, useUpdateJobMutation, useDeleteJobMutation } = jobApi;
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"; // Use "react" for React projects

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND }),
    endpoints: (builder) => ({
        getClient: builder.query({
            query: (id) => `client/${id}`, // Ensure the endpoint is correct
        }),
        updateClient: builder.mutation({
            query: (data) => ({
                url: `client/${data.userId}`, 
                method: "PUT",
                body: data, // Send the data as the request body
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Client', id }], // Invalidate cache for the updated client
        }),
        deleteClient: builder.mutation({
            query: (id) => ({
                url: `client/${id}`, // Ensure the endpoint is correct
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Client', id }], // Invalidate cache for the deleted client
        }),
    }),
});

// Export hooks for usage in functional components
export const { useGetClientQuery, useUpdateClientMutation, useDeleteClientMutation } = clientApi;

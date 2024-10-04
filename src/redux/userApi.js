import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({

  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8080/api/` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `users/update-talent/${data.userId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} = userApi;

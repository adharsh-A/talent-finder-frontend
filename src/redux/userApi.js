import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({

  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),//foe only data object
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `users/update-talent/${data.userId}`,
        method: "PUT",
        body: data,
      }),
    }),//for whole profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `users/update-profile/${data.userId}`,
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
    getAllUsers: builder.query({
      query: ({page, limit}) => ({
        url: `users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      searchByData: builder.mutation({
        query: (searchParams) => ({
          url: 'users/search-data',
          method: 'POST',
          body: searchParams,
        }),
      })
    })
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useSearchByDataMutation,
  useUpdateProfileMutation,
} = userApi;


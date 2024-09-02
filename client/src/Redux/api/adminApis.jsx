import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const server = import.meta.env.VITE_SERVER_URL;

console.log(server);
export const adminApis = createApi({
  reducerPath: 'adminApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/users/` }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ id }) => ({
        url: `getAllUsers?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserDetails: builder.mutation({
      query: ({ modal, userId, id }) => ({
        url: `getUserDetails?id=${id}`,
        method: 'POST',
        body: { modal, userId },
      }),
    }),
    activateAccount: builder.mutation({
      query: ({ modal, userId, id }) => ({
        url: `activateAccout?id=${id}`,
        method: 'POST',
        body: { modal, userId },
      }),
      invalidatesTags: ['User'],
    }),
    userStats: builder.query({
      query: ({ id }) => ({
        url: `userStats?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {
  useUserStatsQuery,
  useActivateAccountMutation,
  useGetAllUsersQuery,
  useGetUserDetailsMutation,
} = adminApis;

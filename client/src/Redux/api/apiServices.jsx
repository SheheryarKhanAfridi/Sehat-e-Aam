import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
export const server = import.meta.env.VITE_SERVER_URL;

console.log(server);
export const allAPis = createApi({
  reducerPath: 'allApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/register/` }),
  endpoints: (builder) => ({
    registerDoctor: builder.mutation({
      query: ({ body }) => ({
        url: 'regDoctors',
        method: 'POST',
        body,
      }),
    }),
    registerPatients: builder.mutation({
      query: ({ body }) => ({
        url: 'regPatients',
        method: 'POST',
        body,
      }),
    }),
    registerLaboratory: builder.mutation({
      query: ({ body }) => ({
        url: 'regLaboratory',
        method: 'POST',
        body,
      }),
    }),
    registerInsuComp: builder.mutation({
      query: ({ body }) => ({
        url: 'regInsuranceComp',
        method: 'POST',
        body,
      }),
    }),
    registerPharmacyVendor: builder.mutation({
      query: ({ body }) => ({
        url: 'regPharmacyVendor',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation({
      query: ({ emailAddress, password, from }) => ({
        url: 'login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body: { emailAddress, password, from },
      }),
    }),
    adminLogin: builder.mutation({
      query: ({ name, password }) => ({
        url: 'adminLogin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body: { name, password },
      }),
    }),
  }),
});

export const getLoggedInUser = async (id) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/register/${id}`);
    return data.data.user;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const {
  useRegisterDoctorMutation,
  useRegisterPatientsMutation,
  useRegisterInsuCompMutation,
  useRegisterPharmacyVendorMutation,
  useRegisterLaboratoryMutation,
  useAdminLoginMutation,
  useLoginMutation,
} = allAPis;

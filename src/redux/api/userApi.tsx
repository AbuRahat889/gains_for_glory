import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const UsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllUsers: build.query({
      query: () => ({
        url: `/user/all-users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //get  user by params from admin dashboard
    getAllUsersByParams: build.query({
      query: (search) => ({
        url: `/user/all-users?search=${search}`,
        method: "GET",
        // params: { search },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetAllUsersByParamsQuery } = UsersApi;
export default UsersApi;

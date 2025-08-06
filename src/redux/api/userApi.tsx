import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const UsersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllUsers: build.query({
      query: ({ page, limit }) => ({
        url: `/user/all-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //get  user by params from admin dashboard
    getAllUsersByParams: build.query({
      query: ({ search, page, limit }) => ({
        url: `/user/all-users?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
        // params: { search },
      }),
      providesTags: ["user"],
    }),

    //update user status
    updateUserStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/user/change-status/${id}?status=${status}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllUsersByParamsQuery,
  useUpdateUserStatusMutation,
} = UsersApi;
export default UsersApi;

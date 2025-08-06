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
    //USer Request
    //update user status
    getUserRequest: build.query({
      query: ({ page, limit, type }) => ({
        url: `/community/request?type=${type}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //accept user request
    acceptUserRequest: build.mutation({
      query: ({ id, type }) => ({
        url: `/community/accept-request?id=${id}&communityName=${type}`,
        method: "put",
      }),
      invalidatesTags: ["user"],
    }),
    //delete user request
    blockUserRequest: build.mutation({
      query: ({ id, type }) => ({
        url: `/community/block-request?id=${id}&communityName=${type}`,
        method: "put",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllUsersByParamsQuery,
  useUpdateUserStatusMutation,

  // User Request
  useGetUserRequestQuery,
  useAcceptUserRequestMutation,
  useBlockUserRequestMutation,
} = UsersApi;
export default UsersApi;

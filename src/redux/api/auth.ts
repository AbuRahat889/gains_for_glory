import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create user api
    createUser: build.mutation({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //login user
    loginUser: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //get all user from admin dashboard
    getAllUsers: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //get me
    getMe: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    //get BLOCKED  user from admin dashboard
    blockedUsers: build.mutation({
      query: (id) => ({
        url: `/users/remove-user/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["user"],
    }),

    //forgot password
    forgotPassword: build.mutation({
      query: ({ email }) => ({
        url: `/auth/forget-password`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetMeQuery,
  useBlockedUsersMutation,
  useForgotPasswordMutation,
} = AuthApi;
export default AuthApi;

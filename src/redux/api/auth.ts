import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //login user
    loginUser: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    //get me
    getMe: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
  overrideExisting: true,
});

export const { useLoginUserMutation, useGetMeQuery } = AuthApi;
export default AuthApi;

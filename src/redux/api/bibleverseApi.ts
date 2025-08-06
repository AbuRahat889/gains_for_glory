import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const bibleverseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    createBibleVerse: build.mutation({
      query: (data) => ({
        url: `/bible/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dashboard"],
    }),
  }),
});

export const { useCreateBibleVerseMutation } = bibleverseApi;
export default bibleverseApi;

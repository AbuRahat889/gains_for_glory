import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllDashboardInfo: build.query({
      query: ({ year }) => ({
        url: `/user/total-income/${year}`,
        method: "GET",
        params: year,
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllDashboardInfoQuery } = DashboardApi;
export default DashboardApi;

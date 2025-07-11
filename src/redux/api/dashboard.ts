import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllDashboardInfo: build.query({
      query: ({ month, year }) => ({
        url: `/booking/admin/dashboard`,
        method: "GET",
        params: { month, year }
      }),
      providesTags: ["booking", "service", "user"],
    }),
  }),
});

export const { useGetAllDashboardInfoQuery } = DashboardApi;
export default DashboardApi;

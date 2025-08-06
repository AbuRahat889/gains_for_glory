import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const OrderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllorder: build.query({
      query: ({ status, page, limit }) => ({
        url: `/order/all-order?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetAllorderQuery } = OrderApi;
export default OrderApi;

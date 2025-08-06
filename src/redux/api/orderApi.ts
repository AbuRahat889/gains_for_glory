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
    //update order status
    updateOrderStatus: build.mutation({
      query: ({ id, orderStatus }) => ({
        url: `/order/update-order-status/${id}`,
        method: "PUT",
        body: { orderStatus },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useGetAllorderQuery, useUpdateOrderStatusMutation } = OrderApi;
export default OrderApi;

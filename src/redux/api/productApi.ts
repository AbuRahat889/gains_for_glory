import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all user from admin dashboard
    getAllProduct: build.query({
      query: () => ({
        url: `/product/all`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    //delete product by id
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    //create product by id
    createProduct: build.mutation({
      query: (formData) => ({
        url: `/product/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} = productApi;
export default productApi;

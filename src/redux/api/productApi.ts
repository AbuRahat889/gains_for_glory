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
    //get all user from admin dashboard
    getSingleProduct: build.query({
      query: (id) => ({
        url: `/product/${id}`,
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
    //create product by id
    editProduct: build.mutation({
      query: ({ formData, id }) => {
        if (formData instanceof FormData) {
          console.log("FormData contents:");
          for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        } else {
          console.log("formData is not FormData:", formData);
        }

        return {
          url: `/product/update/${id}`,
          method: "PUT",
          body: formData, // ✅ send raw FormData
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useEditProductMutation,
} = productApi;
export default productApi;

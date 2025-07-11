import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const BookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all booking
    getAllBooking: build.query({
      query: ({ page, limit }) => ({
        url: `/booking?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    //create booking
    createBooking: build.mutation({
      query: (bookingINfo) => ({
        url: `/booking`,
        method: "POST",
        body: bookingINfo,
      }),
      invalidatesTags: ["booking"],
    }),

    //delete booking
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
    //update booking /booking/status/:bookingId
    updateBookingStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/booking/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["booking"],
    }),
    //get all booking
    getTodayBooking: build.query({
      query: () => ({
        url: `/booking/today`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
  useGetTodayBookingQuery,
} = BookingApi;
export default BookingApi;

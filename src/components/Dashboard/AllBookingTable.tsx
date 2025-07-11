"use client";
import {
  useDeleteBookingMutation,
  useUpdateBookingStatusMutation,
} from "@/redux/api/booking";
import { AllBookingTableProps } from "@/Types/BookingItem";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const AllBookingTable: React.FC<AllBookingTableProps> = ({
  bookingInfo,
  isLoading,
}) => {

  //handle delete
  const [deleteFN] = useDeleteBookingMutation();
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteFN(id);
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const [updateFN] = useUpdateBookingStatusMutation();
  const handleUpdate = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateFN({ id, status: "COMPLETED" });
        if (res?.data?.data?.success) {
          Swal.fire({
            title: "Updated!",
            text: "Your file status has been update.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="p-6 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className=" text-[#4B5563] text-center">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">service Name</th>
              <th className="py-2 px-4">Customer’s Name</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4 ">Date</th>
              <th className="py-2 px-4">Add Ones</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Total Amount</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-t border-[#D1D5DB] text-sm text-[#4B5563] text-center animate-pulse">
                <td className="py-2 px-4">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-8 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-6 w-24 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-4 w-16 bg-gray-300 rounded mx-auto"></div>
                </td>
                <td className="py-2 px-4">
                  <div className="h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                </td>
              </tr>
            ) : (
              bookingInfo?.map((info: any, index: number) => (
                <tr
                  key={info?.id}
                  className="border-t border-[#D1D5DB] text-sm text-[#4B5563] text-center"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{info?.service}</td>
                  <td className="py-2 px-4">
                    {info?.user?.firstName} {info?.user?.lastName}
                  </td>
                  <td className="py-2 px-4">{info?.user?.phoneNumber}</td>
                  <td className="py-2 px-4">
                    {new Date(info.timeslot).toLocaleString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {info?.addOnes?.length}
                  </td>
                  <td className="py-2 px-4">
                    <h1
                      onClick={() => handleUpdate(info?.id)}
                      className={`py-1 px-1 rounded font-semibold text-white text-center cursor-pointer  ${
                        info?.status === "COMPLETED"
                          ? "bg-green-500"
                          : info?.status === "PENDING"
                          ? "bg-yellow-500"
                          : info?.status === "CANCELLED"
                          ? "bg-red-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {info?.status}
                    </h1>
                  </td>
                  <td className="py-2 px-4 text-center">{info?.totalAmount}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(info?.id)}
                      className="h-6 w-6 text-[#EF4444] hover:text-red-600"
                    >
                      <AiOutlineDelete className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookingTable;

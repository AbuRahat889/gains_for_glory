"use client";
import {
  useDeleteBookingMutation,
  useGetAllBookingQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/booking";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Pagination from "../../DatePicker/Pagination";
import deleteImage from "@/assets/icon/delete.svg";
import Image from "next/image";

const WorkoutcommunityTable = () => {
  // const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllBookingQuery({
    page: currentPage,
    limit: 10,
  });

  const totalPages = data?.data?.meta?.totalPage || 1;
  const currentItems = data?.data?.data || [];

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
    <div className=" bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className=" text-secondaryColor text-left text-base font-medium ">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4 ">Subscription</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4 text-center">Action</th>
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
              currentItems?.map((info: any, index: number) => (
                <tr
                  key={info?.id}
                  className="border-t border-[#D1D5DB] text-base text-textColor font-medium"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{info?.service}</td>
                  <td className="py-2 px-4">
                    {info?.user?.firstName} {info?.user?.lastName}
                  </td>
                  <td className="py-2 px-4">{info?.user?.phoneNumber}</td>

                  <td className="py-2 px-4 text-center">{info?.totalAmount}</td>

                  <td className="py-2 px-4">
                    <h1
                      onClick={() => handleUpdate(info?.id)}
                      className={`py-1 rounded font-semibold text-white text-center cursor-pointer  ${
                        info?.status === "COMPLETED"
                          ? "bg-[#7b61ff]"
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
                  <td className="py-2 px-4 flex justify-center">
                    <Image
                      onClick={() => handleDelete(info?.id)}
                      src={deleteImage}
                      alt="delete icon"
                      className="h-6 w-6 text-[#EF4444] hover:text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default WorkoutcommunityTable;

"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Pagination from "../ui/Pagination";
import deleteImage from "@/assets/icon/delete.svg";
import Image from "next/image";
import {
  useAcceptUserRequestMutation,
  useBlockUserRequestMutation,
  useGetUserRequestQuery,
} from "@/redux/api/userApi";

interface UserRequestTableProps {
  type: string;
}

const UserRequestTable = ({ type }: UserRequestTableProps) => {
  // const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetUserRequestQuery({
    type: type,
    page: currentPage,
    limit: 10,
  });

  const totalPages = data?.data?.meta?.totalPages || 1;
  const currentItems = data?.data?.data || [];

  //handle delete
  const [deleteFN] = useBlockUserRequestMutation();
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
        const res = await deleteFN({ id, type });
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

  // UPDATE STATUS
  const [updateFN] = useAcceptUserRequestMutation();
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
        const res = await updateFN({ id, type });

        if (res?.data?.success) {
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
            <tr className=" text-secondaryColor text-left text-sm md:text-base font-medium ">
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
                  className="border-t border-[#D1D5DB] text-sm md:text-base text-textColor font-medium"
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{info?.name || "N/A"}</td>
                  <td className="py-2 px-4">
                    {info?.user?.firstName} {info?.email || "N/A"}
                  </td>
                  <td className="py-2 px-4">{info?.location || "N/A"}</td>

                  <td className="py-2 px-4">{info?.subscription || "N/A"}</td>

                  <td className="py-2 px-4">
                    <h1
                      onClick={() => handleUpdate(info?.id)}
                      className={`py-1 rounded font-semibold text-white text-center cursor-pointer w-16 md:w-32 text-sm md:text-base  bg-[#7b61ff] `}
                    >
                      Approve
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

export default UserRequestTable;

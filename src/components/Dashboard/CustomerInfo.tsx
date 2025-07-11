"use client";
import { useBlockedUsersMutation } from "@/redux/api/auth";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  createdAt: string;
  status: string;
  // add other fields as needed
}

interface CustomerTableProps {
  currentItems: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ currentItems }) => {
  //handle delete
  const [deleteFN] = useBlockedUsersMutation();
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, BLOCKED it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteFN(id);
        if (res?.data?.success) {
          Swal.fire({
            title: "BLOCKED!",
            text: "This user has been BLOCKED.",
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
            <tr className="text-left text-[#4B5563]">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Customer’s Name</th>
              <th className="py-2 px-4">Emal</th>
              <th className="py-2 px-4">location</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item: any, index: number) => (
              <tr
                key={index}
                className="border-t border-[#D1D5DB] text-sm text-[#4B5563]"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  {item?.firstName} {item?.lastName}
                </td>
                <td className="py-2 px-4">{item?.email}</td>
                <td className="py-2 px-4">{item?.location}</td>
                <td className="py-2 px-4">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                </td>

                <td className="py-2 px-4">
                  <h1
                    className={`py-1 px-1 rounded font-semibold text-white text-center cursor-pointer  ${
                      item?.status === "ACTIVE"
                        ? "bg-green-500"
                        : item?.status === "BLOCKED"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {item?.status}
                  </h1>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(item?.id)}
                    className="h-6 w-6 text-[#EF4444] hover:text-red-600"
                  >
                    <AiOutlineDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;

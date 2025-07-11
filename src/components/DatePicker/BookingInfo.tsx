"use client";

import { useForm } from "react-hook-form";
// <-- import your input
import { useState } from "react";
import BookingSummary from "./BookingSummary";
import Button from "../Button";
import { useCreateBookingMutation } from "@/redux/api/booking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/auth";

export default function InfoForm() {
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: getMe } = useGetMeQuery("");
  const service = JSON.parse(localStorage.getItem("service") || "null");
  const category = JSON.parse(localStorage.getItem("category") || "null");
  const timeslot = JSON.parse(localStorage.getItem("timeslot") || "null");
  const selectedDate = JSON.parse(
    localStorage.getItem("selectedDate") || "null"
  );
  const selectedTime = JSON.parse(
    localStorage.getItem("selectedTime") || "null"
  );

  const serviceAmount = parseInt(
    JSON.parse(localStorage.getItem("serviceAmount") || "0")
  );

  const rawAddOnes = JSON.parse(localStorage.getItem("addOnes") || "[]");

  const addOnes = rawAddOnes.map(
    ({ name, price }: { name: string; price: number }) => ({
      name,
      price,
    })
  );

  const [bookingFN, { isLoading }] = useCreateBookingMutation();
  const onSubmit = async (data: any) => {
    const bookingINfo = {
      model: data?.model,
      category,
      service,
      addOnes,
      serviceAmount,
      timeslot,
    };

    try {
      const res = await bookingFN(bookingINfo);
  
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        router.push("/");
        localStorage.removeItem("addOnes");
        localStorage.removeItem("serviceAmount");
        localStorage.removeItem("category");
        localStorage.removeItem("service");
        localStorage.removeItem("category");
        localStorage.removeItem("timeslot");
      } else {
        toast.error("This timeslot is already booked");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="max-w-5xl mx-auto bg-[#f9f7f3] flex gap-10 flex-col lg:flex-row items-start justify-center ">
      <div className="w-full px-5 ">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add your info
          </h2>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span className="text-gray-700">Returning Customer</span>
            <a
              href="#"
              className="text-[#13A0C6] font-semibold hover:underline"
            >
              LOGIN HERE
            </a>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full space-y-5 max-w-xl mx-auto"
        >
          {/* Year Make and Model */}
          <div className="relative">
            <label
              htmlFor="Model"
              className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
                isFocused
                  ? "-top-2 text-sm text-blue-500"
                  : "-top-2 text-gray-400"
              }`}
            >
              Year Make and Model
            </label>
            <input
              id="Model"
              type="text"
              {...register("model", {
                required: "Model is required",
              })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
              placeholder=" "
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-2">
                {errors.location?.message as string}
              </p>
            )}
          </div>
          {/* firstName */}
          <div className="relative">
            <label
              htmlFor="firstName"
              className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
                isFocused
                  ? "-top-2 text-sm text-blue-500"
                  : "-top-2 text-gray-400"
              }`}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", {})}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              defaultValue={getMe?.data?.firstName}
              readOnly
              className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
              placeholder=" "
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName?.message as string}
              </p>
            )}
          </div>
          {/* lastName */}
          <div className="relative">
            <label
              htmlFor="lastName"
              className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
                isFocused
                  ? "-top-2 text-sm text-blue-500"
                  : "-top-2 text-gray-400"
              }`}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", {})}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              defaultValue={getMe?.data?.lastName}
              readOnly
              className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
              placeholder=" "
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName?.message as string}
              </p>
            )}
          </div>
          {/* email */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
                isFocused
                  ? "-top-2 text-sm text-blue-500"
                  : "-top-2 text-gray-400"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {})}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              defaultValue={getMe?.data?.email}
              readOnly
              className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
              placeholder=" "
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email?.message as string}
              </p>
            )}
          </div>
          {/* phoneNumber */}
          <div className="relative">
            <label
              htmlFor="phoneNumber"
              className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
                isFocused
                  ? "-top-2 text-sm text-blue-500"
                  : "-top-2 text-gray-400"
              }`}
            >
              phoneNumber
            </label>
            <input
              id="phoneNumber"
              type="text"
              {...register("phoneNumber", {})}
              defaultValue={getMe?.data?.phoneNumber}
              readOnly
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full border-2 bg-[#f9f7f3] border-gray-300  rounded-md px-3 pt-4 pb-2 outline-none"
              placeholder=" "
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phoneNumber?.message as string}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" className="w-full">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
      <BookingSummary selectedTime={selectedTime} selectedDate={selectedDate} />
    </div>
  );
}

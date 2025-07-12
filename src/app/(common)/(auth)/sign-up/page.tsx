"use client";

import { Button } from "@/components/ui/button";
import { useCreateUserMutation } from "@/redux/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page() {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm(); // Using the register function from React Hook Form

  const [createFN, { isLoading }] = useCreateUserMutation();
  const onSubmit = async (data: any) => {
    try {
      const res = await createFN(data);
      if (res?.data?.success) {
        toast.success(
          "Signed up successfully! Please check your email to verify your account."
        );
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-52 container mx-auto">
      <h1 className="text-3xl font-normal leading-normal text-primaryColor pb-10 text-center">
        Sign up into Gibby’s Auto Spa
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full space-y-5 max-w-xl mx-auto"
      >
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
            {...register("firstName", {
              required: "firstName is required",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            {...register("lastName", {
              required: "lastName is required",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            {...register("email", {
              required: "email is required",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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
            type="number"
            {...register("phoneNumber", {
              required: "phoneNumber is required",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
            placeholder=" "
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-2">
              {errors.phoneNumber?.message as string}
            </p>
          )}
        </div>
        {/* location */}
        <div className="relative">
          <label
            htmlFor="location"
            className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
              isFocused
                ? "-top-2 text-sm text-blue-500"
                : "-top-2 text-gray-400"
            }`}
          >
            location
          </label>
          <input
            id="location"
            type="text"
            {...register("location", {
              required: "location is required",
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
        {/* password */}
        <div className="relative">
          <label
            htmlFor="password"
            className={`absolute left-3 px-1 transition-all bg-[#f9f7f3] ${
              isFocused
                ? "-top-2 text-sm text-blue-500"
                : "-top-2 text-gray-400"
            }`}
          >
            password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "password is required",
            })}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none"
            placeholder=" "
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password?.message as string}
            </p>
          )}
        </div>
        <Button type="submit" variant="default" className="w-full">
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>

      <h1 className="my-3 text-center text-primaryColor text-xl leading-normal px-5 xl:px-0">
        <Link href={"/forgot-password"}>Forgotten account? </Link>
        <Link href={"/sign-in"}>· Already a customer? </Link>
      </h1>


    </div>
  );
}

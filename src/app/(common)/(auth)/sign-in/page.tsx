"use client";

import { useLoginUserMutation } from "@/redux/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Using the register function from React Hook Form

  const [loginFN, { isLoading }] = useLoginUserMutation();
  const onSubmit = async (data: any) => {
    try {
      const res = await loginFN(data);
      if (res?.data?.success) {
        Cookies.set("token", res?.data?.data?.accessToken);
        dispatch(
          setUser({
            token: res?.data?.data?.accessToken,
            user: res?.data?.data,
            isAuthenticated: true,
          })
        );
        toast.success("login successfully!");
        router.push("/");
      } else {
        const errorMessage =
          (res?.error &&
            "data" in res.error &&
            (res.error.data as any)?.message) ||
          (res?.error &&
            "message" in res.error &&
            (res.error as any).message) ||
          "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-52 container mx-auto">
      <h1 className="text-3xl font-normal leading-normal text-primaryColor pb-10 text-center">
        Log into Gibby’s Auto Spa
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center w-full"
      >
        <div className="w-2/4 space-y-5">
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
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
      <h1 className="my-3 text-center text-primaryColor text-xl leading-normal px-5 xl:px-0">
        <Link href={"/forgot-password"}>Forgotten account? </Link>
        <Link href={"/sign-up"} className="hover:underline">
          ·Sign up for Gibby’s Auto Spa 
        </Link>
      </h1>

   
    </div>
  );
}

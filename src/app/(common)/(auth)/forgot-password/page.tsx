"use client";

import Button from "@/components/Button";
import Blog from "@/components/Home/Blog";
import { useForgotPasswordMutation } from "@/redux/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Using the register function from React Hook Form
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const [forgotFN, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await forgotFN({ email: data?.email });

      if (res?.data?.success) {
        Swal.fire({
          title: "Email Sent!",
          text: "We've sent a password reset link to your email. Please check your inbox.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/"); // Redirect to home page
          }
        });
      } else {
        const error = res.error as any;
        const message =
          error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again later.";
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="py-52 max-w-xl  mx-auto">
        <div className="flex  flex-col items-center justify-center my-5 pb-8 border-b-4 border-[#7b7a79]">
          <h1 className="text-3xl font-normal leading-normal text-primaryColor pb-8 ">
            Forgot Password
          </h1>
          <h1 className="text-base font-normal text-left text-textColor leading-normal ">
            Welcome back to Seems that you lost your password to brandurl.com.
            Please enter your e-mail address
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center w-full border-b-4 border-[#7b7a79] pb-10 "
        >
          <div className="w-full space-y-5">
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
            <Button type="submit" variant="primary" className="w-full">
              {isLoading ? "Loading..." : "Send e-mail"}
            </Button>
          </div>
        </form>
        <h1 className="mt-10 text-xl leading-normal px-5 xl:px-0">
          <span className="text-[#7b7a79]">I remember it !</span>{" "}
          <Link href={"/sign-in"} className="text-[#c54e4f]">
            Log in
          </Link>
        </h1>
      </div>
      <Blog />
    </div>
  );
}

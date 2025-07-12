"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <div className="py-52 max-w-xl  mx-auto">
        <div className="flex  flex-col items-center justify-center my-5 pb-8 border-b-4 border-[#7b7a79]">
          <h1 className="text-3xl font-normal leading-normal text-primaryColor pb-8 ">
            Set New Password
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
            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute left-3 px-1 -top-2 text-sm bg-[#f9f7f3] text-gray-400"
              >
                New Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none pr-10"
                placeholder=" "
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 px-1 -top-2 text-sm bg-[#f9f7f3] text-gray-400"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full border-2 bg-[#f9f7f3] border-gray-300 rounded-md px-3 pt-4 pb-2 outline-none pr-10"
                placeholder=" "
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>

            <Button type="submit" variant="default" className="w-full">
              Set new password
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

    </div>
  );
}

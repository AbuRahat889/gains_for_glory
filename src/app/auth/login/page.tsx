"use client";

import Image from "next/image";
import image from "@/assets/loginPage.png";
import logo2 from "@/assets/logo.svg";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import backgroundImage from "@/assets/background.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "@/redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/components/ui/Loader";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

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
    <div
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
      className="flex flex-col md:flex-row  w-full bg-center bg-no-repeat bg-contain container mx-auto "
    >
      <ToastContainer />
      {/* Left Section */}
      <div className="hidden md:block relative max-h-dvh ">
        <Image
          src={image}
          alt="Fishing Trip"
          width={800}
          height={600}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 relative h-screen  pb-5 flex flex-col justify-center items-start text-white">
        <div className="">
          <Link href={"/"}>
            <Image
              src={logo2}
              alt="logo"
              height={100}
              width={100}
              className=""
            />
          </Link>
        </div>

        <div className="text-start w max-w-3xl mx-auto">
          <div>
            <h2 className="text-[40px] text-[#171717] font-bold leading-normal  mb-2">
              Welcome, Admin! Manage{" "}
              <span className="text-primaryColor">AI Feetness</span> with Ease.
            </h2>
            <p className="text-base text-[#747474] font-medium  mb-6">
              Monitor business activity, customer engagement, and platform
              performance.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full  mt-10">
            <label
              htmlFor="email"
              className="text-base font-bold text-[#171717] block mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              value={'admin@gmail.com'}
              readOnly
              className="w-full border-2 border-[#747474] rounded-md p-3 outline-none text-[#747474]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}

            <label
              htmlFor="password"
              className="text-base font-bold text-[#171717] block mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                defaultValue={'123456'}
                minLength={5}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full border-2 border-[#747474] rounded-md p-3 outline-none text-[#747474]"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#747474]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}

            <Button
              type="submit"
              variant="default"
              className="w-full mt-6 font-bold text-base py-5"
            >
              {isLoading ? <Loader /> : " Log In to Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

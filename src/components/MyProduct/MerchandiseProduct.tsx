"use client";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";
import { Button } from "../ui/button";
import Link from "next/link";

export type FormValues = {
  name: string;
  price: number;
  email: string;
  photos: string[];
  description: string;
};

export default function MerchandiseProduct() {
  const methods = useForm<FormValues>();
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleUpload = async (formData: FormData): Promise<string[] | void> => {
    console.log(formData);
    // const res = await uploadFile(formData).unwrap();

    // return res?.success ? res?.data?.images : [];
  };
  const sizes = ["S", "M", "L", "XL", "2XL"];
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", { ...data, selectedSizes });
  };

  return (
    <div className="mt-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 flex flex-col md:flex-row gap-8 w-full justify-between"
        >
          <div className="w-full">
            <FormInput<FormValues>
              name="name"
              placeholder="Write product name here...."
            />
            <FormInput<FormValues>
              name="price"
              placeholder="Write product Price here...."
              type="number"
            />
            <textarea
              {...methods.register("description")}
              id="discription"
              rows={5}
              placeholder="Write product description here...."
              className="w-full px-3 py-3 border-2 border-[#D9D9D9] rounded-sm text-[#999] text-base font-medium outline-none"
            ></textarea>
            {methods.formState.errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {methods.formState.errors.description.message}
              </p>
            )}

            {/* size guide  */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-medium text-gray-700">Size</h1>
                <button
                  type="button"
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Link href={"/"} className="w-4 h-4 mr-1" />
                  Size Guide
                </button>
              </div>

              <div className="flex gap-3 md:gap-5 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-2 md:px-4 py-2 md:py-3 text-sm md:text-lg font-medium rounded-md border transition-all duration-200 ${
                      selectedSizes.includes(size)
                        ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                        : "bg-[#edeef4] text-[#999999] border-[#D9D9D9] hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSizes.length > 0 && (
                <p className="text-xs text-gray-500">
                  Selected sizes: {selectedSizes.join(", ")}
                </p>
              )}
            </div>
          </div>
          <div className="flex w-full justify-end items-end">
            <div className="w-full space-y-6">
              <UploadMedia name="photos" onUpload={handleUpload} />
              <Button type="submit" variant="default" className="w-full p-6">
                Create
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

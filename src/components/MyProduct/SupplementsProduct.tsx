"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";
import { Button } from "../ui/button";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { toast } from "react-toastify";

export type FormValues = {
  name: string;
  price: number;
  email: string;
  photos: string[];
  description: string;
  details: string;
  features: string;
};

export default function SupplementsProduct() {
  const methods = useForm<FormValues>();
  const [createProductFN, { isLoading }] = useCreateProductMutation();
  const formData = new FormData();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const bodyData = {
      name: data?.name,
      category: "merchandise",
      price: data?.price,
      keyFeature: data?.features,
      productDetails: data?.details,
      productDescription: data?.description,
    };

    data?.photos.forEach((photo) => {
      formData.append("productImage", photo);
    });
    formData.append("bodyData", JSON.stringify(bodyData));
    try {
      const response = await createProductFN(formData).unwrap();
      console.log(response);
      if (response?.success) {
        methods.reset();
        toast.success(response?.message || "Product created successfully!");
        window.location.reload();
        // Optionally, you can show a success message or redirect
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="mt-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 flex flex-col md:flex-row  gap-8 w-full justify-between"
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

            {/* features */}
            <textarea
              {...methods.register("features")}
              id="features"
              rows={5}
              placeholder="Write product key features here...."
              className="w-full px-3 py-3 border-2 border-[#D9D9D9] rounded-sm text-[#999] text-base font-medium outline-none"
            ></textarea>
            {methods.formState.errors.features && (
              <p className="mt-1 text-sm text-red-500">
                {methods.formState.errors.features.message}
              </p>
            )}
            {/* details */}
            <textarea
              {...methods.register("details")}
              id="details"
              rows={5}
              placeholder="Write product details area here...."
              className="w-full px-3 py-3 border-2 border-[#D9D9D9] rounded-sm text-[#999] text-base font-medium outline-none"
            ></textarea>
            {methods.formState.errors.details && (
              <p className="mt-1 text-sm text-red-500">
                {methods.formState.errors.details.message}
              </p>
            )}
            <textarea
              {...methods.register("description")}
              id="description"
              rows={5}
              placeholder="Write product description here...."
              className="w-full px-3 py-3 border-2 border-[#D9D9D9] rounded-sm text-[#999] text-base font-medium outline-none"
            ></textarea>
            {methods.formState.errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {methods.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="flex w-full justify-end items-end">
            <div className="w-full space-y-6">
              <UploadMedia name="photos" />
              <Button type="submit" variant="default" className="w-full p-6">
                {isLoading ? "Loading..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

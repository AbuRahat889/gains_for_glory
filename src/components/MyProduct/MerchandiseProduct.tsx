"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetSingleProductQuery,
} from "@/redux/api/productApi";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export type FormValues = {
  name: string;
  price: number;
  selectedSizes: string[];
  photos: string[];
  description: string;
};

export default function MerchandiseProduct() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const { data } = useGetSingleProductQuery(id, { skip: !id });
  const methods = useForm<FormValues>({
    defaultValues: {
      name: data?.data?.result?.name || "",
      price: data?.data?.result?.price || 0,
      selectedSizes: data?.data?.result?.size || [],
      photos: data?.data?.result?.image?.[0] || [],
      description: data?.data?.result?.productDescription || "",
    },
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const sizes = ["S", "M", "L", "XL", "2XL"];
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const [createProductFN, { isLoading }] = useCreateProductMutation();
  const [editProductFN, { isLoading: isLoadingEdit }] =
    useEditProductMutation();
  const formData = new FormData();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const bodyData = {
      name: data?.name,
      category: "merchandise",
      price: data?.price,
      // keyFeature: "emample",
      // productDetails: '',
      productDescription: data?.description,
      size: selectedSizes,
    };
    data?.photos.forEach((photo) => {
      formData.append("productImage", photo);
    });
    formData.append("bodyData", JSON.stringify(bodyData));
    try {
      if (id) {
        const response = await editProductFN({ formData, id }).unwrap();
        console.log(response);
        if (response?.success) {
          methods.reset();
          setSelectedSizes([]);
          toast.success(response?.message || "Product updated successfully!");
          router.push("/my-product");
          // Optionally, you can show a success message or redirect
        }
        return;
      }

      const response = await createProductFN(formData).unwrap();
      if (response?.success) {
        methods.reset();
        setSelectedSizes([]);
        toast.success(response?.message || "Product created successfully!");
        window.location.reload();
        // Optionally, you can show a success message or redirect
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // set default values for form fields
  useEffect(() => {
    if (data?.data?.result) {
      methods.reset({
        name: data.data.result.name || "",
        price: data.data.result.price || 0,
        selectedSizes: data.data.result.size || [],
        photos: data.data.result.image || [], // note: should be string[] or File[]
        description: data.data.result.productDescription || "",
      });

      setSelectedSizes(data.data.result.size || []);
    }
  }, [data?.data?.result, methods]);

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
              // defaultValue={data?.data?.result?.name || ""}
            />
            <FormInput<FormValues>
              name="price"
              placeholder="Write product Price here...."
              type="number"
              // defaultValue={data?.data?.result?.price}
            />
            <textarea
              {...methods.register("description")}
              id="discription"
              rows={5}
              // defaultValue={data?.data?.result?.productDescription || ""}
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
                      selectedSizes.includes(size) ||
                      data?.data?.result?.size?.includes(size)
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
              <UploadMedia name="photos" />
              <Button type="submit" variant="default" className="w-full p-6">
                {isLoading || isLoadingEdit ? "Loading..." : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

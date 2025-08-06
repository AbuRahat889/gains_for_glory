"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import { Button } from "../ui/button";
import { useCreateBibleVerseMutation } from "@/redux/api/bibleverseApi";
import { toast } from "react-toastify";

type FormValues = {
  title: string;
  description: string;
};

export default function AddDailyBible() {
  const methods = useForm<FormValues>();

  const [updateBibleVerse, { isLoading }] = useCreateBibleVerseMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await updateBibleVerse(data).unwrap();
      console.log("Response:", res);
      if (res?.success) {
        methods.reset();
        toast.success(res?.message || "Bible verse created successfully!");
      }
    } catch (error) {
      console.error("Error creating Bible verse:", error);
    }
    console.log(data);
  };
  return (
    <div className="pt-9 h-[90vh]">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5 max-w-3xl "
        >
          <div className="w-full">
            <FormInput<FormValues>
              name="title"
              label="Add Daily Bible"
              placeholder="Write product name here...."
              // defaultValue={data?.data?.result?.name || ""}
            />

            <div>
              <h1 className="block text-base font-medium text-[#000] mb-2">
                Description
              </h1>
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
            </div>
          </div>
          <div className="flex w-full justify-end items-end">
            <div className="w-full space-y-6">
              <Button type="submit" variant="default" className="w-full p-6">
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

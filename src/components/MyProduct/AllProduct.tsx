"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductQuery } from "@/redux/api/productApi";

export default function AllProduct() {
  const { data } = useGetAllProductQuery({});

  return (
    <div className="min-h-screen mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data?.data?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

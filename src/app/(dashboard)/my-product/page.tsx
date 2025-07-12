import MyProductTab from "@/components/MyProduct/MyProductTab";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="p-4 md:p-8 bg-white border my-6 mx-12 rounded-sm">
        <MyProductTab />
      </div>
    </div>
  );
}

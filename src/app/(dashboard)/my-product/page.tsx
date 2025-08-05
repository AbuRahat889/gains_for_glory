import MyProductTab from "@/components/MyProduct/MyProductTab";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="bg-white border my-6 px-5 rounded-sm">
        <MyProductTab />
      </div>
    </div>
  );
}

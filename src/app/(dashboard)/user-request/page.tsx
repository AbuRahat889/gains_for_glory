import UserRequestTab from "@/components/UserRequest/UserRequestTab";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="bg-white border my-6 mx-5 rounded-sm">
        <UserRequestTab />
      </div>
    </div>
  );
}

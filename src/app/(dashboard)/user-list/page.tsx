import AllUserTab from "@/components/UserList/UserListTab";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="p-4 md:p-8 bg-white border my-6 mx-12 rounded-sm">
        <AllUserTab />
      </div>
    </div>
  );
}

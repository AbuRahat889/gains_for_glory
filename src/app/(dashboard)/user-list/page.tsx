import AllUserTab from "@/components/UserList/UserListTab";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="bg-white border my-6 px-5 rounded-sm">
        <AllUserTab />
      </div>
    </div>
  );
}

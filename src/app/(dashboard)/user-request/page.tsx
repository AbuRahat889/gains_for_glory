import React from "react";
import UserInfoTab from "../../../components/Dashboard/UserInfo/UserInfoTab";

export default function page() {
  return (
    <div className="min-h-screen bg-white mt-32">
      <div className="p-4 md:p-8 bg-white border my-6 mx-12 rounded-sm">
        <UserInfoTab />
      </div>
    </div>
  );
}

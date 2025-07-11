// "use client";

// import AllBookingTable from "@/components/Dashboard/AllBookingTable";
// import Pagination from "@/components/DatePicker/Pagination";
// import { useGetAllBookingQuery } from "@/redux/api/booking";
// import React, { useState } from "react";
// const AllBooking = () => {
//   // const itemsPerPage = 15; // Number of items to display per page
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading } = useGetAllBookingQuery({
//     page: currentPage,
//     limit: 10,
//   });

//   const totalPages = data?.data?.meta?.totalPage || 1;
//   const currentItems = data?.data?.data || [];

//   return (
//     <>
//       {/* Header */}

//       <div className="md:flex justify-between items-center p-6 bg-white">
//         <h2 className="text-2xl leading-normal font-bold">New Booking</h2>
//       </div>

//       <AllBookingTable bookingInfo={currentItems} isLoading={isLoading} />

//       {/* Pagination */}
//       {/* Pagination */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </>
//   );
// };

// export default AllBooking;
"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllBookingTable from "@/components/Dashboard/AllBookingTable";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span
        style={{
          color: "#7b61ff",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Bible Study Community
      </span>
    ),
    children: <AllBookingTable />,
  },
  {
    key: "2",
    label: (
      <span
        style={{
          color: "#7b61ff",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        workout tips community
      </span>
    ),
    children: "workout tips community",
  },
  {
    key: "3",
    label: (
      <span
        style={{
          color: "#7b61ff",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        finance community
      </span>
    ),
    children: "finance community",
  },
];

const App: React.FC = () => (
  <Tabs
    className="custom-tabs"
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    tabBarStyle={{
      color: "red",
    }}
  />
);

export default App;

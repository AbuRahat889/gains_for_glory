"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllOrderListTable from "./AllOrderListTable";

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
        All Use List
      </span>
    ),
    children: <AllOrderListTable status="PENDING" />,
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
        Basic Plan
      </span>
    ),
    children: <AllOrderListTable status="COMPLETED" />,
  },
];

const AllOrderTab: React.FC = () => (
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

export default AllOrderTab;

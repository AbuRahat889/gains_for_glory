"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllUserTable from "./AllUser";
import FreeTrialTable from "./FreeTrial";

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
    children: <AllUserTable />,
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
        Free Trial
      </span>
    ),
    children: <FreeTrialTable />,
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
        Basic Plan
      </span>
    ),
    children: <AllUserTable />,
  },
  {
    key: "4",
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
        Premium Plan
      </span>
    ),
    children: <AllUserTable />,
  },
];

const AllUserList: React.FC = () => (
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

export default AllUserList;

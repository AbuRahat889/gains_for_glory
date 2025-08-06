"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllUserTable from "./AllUserTable";
import SubscriptionTypeTable from "./SubscriptionTypeTable";

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
    children: <SubscriptionTypeTable search="BASIC" />,
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
    children: <SubscriptionTypeTable search="PREMIUM" />,
  },
];

const AllUserTab: React.FC = () => (
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

export default AllUserTab;

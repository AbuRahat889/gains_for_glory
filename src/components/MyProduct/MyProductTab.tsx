"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CreateVideo from "../Videos/CreateVideo";
import AllProduct from "./AllProduct";

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
        All Product
      </span>
    ),
    children: <AllProduct />,
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
        Upload New Product
      </span>
    ),
    children: <CreateVideo />,
  },
];

const MyProductTab: React.FC = () => (
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

export default MyProductTab;

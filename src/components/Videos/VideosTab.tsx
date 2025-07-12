"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import AllVideos from "./AllVideos";
import CreateVideo from "./CreateVideo";

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
        All Video
      </span>
    ),
    children: <AllVideos />,
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
        Create New
      </span>
    ),
    children: <CreateVideo />,
  },
];

const VideosTab: React.FC = () => (
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

export default VideosTab;

"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import BibleCommunityTable from "./BibleCommunityTable";
import WorkoutcommunityTable from "./WorkoutcommunityTable";
import FinanceCommunityTable from "./FinanceCommunityTable";

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
    children: <BibleCommunityTable />,
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
    children: <WorkoutcommunityTable />,
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
    children: <FinanceCommunityTable />,
  },
];

const UserInfoTab: React.FC = () => (
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

export default UserInfoTab;

"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Wrapper from "@/components/Wrapper";

import { OverView, Prize, MyProject, Rules, Submissions } from "./components";

const Event = () => {
  const [tab, setTab] = useState("1");

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader title="Testing" url={"/images/podcast-banner.svg"} />
      <Wrapper>
        <TabContext value={tab}>
          <TabList onChange={(_, value) => setTab(value)}>
            <Tab className="!text-base" label="Overview" value="1" />
            <Tab className="!text-base" label="Prizes" value="2" />
            <Tab className="!text-base" label="Submissions" value="3" />
            <Tab className="!text-base" label="Rules" value="4" />
            <Tab className="!text-base" label="My Project" value="5" />
          </TabList>
          <TabPanel value="1">
            <OverView />
          </TabPanel>
          <TabPanel value="2">
            <Prize />
          </TabPanel>
          <TabPanel value="3">
            <Submissions />
          </TabPanel>
          <TabPanel value="4">
            <Rules />
          </TabPanel>
          <TabPanel value="5">
            <MyProject />
          </TabPanel>
        </TabContext>
      </Wrapper>
    </div>
  );
};

export default Event;

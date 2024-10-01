"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Wrapper from "@/components/Wrapper";
// import { TabPanel } from '@/components/TabPanel'

const Event = () => {
  const [tab, setTab] = useState("1");

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader title="Testing" url={"/images/podcast-banner.svg"} />
      <Wrapper>
        {tab}
        <TabContext value={tab}>
          <TabList onChange={(_, value) => setTab(value)}>
            <Tab className="!text-base" label="Settings" value="1" />
            <Tab className="!text-base" label="Overview" value="2" />
            <Tab className="!text-base" label="Prizes" value="3" />
            <Tab className="!text-base" label="Submissions" value="4" />
            <Tab className="!text-base" label="Rules" value="5" />
            <Tab className="!text-base" label="My Project" value="6" />
          </TabList>

          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
          <TabPanel value="5">Item Five</TabPanel>
          <TabPanel value="6">Item Six</TabPanel>
        </TabContext>
      </Wrapper>
    </div>
  );
};

export default Event;

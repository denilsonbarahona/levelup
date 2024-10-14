"use client";

import { useState, useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Event } from "@/types/events";
import { useRouter, usePathname } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, Tab, Box } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Wrapper from "@/components/Wrapper";
import { withAuth } from "@/components/HOC/withAuth";
import { getEventById } from "@/services/event"; 

import { OverView, Prize, MyProject, Rules, Submissions } from "./components";
import { Project } from "@/types/project";
import { getProjects } from "@/services/projects";

const EventDetails = () => {
  const pathName = usePathname();

  const [tab, setTab] = useState("1");
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [submissions, setSubmissions] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getMySubmission = () => {
    
  }

  const handleGettingEventById = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!currentEvent) {
        const pathParams = pathName.split("/");
        const event = await getEventById(pathParams[2]?.trim());
        setCurrentEvent(event);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [currentEvent]);

  const handleGetSubmissionsForEvent = useCallback(async () => {
    try {
      if(!submissions) {
        const pathParams = pathName.split("/");
        const payload = {
          id_event: pathParams[2]?.trim()
        };
        const projects = await getProjects(payload);
        console.log("projects: ", projects)
        setSubmissions(projects);
      }
    } catch {
    } finally {
      
    }
  }, [submissions])

  useEffect(() => {
    handleGettingEventById();
    handleGetSubmissionsForEvent();
  }, [handleGettingEventById, handleGetSubmissionsForEvent]);

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader title={currentEvent?.title} url={"/images/podcast-banner.svg"} />
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
            <OverView event={currentEvent}/>
          </TabPanel>
          <TabPanel value="2">
            <Prize />
          </TabPanel>
          <TabPanel value="3">
            <Submissions event={currentEvent} submissions={submissions} />
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

export default withAuth(EventDetails);

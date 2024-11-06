"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { isAfter, isEqual } from "date-fns";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Event } from "@/types/events";
import { useRouter, usePathname } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, Tab, Box, Snackbar } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import Wrapper from "@/components/Wrapper";
import { withAuth } from "@/components/HOC/withAuth";
import { withOutAuth } from "@/components/HOC/withOutAuth";
import { getEventById, uploadEventImage, updateEvent } from "@/services/event";
import { OverView, Prize, MyProject, Rules, Submissions } from "./components";
import { Project, User } from "@/types/project";
import { getProjects, getUsers } from "@/services/projects";

const EventDetails = () => {
  const pathName = usePathname();

  const [tab, setTab] = useState("1");
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [userList, setUserList] = useState<User[]>();

  const [submissions, setSubmissions] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {}, [session?.access]);

  const isAdmin = useMemo(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",");
    return adminEmail?.includes(session?.user?.email as string);
  }, [session?.user]);

  const handleOpenSnackBar = useCallback(() => {
    setOpenSnackBar((prev) => !prev);
  }, [setOpenSnackBar]);

  const handleSubmitEdit = useCallback(
    async (newEvent: Event) => {
      try {
        setIsSubmitting(true);
        const pathParams = pathName.split("/");
        await updateEvent(pathParams[2]?.trim(), newEvent);
        const event = await getEventById(pathParams[2]?.trim());
        setCurrentEvent(event);
      } catch {
        handleOpenSnackBar();
      } finally {
        setIsSubmitting(false);
      }
    },
    [pathName],
  );

  const handleGettingEventById = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!currentEvent) {
        const pathParams = pathName.split("/");
        const event = await getEventById(pathParams[2]?.trim());
        console.log("Got Event:", event);
        setCurrentEvent(event);
      }

      if(!userList) {
        const response = await getUsers();
        console.log("Got Users: ", response);
        setUserList(response.users);
      }

    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [currentEvent]);

  const handleGetSubmissionsForEvent = useCallback(async () => {
    try {
      if (!submissions) {
        const pathParams = pathName.split("/");
        const payload = {
          id_event: pathParams[2]?.trim(),
        };
        const projects = await getProjects(payload);
        setSubmissions(projects);
      }
    } catch {
    } finally {
    }
  }, [submissions]);

  const ended = useMemo(() => {
    const end = currentEvent?.end_date
      ? new Date(currentEvent?.end_date)
      : new Date();

    return isAfter(end, new Date()) || isEqual(end, new Date());
  }, [currentEvent]);

  useEffect(() => {
    handleGettingEventById();
    handleGetSubmissionsForEvent();
  }, [handleGettingEventById, handleGetSubmissionsForEvent]);

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader
        title={currentEvent?.title}
        url={"/images/podcast-banner.svg"}
      />
      <Wrapper>
        <TabContext value={tab}>
          <TabList onChange={(_, value) => setTab(value)}>
            <Tab className="!text-base" label="Overview" value="1" />
            <Tab className="!text-base" label="Prizes" value="2" />
            {(isAdmin || ended) && (
              <Tab className="!text-base" label="Submissions" value="3" />
            )}
            <Tab className="!text-base" label="Rules" value="4" />
            <Tab className="!text-base" label="My Project" value="5" />
          </TabList>
          <TabPanel value="1">
            <OverView
              isAdmin={isAdmin as boolean}
              isSubmitting={isSubmitting}
              handleSubmitEdit={handleSubmitEdit}
              event={currentEvent}
            />
          </TabPanel>
          <TabPanel value="2">
            <Prize
              isAdmin={isAdmin as boolean}
              isSubmitting={isSubmitting}
              handleSubmitEdit={handleSubmitEdit}
              event={currentEvent}
            />
          </TabPanel>
          <TabPanel value="3">
            <Submissions event={currentEvent} submissions={submissions} />
          </TabPanel>
          <TabPanel value="4">
            <Rules
              isAdmin={isAdmin as boolean}
              isSubmitting={isSubmitting}
              handleSubmitEdit={handleSubmitEdit}
              event={currentEvent}
            />
          </TabPanel>
          <TabPanel value="5">
            <MyProject _event={currentEvent} _submissions={submissions} _userList={userList}/>
          </TabPanel>
        </TabContext>
      </Wrapper>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleOpenSnackBar}
        sx={{
          "& .MuiSnackbarContent-root": {
            fontSize: "1.5rem",
          },
        }}
        message="Error when update the event"
      />
    </div>
  );
};

export default EventDetails;

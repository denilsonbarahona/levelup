"use client";

import { FormEvent, useCallback, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { styled } from "@mui/material/styles";
import { Event } from "@/types/events";
import Wrapper from "@/components/Wrapper";
import {
  Input,
  Select,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import { eventSchema } from "@/utils/zod";
import { LOCATIONS, EVENT_STATUS, EVENT_ACCESS } from "@/constants";
import { getEventById, updateEvent } from "@/services/event";
import { withAuth } from "@/components/HOC/withAuth";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CardArticle = styled("article")(() => ({
  padding: "2.4rem",
  background: "#FFF0DD",
  borderRadius: "2rem",
  maxWidth: "70rem",
  marginInline: "auto",
  marginTop: "4rem",
}));

const NewEvent = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenSnackBar = useCallback(() => {
    setOpenSnackBar((prev) => !prev);
  }, [setOpenSnackBar]);

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      const pathParams = pathName.split("/");
      const form = new FormData(event.currentTarget);
      const payload = {
        title: form.get("title") as string,
        description: form.get("description") as string,
        start_date: form.get("start_date") as string,
        end_date: form.get("end_date") as string,
        location: form.get("location") as string,
        status: form.get("status") as string,
        access: form.get("access") as string,
      };

      console.log(payload, "payload");

      eventSchema
        .parseAsync(payload)
        .then(async () => {
          const response = await updateEvent(pathParams[3]?.trim(), {
            ...currentEvent,
            ...payload,
          } as Event);
          router.push(`/event/${response._id}`);
          event.currentTarget.reset();
        })
        .catch((error) => {
          console.log(error);
          handleOpenSnackBar();
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [],
  );

  const handleGettingEventById = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!currentEvent) {
        const pathParams = pathName.split("/");
        const event = await getEventById(pathParams[3]?.trim());
        setCurrentEvent(event);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [currentEvent]);

  useEffect(() => {
    handleGettingEventById();
  }, [[handleGettingEventById]]);

  if (isLoading) {
    return (
      <div className="grid h-screen w-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader
        backgroundColor="#FFF8F3"
        title="Edit hackathon"
        url={"/images/podcast-banner.svg"}
      />
      <Wrapper>
        <CardArticle>
          <form
            onSubmit={handleOnSubmit}
            className="mx-auto grid w-full gap-5 py-5"
          >
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Banner
              </label>
              <div className="flex w-fit items-center justify-between gap-4 rounded-[10px] border !border-[#a8a8a8] !bg-[#eeebeb] p-4 text-[#4A4A4A]">
                <img src="/images/upload.svg" />
                <div className="grid gap-2">
                  <p className="text-base font-bold">Add Multimedia</p>
                  <Button
                    component="label"
                    className="w-full !rounded-md !p-2 !text-base"
                    variant="contained"
                    role={undefined}
                  >
                    Browse Files
                    <VisuallyHiddenInput type="file" multiple />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Title
              </label>
              <Input
                name="title"
                id="title"
                className="w-full"
                defaultValue={currentEvent?.title}
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Description
              </label>
              <Input
                name="description"
                id="description"
                className="w-full"
                defaultValue={currentEvent?.description}
                placeholder="Enter Description"
              />
            </div>
            <div className="grid items-center gap-5 md:flex">
              <div className="w-full">
                <label className="block text-lg font-medium text-[#1E1E1E]">
                  Start date
                </label>
                <Input
                  name="start_date"
                  id="start_date"
                  type="date"
                  defaultValue={currentEvent?.start_date?.split("T")?.[0]}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <label className="block text-lg font-medium text-[#1E1E1E]">
                  End date
                </label>
                <Input
                  name="end_date"
                  id="end_date"
                  type="date"
                  defaultValue={currentEvent?.end_date?.split("T")?.[0]}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Location
              </label>
              <Select
                sx={{
                  width: "100%",
                  padding: "0rem",
                }}
                name="location"
                id="location"
                defaultValue={currentEvent?.location}
              >
                {LOCATIONS.map((item) => (
                  <MenuItem
                    sx={{ paddingLeft: ["0rem"] }}
                    className="!bg-white"
                    key={item}
                    value={item}
                  >
                    <Box
                      display="flex"
                      paddingInline="24px"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: ["1.6rem", "2rem"],
                          lineHeight: ["2.4rem", "3.6rem"],
                          fontWeight: 600,
                          cursor: "inherit",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Status
              </label>
              <Select
                name="status"
                id="status"
                defaultValue={currentEvent?.status}
                sx={{
                  width: "100%",
                  padding: "0rem",
                }}
              >
                {EVENT_STATUS.map((item) => (
                  <MenuItem
                    sx={{ paddingLeft: ["0rem"] }}
                    className="!bg-white"
                    key={item}
                    value={item}
                  >
                    <Box
                      display="flex"
                      paddingInline="24px"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: ["1.6rem", "2rem"],
                          lineHeight: ["2.4rem", "3.6rem"],
                          fontWeight: 600,
                          cursor: "inherit",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Access
              </label>
              <Select
                id="access"
                name="access"
                defaultValue={currentEvent?.access}
                sx={{
                  width: "100%",
                  padding: "0rem",
                }}
              >
                {EVENT_ACCESS.map((item) => (
                  <MenuItem
                    sx={{ paddingLeft: ["0rem"] }}
                    className="!bg-white"
                    key={item}
                    value={item}
                  >
                    <Box
                      display="flex"
                      paddingInline="24px"
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          fontSize: ["1.6rem", "2rem"],
                          lineHeight: ["2.4rem", "3.6rem"],
                          fontWeight: 600,
                          cursor: "inherit",
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button
              disabled={isSubmitting}
              className="!mt-14"
              variant="contained"
              type="submit"
            >
              {isSubmitting ? <CircularProgress /> : "Accept"}
            </Button>
          </form>
        </CardArticle>
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
        message="You should enter valid data"
      />
    </div>
  );
};

export default withAuth(NewEvent);

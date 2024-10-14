"use client";

import { FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { styled } from "@mui/material/styles";
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
import { createEvent, uploadEventImage } from "@/services/event";
import { withAuth } from "@/components/HOC/withAuth";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<any>();

  const handleOpenSnackBar = useCallback(() => {
    setOpenSnackBar((prev) => !prev);
  }, [setOpenSnackBar]);

  const handleChangeFile = useCallback((event: any) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  }, []);

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      const form = new FormData(event.currentTarget);
      const formData = new FormData();
      formData.append("archivo", file);
      const payload = {
        title: form.get("title"),
        description: form.get("description"),
        start_date: form.get("start_date"),
        end_date: form.get("end_date"),
        location: form.get("location"),
        status: form.get("status"),
        access: form.get("access"),
      };

      eventSchema
        .parseAsync(payload)
        .then(async () => {
          const response = await createEvent(payload);
          await uploadEventImage(
            response._id,
            formData,
            session?.signedToken as string,
          );
          router.push(`/event/${response._id}`);
          event?.currentTarget?.reset();
        })
        .catch((error) => {
          console.log(error, "error");
          handleOpenSnackBar();
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [file],
  );

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader
        backgroundColor="#FFF8F3"
        title="Create hackathon"
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
              <div className="flex items-center gap-2">
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-[111px] w-auto"
                  />
                )}
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
                      <VisuallyHiddenInput
                        onChange={handleChangeFile}
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                      />
                    </Button>
                  </div>
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
                defaultValue="UPCOMING"
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
                defaultValue="FREE"
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

"use client";

import SectionHeader from "@/components/SectionHeader";
import { styled } from "@mui/material/styles";
import Wrapper from "@/components/Wrapper";
import { Input, Select, MenuItem, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();

  return (
    <div className="mt-[-6.5rem] flex flex-col pb-2.5">
      <SectionHeader
        backgroundColor="#FFF8F3"
        title="Create hackathon"
        url={"/images/podcast-banner.svg"}
      />
      <Wrapper>
        <CardArticle>
          <form className="mx-auto grid w-full gap-5 py-5">
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
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Title
              </label>
              <Input className="w-full" placeholder="Enter title" />
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Description
              </label>
              <Input className="w-full" placeholder="Enter Description" />
            </div>
            <div className="grid items-center gap-5 md:flex">
              <div>
                <label className="block text-lg font-medium text-[#1E1E1E]">
                  Start date
                </label>
                <Input type="date" className="w-full" />
              </div>
              <div>
                <label className="block text-lg font-medium text-[#1E1E1E]">
                  End date
                </label>
                <Input type="date" className="w-full" />
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
              >
                <MenuItem
                  sx={{ paddingInline: ["0rem"] }}
                  className="!bg-white"
                >
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Status
              </label>
              <Select
                sx={{
                  width: "100%",
                  padding: "0rem",
                }}
              >
                <MenuItem
                  sx={{ paddingInline: ["0rem"] }}
                  className="!bg-white"
                >
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </div>
            <div>
              <label className="block text-lg font-medium text-[#1E1E1E]">
                Access
              </label>
              <Select
                sx={{
                  width: "100%",
                  padding: "0rem",
                }}
              >
                <MenuItem
                  sx={{ paddingInline: ["0rem"] }}
                  className="!bg-white"
                >
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingLeft: ["0rem"] }} className="!bg-white">
                  <Box display="flex" paddingInline="24px" alignItems="center">
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.6rem"],
                        fontWeight: 600,
                        cursor: "inherit",
                      }}
                    >
                      item
                    </Typography>
                  </Box>
                </MenuItem>
              </Select>
            </div>

            <Button className="!mt-14" variant="contained" type="submit">
              Accept
            </Button>
          </form>
        </CardArticle>
      </Wrapper>
    </div>
  );
};

export default NewEvent;

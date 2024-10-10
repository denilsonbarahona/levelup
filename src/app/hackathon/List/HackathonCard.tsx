import { useMemo } from "react";
import { format, isSameMonth, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { Box, Typography, styled } from "@mui/material";
import Image from "next/image";
import Button from "@/components/Button";
import useCheckViewport from "@/hooks/useCheckViewport";
import { sendGAEvent } from "@next/third-parties/google";
import { Event } from "@/types/events";

const CardArticle = styled("article")(({ theme }) => ({
  background: "#FFF0DD",
  borderRadius: "2rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-between",
  marginBottom: "2.4rem",
  position: "relative",
  [theme.breakpoints.down("md")]: {},
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "3.2rem",
  marginBottom: "3.2rem",
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: "3.2rem",
    marginBottom: "1.2rem",
  },
}));

const LabelContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "2rem",
  marginTop: "1.6rem",
  marginBottom: "3.2rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1.2rem",
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  background: "#FFF8F3",
  borderRadius: "24px",
  color: "#101010",
  height: "auto",
  padding: "0.8rem 1.6rem",
  lineHeight: "24px",
  fontWeight: "600",
  textAlign: "center",
  whiteSpace: "normal",
  overflowWrap: "break-word",
  [theme.breakpoints.down("md")]: {
    width: "fit-content",
    fontSize: "1.6rem",
  },
}));

const HackathonCard = ({ content }: { content: Event }) => {
  const { data: session } = useSession();
  const isAdmin = useMemo(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",");
    return adminEmail?.includes(session?.user?.email as string);
  }, [session?.user]);

  const { isMobile } = useCheckViewport();
  const formattedDate = useMemo(() => {
    if (content?.start_date && content?.end_date) {
      const start = parseISO(content.start_date);
      const end = parseISO(content.end_date);

      if (isSameMonth(start, end)) {
        return `${format(start, "MMM d")}-${format(end, "d, yyyy")}`;
      } else {
        return `${format(start, "MMM d")}-${format(end, "MMM d, yyyy")}`;
      }
    }
  }, [content]);
  return (
    <CardArticle>
      <Box sx={{ flex: 1, padding: ["2.4rem", "4rem"] }}>
        <LabelContainer>
          <Label>
            <Image
              src="/images/hackathon/icon/calendar.svg"
              width="24"
              height="24"
              className="mr-2"
              alt="Calendar Icon"
            ></Image>
            {formattedDate}
          </Label>
          <Label>
            {" "}
            <Image
              src="/images/hackathon/icon/location.svg"
              width="24"
              height="24"
              className="mr-2"
              alt="Location Icon"
            ></Image>
            {content.location}
          </Label>
        </LabelContainer>
        <Box>
          <Title> {content.title} </Title>
        </Box>
        <div className="flex items-center gap-4">
          <Button
            href={`/event/${content._id}`}
            color="primary"
            width={isMobile ? "100%" : "25rem"}
            onClick={() =>
              sendGAEvent("event", "hackathonClicked", { value: content.title })
            }
            disabled={content.status === "ENDED"}
          >
            {content.status}
          </Button>
          {isAdmin && (
            <Button
              href={`/event/update/${content._id}`}
              color="secondary"
              width={isMobile ? "100%" : "25rem"}
              onClick={() =>
                sendGAEvent("event", "hackathonClicked", {
                  value: content.title,
                })
              }
              disabled={content.status === "ENDED"}
            >
              Update Event
            </Button>
          )}
        </div>
      </Box>
      {!isMobile && (
        <Box>
          <img
            src="/images/hackathon/eth-argentina.svg"
            style={{
              height: "100%",
              objectFit: "contain",
              width: "auto",
              objectPosition: "bottom",
            }}
            alt="Hackathon"
          />
        </Box>
      )}
    </CardArticle>
  );
};

export default HackathonCard;

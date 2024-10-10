"use client";

import { useMemo, useState, useEffect, useCallback } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import HackathonCard from "./HackathonCard";
import AdaptableComponent from "./AdaptableSelect";
import { getEvents } from "@/services/event";
import { Event } from "@/types/events";
import {
  HACKATHON_DATE_LIST,
  HACKATHON_REGION_LIST,
  NORMAL_HEADER_HEIGHT,
} from "@/constants";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  boxSizing: "border-box",
}));

const CardBox = styled(Box)(() => ({
  gridTemplateColumns: "repeat(auto-fill, minmax(30rem, 1fr))",
  gap: "2.4rem",
}));

const List = () => {
  const trigger = useScrollTrigger();
  // const [filteredData, setFilteredData] = useState(Data);
  const [filteredData, setFilteredData] = useState<Event[]>([]);
  const [EventsData, setEventData] = useState<Event[]>([]);
  const [dateParams, setDateParams] = useState({
    category: "All time",
    level: HACKATHON_DATE_LIST[0],
  });
  const [regionParams, setRegionParams] = useState({
    category: "All regions",
    level: HACKATHON_REGION_LIST[0],
  });
  const [isSticky] = useState(true);
  const stickyTop = useMemo(
    () => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT),
    [trigger],
  );

  const handleGetEvents = useCallback(async () => {
    try {
      const events = await getEvents();
      setEventData(events);
      setFilteredData(events);
    } catch {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    const levelInfo = EventsData.filter((item) => {
      return (
        (item.status?.includes(dateParams.level) ||
          dateParams.level === "ALL TIME") &&
        (item.location?.includes(regionParams.level) ||
          regionParams.level === "All regions")
      );
    });
    setFilteredData(levelInfo);
  }, [dateParams, regionParams]);

  useEffect(() => {
    handleGetEvents();
  }, [handleGetEvents]);

  const handleChangeDate = (value) => {
    setDateParams((pre) => ({
      ...pre,
      level: value,
    }));
  };

  const handleChangeRegion = (value) => {
    setRegionParams((pre) => ({
      ...pre,
      level: value,
    }));
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AdaptableComponent
          stickyTop={stickyTop}
          isSticky={isSticky}
          dateParams={dateParams}
          regionParams={regionParams}
          handleChangeDate={handleChangeDate}
          handleChangeRegion={handleChangeRegion}
        />
        <CardBox>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <HackathonCard content={item} key={index} />
            ))
          ) : (
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <div className="mt-40 text-3xl">
                <p>No events on the horizon right now.</p>
                <p>Stay tuned for future updates!</p>
              </div>
            </Box>
          )}
        </CardBox>
      </Box>
    </Container>
  );
};
export default List;

"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DateSelect from "./DateSelect";
import RegionSelect from "./RegionSelect";
import Link from "next/link";

const AdaptableComponent = ({
  stickyTop,
  isSticky,
  dateParams,
  regionParams,
  handleChangeDate,
  handleChangeRegion,
}) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session } = useSession();
  const isAdmin = useMemo(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(",");
    return adminEmail?.includes(session?.user?.email as string);
  }, [session?.user]);

  return (
    <>
      {isMobileView ? (
        <>
          <div className="mb-[2.4rem] mt-[4rem] flex text-[4rem] font-medium max-md:my-[2.4rem] max-md:text-[2.4rem]">
            All Events
          </div>
          <div className="mb-[2.4rem] flex flex-col gap-4">
            {isAdmin && (
              <Link href="/event">
                <button className="rounded-full border border-black bg-white px-4 py-3 text-lg font-semibold">
                  Create Event
                </button>
              </Link>
            )}
            <div className="grid gap-4">
              <DateSelect
                top={stickyTop}
                sticky={isSticky}
                value={dateParams.level}
                onChange={handleChangeDate}
              />
              <RegionSelect
                top={stickyTop}
                sticky={isSticky}
                value={regionParams.level}
                onChange={handleChangeRegion}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="mb-[2.4rem] mt-[4rem] flex text-[4rem] font-medium max-md:my-[2.4rem] max-md:text-[2.4rem]">
          All Events
          <div className="ml-auto flex gap-4">
            {isAdmin && (
              <Link href="/event">
                <button className="rounded-full border border-black bg-white px-4 py-3 text-lg font-semibold">
                  Create Event
                </button>
              </Link>
            )}
            <DateSelect
              top={stickyTop}
              sticky={isSticky}
              value={dateParams.level}
              onChange={handleChangeDate}
            />
            <RegionSelect
              top={stickyTop}
              sticky={isSticky}
              value={regionParams.level}
              onChange={handleChangeRegion}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdaptableComponent;

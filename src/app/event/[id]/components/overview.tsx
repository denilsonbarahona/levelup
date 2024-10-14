import { Event } from "@/types/events";
import Timeline from "./timeline";

interface OverViewProps {
  event: Event | undefined;
}

export const OverView: React.FC<OverViewProps> = ({ event }) => {

  console.log("Overview: ", event);
  return (
    <div>
      <h2 className="text-lg font-medium">Overview</h2>
      <div className="mt-4 grid gap-3">
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

       { event != undefined && (<Timeline startDate={event?.start_date} endDate={event?.end_date} />)}

      <h2 className="mt-8 text-lg font-medium">Description</h2>
      <div className="mt-4 grid gap-3">
        <p className="text-base">
          {event?.description}
        </p>
      </div>

      <h2 className="mt-8 text-lg font-medium">Evaluation</h2>
      <div className="mt-4 grid gap-3">
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

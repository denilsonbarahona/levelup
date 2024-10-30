import { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { formatDistanceToNow, differenceInDays } from "date-fns";

interface TimelineProps {
  startDate: string; // e.g., "2024-10-01"
  endDate: string; // e.g., "2024-12-31"
  isSubmitting: boolean;
  handleSubmitStartDate: (start_date: string) => void;
  handleSubmitEndDate: (end_date: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  startDate,
  endDate,
  isSubmitting,
  handleSubmitStartDate,
  handleSubmitEndDate,
}) => {
  const [progress, setProgress] = useState(0);
  const [editing, setEditing] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalDays = differenceInDays(end, start);
    const daysElapsed = differenceInDays(now, start);

    const calculatedProgress = Math.min((daysElapsed / totalDays) * 100, 100);
    setProgress(calculatedProgress);
  }, [startDate, endDate]);

  return (
    <div className="mt-4 text-lg font-medium">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Start</h2>
            <button onClick={() => setEditing("start")}>
              <Edit />
            </button>
          </div>
          {editing === "start" ? (
            <div className="w-full">
              <input
                type="date"
                onChange={({ target }) => setStartDate(target.value)}
                defaultValue={startDate}
              />
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => setEditing("")}
                  className="rounded-lg border border-black bg-white px-4 text-base"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    await handleSubmitStartDate(start_date);
                    setEditing("");
                  }}
                  className="rounded-lg border border-black bg-green-200 px-4 text-base"
                >
                  {isSubmitting ? (
                    <div className="grid h-[25px] w-[50px] place-content-center">
                      <CircularProgress size="15px" />
                    </div>
                  ) : (
                    "update"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              {formatDistanceToNow(new Date(startDate), { addSuffix: true })}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">End</h2>
            <button onClick={() => setEditing("end")}>
              <Edit />
            </button>
          </div>
          {editing === "end" ? (
            <div className="w-full">
              <input
                type="date"
                onChange={({ target }) => setEndDate(target.value)}
                defaultValue={startDate}
              />
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => setEditing("")}
                  className="rounded-lg border border-black bg-white px-4 text-base"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    handleSubmitEndDate(end_date);
                    setEditing("");
                  }}
                  className="rounded-lg border border-black bg-green-200 px-4 text-base"
                >
                  {isSubmitting ? (
                    <div className="grid h-[25px] w-[50px] place-content-center">
                      <CircularProgress size="15px" />
                    </div>
                  ) : (
                    "update"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              {formatDistanceToNow(new Date(endDate), { addSuffix: true })}
            </p>
          )}
        </div>
      </div>

      <div className="relative h-2 rounded-full bg-gray-200">
        <div
          className="absolute h-2 rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute h-4 w-4 rounded-full bg-blue-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  );
};

export default Timeline;

import { useEffect, useState } from "react";
import { formatDistanceToNow, differenceInDays } from "date-fns";

interface TimelineProps {
  startDate: string; // e.g., "2024-10-01"
  endDate: string;   // e.g., "2024-12-31"
}

const Timeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);

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
    <div className="text-lg font-medium mt-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-left">
          <h3 className="font-semibold">Start</h3>
          <p className="text-gray-500">{formatDistanceToNow(new Date(startDate), { addSuffix: true })}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold">Close</h3>
          <p className="text-gray-500">{formatDistanceToNow(new Date(endDate), { addSuffix: true })}</p>
        </div>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full"
          style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
        />
      </div>

    </div>
  );
};

export default Timeline;
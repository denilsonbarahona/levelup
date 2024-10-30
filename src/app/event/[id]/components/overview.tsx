import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Event } from "@/types/events";
import Timeline from "./timeline";

interface OverViewProps {
  event: Event | undefined;
  isAdmin: boolean;
  isSubmitting: boolean;
  handleSubmitEdit: (event: Event) => Promise<void>;
}

export const OverView: React.FC<OverViewProps> = ({
  event,
  isSubmitting,
  isAdmin,
  handleSubmitEdit,
}) => {
  const [editing, setEditing] = useState("");
  const [overView, setOverView] = useState("");
  const [description, setDescription] = useState("");
  const [evaluation, setEvaluation] = useState("");

  const handleEdit = async (newEvent: Event) => {
    await handleSubmitEdit(newEvent);
    setEditing("");
    setOverView("");
    setDescription("");
    setEvaluation("");
  };

  const handleSubmitStartDate = async (start_date: string) => {
    await handleSubmitEdit({ ...event, start_date } as Event);
    setEditing("");
    setOverView("");
    setDescription("");
    setEvaluation("");
  };

  const handleSubmitEndDate = async (end_date: string) => {
    await handleSubmitEdit({ ...event, end_date } as Event);
    setEditing("");
    setOverView("");
    setDescription("");
    setEvaluation("");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Overview</h2>
        {isAdmin && (
          <button onClick={() => setEditing("Overview")}>
            <Edit />
          </button>
        )}
      </div>
      <div className="mt-4 grid gap-3">
        {editing === "Overview" ? (
          <div className="w-full">
            <textarea
              className="w-full text-base"
              onChange={({ target }) => setOverView(target.value)}
              defaultValue={event?.overview}
            />
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setEditing("")}
                className="rounded-lg border border-black bg-white px-4 text-base"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleEdit({ ...event, overview: overView } as Event)
                }
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
          <p className="text-base">{event?.overview}</p>
        )}
      </div>

      {event != undefined && (
        <Timeline
          handleSubmitStartDate={handleSubmitStartDate}
          handleSubmitEndDate={handleSubmitEndDate}
          startDate={event?.start_date}
          endDate={event?.end_date}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-lg font-medium">Description</h2>
        {isAdmin && (
          <button
            disabled={isSubmitting}
            onClick={() => setEditing("Description")}
          >
            <Edit />
          </button>
        )}
      </div>
      <div className="mt-4 grid gap-3">
        {editing === "Description" ? (
          <div className="w-full">
            <textarea
              className="w-full text-base"
              onChange={({ target }) => setDescription(target.value)}
              defaultValue={event?.description}
            />
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setEditing("")}
                className="rounded-lg border border-black bg-white px-4 text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit({ ...event, description } as Event)}
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
          <p className="text-base">{event?.description}</p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-lg font-medium">Evaluation</h2>
        {isAdmin && (
          <button onClick={() => setEditing("Evaluation")}>
            <Edit />
          </button>
        )}
      </div>
      {editing === "Evaluation" ? (
        <div className="w-full">
          <textarea
            className="w-full text-base"
            onChange={({ target }) => setEvaluation(target.value)}
            defaultValue={event?.evaluation}
          />
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setEditing("")}
              className="rounded-lg border border-black bg-white px-4 text-base"
            >
              Cancel
            </button>
            <button
              onClick={() => handleEdit({ ...event, evaluation } as Event)}
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
        <p className="text-base">{event?.evaluation}</p>
      )}
    </div>
  );
};

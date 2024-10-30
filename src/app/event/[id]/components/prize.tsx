import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Event } from "@/types/events";

interface PrizeProps {
  isAdmin: boolean;
  event: Event | undefined;
  isSubmitting: boolean;
  handleSubmitEdit: (event: Event) => Promise<void>;
}

export const Prize = ({
  event,
  isAdmin,
  isSubmitting,
  handleSubmitEdit,
}: PrizeProps) => {
  const [editing, setEditing] = useState("");
  const [prizes, setPrize] = useState("");

  const handleEdit = async (event: Event) => {
    await handleSubmitEdit(event);
    setPrize("");
    setEditing("");
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-lg font-medium">Prizes</h2>
        {isAdmin && (
          <button disabled={isSubmitting} onClick={() => setEditing("prizes")}>
            <Edit />
          </button>
        )}
      </div>
      <div className="mt-4 grid gap-3">
        {editing === "prizes" ? (
          <div className="w-full">
            <textarea
              className="w-full text-base"
              onChange={({ target }) => setPrize(target.value)}
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
                onClick={() => handleEdit({ ...event, prizes } as Event)}
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
          <p className="text-base">{event?.prizes}</p>
        )}
      </div>
    </div>
  );
};

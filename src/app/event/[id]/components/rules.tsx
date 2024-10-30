import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Event } from "@/types/events";

interface RulesProps {
  event: Event | undefined;
  isAdmin: boolean;
  isSubmitting: boolean;
  handleSubmitEdit: (event: Event) => Promise<void>;
}

export const Rules = ({
  event,
  isSubmitting,
  isAdmin,
  handleSubmitEdit,
}: RulesProps) => {
  const [editing, setEditing] = useState("");
  const [rules, setRules] = useState("");

  const handleEdit = async (event: Event) => {
    await handleSubmitEdit(event);
    setRules("");
    setEditing("");
  };

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-lg font-medium">Competition Rules</h2>
        {isAdmin && (
          <button onClick={() => setEditing("rules")}>
            <Edit />
          </button>
        )}
      </div>
      {editing === "rules" ? (
        <div className="w-full">
          <textarea
            className="w-full text-base"
            onChange={({ target }) => setRules(target.value)}
            defaultValue={event?.rules}
          />
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setEditing("")}
              className="rounded-lg border border-black bg-white px-4 text-base"
            >
              Cancel
            </button>
            <button
              onClick={() => handleEdit({ ...event, rules } as Event)}
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
        <p className="text-base">{event?.rules}</p>
      )}
    </div>
  );
};

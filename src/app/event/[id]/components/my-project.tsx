import { FormEvent, useCallback, useState } from "react";
import { Event } from "@/types/events";
import { Project } from "@/types/project";
import { Button, CircularProgress, Input } from "@mui/material";
import { projectSchema } from "@/utils/zod";
import { createProject } from "@/services/projects";

interface MyProjectProps {
  _event: Event | undefined;
  _submission: Project | undefined;
}

export const MyProject: React.FC<MyProjectProps> = ({ _event, _submission }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      // Create a FormData object from the form
      const form = new FormData(event.currentTarget);

      // Retrieve the value of the input with name="project-title"
      const projectTitle = form.get("project-title") as string;

      console.log("Project Title:", projectTitle);

      const payload = {
        name: projectTitle,
        event: _event?._id,
        team: "670493b7cf77398d7337fef4", // TODO: Get user id from DB
      };

      try {
        await projectSchema.parseAsync(payload);
        await createProject(payload);
        event.currentTarget.reset();
      } catch (error) {
        console.error("Validation or submission error:", error);
      } finally {
        setIsSubmitting(false);
        console.log("Submitted");
      }
    },
    [_event]
  );

  return (
    <div className="p-4">
      {_submission === undefined ? (
        <div>
          <h2 className="text-lg font-medium mb-4">You are not participating in this event</h2>
          <form
            onSubmit={handleOnSubmit}
            className="mx-auto grid w-full gap-5 py-5"
          >
            <Input
              name="project-title"
              id="project-title"
              className="w-full"
              defaultValue=""
              placeholder="Project Title"
            />
            <Button
              disabled={isSubmitting}
              className="mt-4 rounded-2xl bg-[#ff684b] px-20 py-2 text-3xl text-white"
              variant="contained"
              type="submit"
            >
              {isSubmitting ? <CircularProgress /> : "Join Event"}
            </Button>
          </form>
        </div>
      ) : (
        <ul className="space-y-2">
          {/* You can render submission details here */}
        </ul>
      )}
    </div>
  );
};
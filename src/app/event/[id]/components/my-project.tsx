import { FormEvent, useCallback, useEffect, useState } from "react";
import { Event } from "@/types/events";
import { Project, Team } from "@/types/project";
import { Button, CircularProgress, Input } from "@mui/material";
import { projectSchema } from "@/utils/zod";
import { createProject } from "@/services/projects";

interface MyProjectProps {
  _event: Event | undefined;
  _submissions: Project[] | undefined;
}

export const MyProject: React.FC<MyProjectProps> = ({ _event, _submissions }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myProject, setMyProject] = useState<Project>();
  const myId = "670493b7cf77398d7337fef4"

  useEffect(() => {
    getMyProject();
  }, [])

  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);

      // Create a FormData object from the form
      const form = new FormData(event.currentTarget);

      // Retrieve the value of the input with name="project-title"
      const projectTitle = form.get("project-title") as string;

      const payload = {
        name: projectTitle,
        event: _event?._id,
        team: myId, // TODO: Get user id from DB
      };

      console.log("Payload :", payload);

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

  const getMyProject = () => {
    let myProject: Team | undefined = undefined;

    _submissions?.forEach((submission) => {
        console.log("Team ", submission.teamMembers, myId)
        myProject = submission.teamMembers.find((member) => member._id === myId)
        console.log("My Proj", myProject)
    })

    setMyProject(myProject);
    return myProject;
  }

  const getTeam = (project: Project) => {
    let answer = "";
    answer = project.teamMembers?.map((member) => member.name).join(",")

    return answer;
    }

  return (
    <div className="p-4">
      {myProject === undefined ? (
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
          <li
              key={myProject?._id}
              className="border p-4 rounded-md shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{myProject?.project_name}</h3>
              <p>Name: {myProject?.project_name}</p>
              <p>Created At: {new Date(myProject?.createdAt).toLocaleDateString()}</p>
              <p>Team Members: {getTeam(myProject)}</p>
            </li>
        </ul>
      )}
    </div>
  );
};
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Event } from "@/types/events";
import { Project, User } from "@/types/project";
import { Button, CircularProgress, Input } from "@mui/material";
import { projectSchema } from "@/utils/zod";
import { createProject } from "@/services/projects";
import StepperForm from "./stepperform";

interface MyProjectProps {
  _event: Event | undefined;
  _submissions: Project[] | undefined;
  _userList: User[];
}

export const MyProject: React.FC<MyProjectProps> = ({
  _event,
  _submissions,
  _userList
}) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myProject, setMyProject] = useState<Project>();
  const myId = "670493b7cf77398d7337fef4";

  useEffect(() => {
    getMyProject();
  }, []);

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

      try {
        await projectSchema.parseAsync(payload);
        await createProject(payload);
        event.currentTarget.reset();
      } catch (error) {
        console.error("Validation or submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [_event],
  );

  const getMyProject = () => {
    
    console.log("Event:", _event);
    console.log("Submissions", _submissions);

    let myProject: Team | undefined = undefined;

    _submissions?.forEach((submission) => {
      console.log("Team ", submission.teamMembers, myId);
      myProject = submission.teamMembers.find((member) => member._id === myId);
      console.log("My Proj", myProject);
    });

    setMyProject(myProject);
    return myProject;
  };

  const getTeam = (project: Project) => {
    let answer = "";
    answer = project.teamMembers?.map((member) => member.name).join(",");

    return answer;
  };

  const getMyUser = (list: User[], id:string) => {
    if(list)
      return list.find(user => user._id === id);
  }

  return (
    <div className="p-4">
      {myProject === undefined ? (
        <div>
          <h2 className="mb-4 text-lg font-medium">
            Enter your project details to participate in this event
          </h2>
          <StepperForm _event={_event} userList={_userList} myUser={getMyUser(_userList, myId)} />
        </div>
      ) : (
        <ul className="space-y-2">
          <li
            key={myProject?._id}
            className="rounded-md border p-4 shadow-md transition hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{myProject?.project_name}</h3>
            <p>Name: {myProject?.project_name}</p>
            <p>
              Created At: {new Date(myProject?.createdAt).toLocaleDateString()}
            </p>
            <p>Team Members: {getTeam(myProject)}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

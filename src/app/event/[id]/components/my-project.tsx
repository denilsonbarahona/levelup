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
  _handleSubmitProject: (event: Project) => void;
}

export const MyProject: React.FC<MyProjectProps> = ({
  _event,
  _submissions,
  _userList,
  _handleSubmitProject,
}) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myProject, setMyProject] = useState<Project>();
  const myId = "670493b7cf77398d7337fef4";

  useEffect(() => {
    getMyProject();
  }, []);

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
        <div>
          <h2 className="mb-4 text-lg font-medium">
          {myProject === undefined ? ("Enter your project details to participate in this event") : ("Review or edit your submission")}
          </h2>
          <StepperForm _event={_event} userList={_userList} myUser={getMyUser(_userList, myId)} handleSubmitProject={_handleSubmitProject} />
        </div>
    </div>
  );
};

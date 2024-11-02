import { Event } from "@/types/events";
import { Project } from "@/types/project";

interface SubmissionsProps {
  event: Event | undefined;
  submissions: Project[] | undefined;
}

export const Submissions: React.FC<SubmissionsProps> = ({
  event,
  submissions,
}) => {
  const getTeam = (project: Project) => {
    let answer = "";
    answer = project.teamMembers?.map((member) => member.name).join(",");

    return answer;
  };

  return (
    <div className="p-4">
      {submissions === undefined || submissions?.length === 0 ? (
        <h2 className="text-lg font-medium">No submissions found</h2>
      ) : (
        <ul className="space-y-2">
          {submissions?.map((project) => (
            <li
              key={project._id}
              className="rounded-md border p-4 shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{project.project_name}</h3>
              <p>Status: {project.status}</p>
              <p>
                Created At: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p>Team Members: {getTeam(project)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

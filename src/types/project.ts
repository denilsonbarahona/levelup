export interface Project {
    _id: string;
    event: string;
    project_name: string;
    status: string;
    createdAt: string;
    teamMembers: string[];
    //TODO: EventInfo schema
    //eventInfo
  }
  
  export interface ProjectResponse {
    readonly project: Project;
  }
  
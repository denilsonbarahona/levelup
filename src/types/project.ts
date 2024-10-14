export interface Project {
    _id: string;
    event: string;
    project_name: string;
    status: string;
    createdAt: string;
    teamMembers: Team[];
    //TODO: EventInfo schema
    //eventInfo
  }

  export interface Team {
    avatarUrl: string;
    createdAt: string;
    githubId: string;
    isAdmin: boolean;
    name: string;
    _id: string;
  }
  
  export interface ProjectResponse {
    readonly project: Project;
  }
  
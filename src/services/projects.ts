import axios from "axios";
import { apiClient } from "@/utils/axios";
import { Project } from "@/types/project";

export const createProject = async (payload): Promise<Project> => {
  return apiClient
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}projects/register-project`, payload)
    .then((data) => data.data.event);
};

export const getProjects = async (payload): Promise<Project[]> => {
    console.log("payload: ", payload);
  return apiClient
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}projects/get-projects`, payload)
    .then((data) => data.data);
};

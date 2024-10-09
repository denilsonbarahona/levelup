import { apiClient } from "@/utils/axios";

export const createEvent = async (payload) => {
  return apiClient.post("/events/register-event", payload);
};

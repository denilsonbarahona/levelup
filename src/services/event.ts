import axios from "axios";
import { apiClient } from "@/utils/axios";
import { Event } from "@/types/events";

export const createEvent = async (payload): Promise<Event> => {
  return apiClient
    .post("/events/register-event", payload)
    .then((data) => data.data.event);
};

export const getEvents = async (): Promise<Event[]> => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}events/get-events`)
    .then((data) => data.data);
};

export const getEventById = async (eventId: string): Promise<Event> => {
  return apiClient
    .get(`/events/get-event/${eventId}`)
    .then((data) => data.data);
};

export const updateEvent = async (
  eventId: string,
  payload: Event,
): Promise<Event> => {
  return apiClient
    .put(`/events/update-event/${eventId}`, payload)
    .then((data) => data.data);
};

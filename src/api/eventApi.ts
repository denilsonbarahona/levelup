import apiClient from "./apiClient";

//Agregar endpoints aqui

export const getEventWithId = async (eventId: string) => {
    const response = await apiClient.get(`/events/get-event/${eventId}`);
    return response.data;
}
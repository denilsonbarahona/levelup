export interface Event {
  project_id: string[];
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  status: string;
  access: string;
  _id: string;
  createdAt: string;
  projectDetails: string[];
  __v: number;
  icon_url?: string;
}

export interface EventResponse {
  readonly event: Event;
}

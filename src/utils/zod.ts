import { z } from "zod";

export const eventSchema = z.object({
  /* banner: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Banner is required." }), */
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  access: z.string().min(1, { message: "Access is required" }),
});

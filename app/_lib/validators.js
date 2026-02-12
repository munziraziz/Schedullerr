import z from "zod";

export const usernameSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});

export const eventFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    duration: z.number().int().positive("Duration must be positive").max(100, "Duration must be at most 100 characters long"),
    isPrivate: z.boolean(),

}); 

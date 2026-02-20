import { Major_Mono_Display } from "next/font/google";
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

export const daySchema = z.object({
    isAvailable:z.boolean(),
    startTime:z.string().optional(),
    endTime: z.string().optional(),

}).refine((data)=>{
    if(data.isAvailable){
        return data.startTime < data.endTime
    }
    return true
},{
    message : "End time must be more than the start time.",
    path: ["endTime"],

})


export const availabilitySchema = z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap:z.number().min(0,"Time gap must be 0 or more minutes").int(),
})

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, "Invalid date format"),
    time: z.string().regex(/^[0-9]{2}:[0-9]{2}$/, "Invalid time format"),
    additionalInfo: z.string().optional(),
})
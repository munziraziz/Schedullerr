"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { eventFormSchema } from "@/app/_lib/validators";
import { includes } from "zod";

export async function createEvent(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const validatedData = eventFormSchema.parse(data);
    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    })

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const event = await db.event.create({
            data: {
                ...validatedData,
                userId: user.id
            }
        });
        return event;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }

    return event;       

}   

export async function getUsersEvents(){
      const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
        where: { clerkUserId: userId }
    })

    if (!user) {
        throw new Error("User not found");
    }

     const events = await db.event.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: "desc"
            },
            include:{
                _count:{
                    select:{
                        bookings:true
                    },
                },
            }

        });

return {events , username: user.username }


}
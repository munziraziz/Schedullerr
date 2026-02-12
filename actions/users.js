"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma"

export async function updateUserUsername(username) {
    const { userId } = await auth(); // Fix casing
    if (!userId) { // Fix casing
        throw new Error("Unauthorized");
    }

    const existingUsername = await db.user.findUnique({
        where: { username }
    })
    if (existingUsername && existingUsername.clerkUserId !== userId) { // Fix comparison
        throw new Error("Username already exists");
    }

    await db.user.update({
        where: {
            clerkUserId: userId // Fix casing
        },
        data: {
            username
        }
    })

    const client = await clerkClient(); // Await client
    await client.users.updateUser(userId, { // Use client instance
        username,
    })
    return { success: true }
}

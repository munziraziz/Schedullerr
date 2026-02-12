import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    try {
        const logedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        })
        if (!logedInUser) {
            const name = `${user.firstName} ${user.lastName}`;
            try {
                return await db.user.create({
                    data: {
                        clerkUserId: user.id,
                        username: user.username ?? `${user.firstName}-${user.lastName}${user.id.slice(-4)}`,
                        email: user.emailAddresses[0].emailAddress,
                        name,
                        imageUrl: user.imageUrl
                    }
                })
            } catch (error) {
                console.error("Error creating user in checkUser:", error);
                throw error;
            }
        }
        return logedInUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}
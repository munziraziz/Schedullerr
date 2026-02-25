"use server"
import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";

export async function createBooking(bookingData) {
    try {
        const { name, email, additionalInfo, date, time, eventId } = bookingData;
        const event = await db.event.findUnique({
            where: { id: eventId },
            include: { user: true }
        });

        if (!event) {
            throw new Error("Event not found");
        }

        const clerk = await clerkClient();
        const { data } = await clerk.users.getUserOauthAccessToken(
            event.user.clerkUserId,
            "google", // Fixed: removed oauth_ prefix
        )

        const token = data[0]?.token;
        if (!token) {
            throw new Error("Event creator has not connected Google Calendar");
        }

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });

        const calendarApi = google.calendar({ version: "v3", auth: oauth2Client });

        const requestId = Math.random().toString(36).substring(7);
        const eventData = {
            summary: `${name} - ${event.title}`,
            description: additionalInfo || "",
            start: {
                dateTime: bookingData.startTime, // Already in ISO format with Z
            },
            end: {
                dateTime: bookingData.endTime, // Already in ISO format with Z
            },
            attendees: [
                { email: email },
                { email: event.user.email }
            ],
            conferenceData: {
                createRequest: {
                    requestId: requestId,
                    conferenceSolutionKey: {
                        type: "hangoutsMeet", // Fixed: added missing 's'
                    },
                }
            }
        };

        console.log("Sending event to Google Calendar:", JSON.stringify(eventData, null, 2));

        const meetResponse = await calendarApi.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: eventData,
        });

        const meetLink = meetResponse.data.hangoutLink;
        const googleEventId = meetResponse.data.id;

        if (!meetLink || !googleEventId) {
            throw new Error("Failed to generate Google Meet link. Please ensure your Google Calendar is correctly connected.");
        }

        const bookings = await db.booking.create({
            data: {
                name: name,
                email: email,
                additionalInfo: additionalInfo,
                startTime: new Date(bookingData.startTime),
                endTime: new Date(bookingData.endTime),
                userId: event.userId,
                eventId: event.id,
                meetLink,
                googleEventId,
            }
        })

        return { success: true, booking: bookings, meetLink }


    } catch (error) {
        console.error("Error creating booking:", error);
        if (error.response && error.response.data) {
            console.error("Google API detailed error:", JSON.stringify(error.response.data, null, 2));
        }
        return {
            success: false,
            error: error.response?.data?.error?.message || error.message,
            details: error.response?.data?.error?.errors
        }
    }


}
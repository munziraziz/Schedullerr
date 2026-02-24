import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { google } from "googleapis";

export async function createBooking(bookingData){
    try{
        const {name,email,additionalInfo,date,time,eventId} = bookingData;
        const booking = await db.booking.findUnique({
            where:{
                id:bookingData.eventId,
                include:{user:true}
            }
        })
        if(!event){
            throw new Error("Event not found");
        }

        const {data} = clerkClient.users.getUserOauthAccessToken(
            event.user.clerkUserId,
            "oauth_google",
        )

        const token = data[0]?.token;
        if(!token){
            throw new Error("event creater has not connected Google Calendar");
        }

        const oauth2Client = google.auth.OAuth2();
        oauth2Client.setCredentials({access_token:token});

        const calendarApi = google.calendar({version:"v3",auth:oauth2Client});

        const meetResponse = await calendarApi.events.insert({
            calendarId:"primary",
            conferenceDataVersion:1,
            requestBody:{
                summary:`${booking.name}-${event.title}`,
                description:bookingData.additionalInfo,
                start:{
                    dateTime:bookingData.startTime,
                },
                end:{
                    dateTime:bookingData.endTime,
                },
                attendees:[
                    {email:bookingData.email},
                    {email:event.user.email}
                ],
                conferenceData:{
                    createRequest:{
                        requestId:`${event.id}-${Date.now()}`,
                        
                    }
                }
            },
            
        });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    const bookings = await db.booking.create({
        data:{
            name: bookingData.name,
            email: bookingData.email,
            additionalInfo: bookingData.additionalInfo,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            userId:event.userId,
            eventId:event.id,
            meetLink,
            googleEventId,
        }
    })
           


    return {success: true, booking, meetLink}


    }catch(error){ 
        console.error("Error creating booking:", error);
        return {success: false, error: error.message}
    }  
     
    
}
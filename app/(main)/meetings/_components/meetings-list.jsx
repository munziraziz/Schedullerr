import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video } from "lucide-react"
import { format } from "date-fns";
import { Clock } from "lucide-react";
import CancelMeetingButton from "./cancel-meeting";



const MeetingsList = ({ meetings, type }) => {
    if (meetings.length === 0) {
        return (
            <p>No {type} meetings found</p>
        )
    }
    
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"> 
            {meetings.map((meeting) => {
                return (
                    <Card key={meeting.id} className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle>{meeting.event.title}</CardTitle>
                            <CardDescription>with {meeting.name}</CardDescription>
                            <CardDescription>&quot;{meeting.additionalInfo}&quot;</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center mb-2">
                                <Calendar className="mr-2 h-4 w-4"/>
                                <span>{format (new Date(meeting.startTime), "MMMM d, yyyy" ) }</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <Clock className="mr-2 h-4 w-4"/>
                                <span>{format (new Date(meeting.endTime), "h:mm a" )} - {" "}</span> 
                                <span>{format (new Date(meeting.startTime), "h:mm a" ) }</span>
                            </div>
                            
                              {meeting.meetLink && 
                                (
                                <div className="flex items-center">
                                <Video className="mr-2 h-4 w-4"/>
                                <a href={meeting.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    Join Meeting    
                                </a>
                                </div>
                                )}

                        </CardContent>
                        <CardFooter className="flex justify-between">
              <CancelMeetingButton meetingId={meeting.id} />
            </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}

export default MeetingsList


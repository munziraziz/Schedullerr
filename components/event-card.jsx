"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Link, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
const EventCard = ({ event, username , isPublic = false }) => {

   const [isCopied, setIsCopied] = useState(false)
   const router = useRouter()

    const handleCopy = async () => {
       try {
        await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`)
         setIsCopied(true)
         setTimeout(() => {
             setIsCopied(false)
         }, 2000)
       } catch (error) {
        console.log('Failed to copy : ' ,err)
       }
    }
    return (
       <Card className="flex flex-col justify-between cursor-pointer">
  <CardHeader>
    <CardTitle className="text-2xl">{event.title}</CardTitle>
    <CardDescription className="flex justify-between">
        <span>
        Duration: {event.duration} minutes | {event.isPrivate ? "Private " : "Public "}
</span>
<span>
    {event._count.bookings}  bookings
</span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p> {event.description.substring(0, event.description.indexOf("."))}</p>
    <p>Created by: {username}</p>
  </CardContent>
  {!isPublic && <CardFooter className="flex justify-between">
    <Button onClick={handleCopy}> <Link className="mr-2 h-4 w-4" />{isCopied ? "Copied!" : "Copy Link" }</Button>
    <Button variant="destructive"> <Trash2 className="mr-2 h-4 w-4" />Delete </Button>
  </CardFooter>}
</Card>
    )
}
export default EventCard

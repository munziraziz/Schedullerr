import { getEventDetails } from "@/actions/events"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import EventDetails from "./_components/event-details"
import BookingForm from "./_components/booking-form"
import { getEventAvailabilty } from "@/actions/events"


export async function generateMetaData({ params }) {
    const { username, eventid } = await params;
    const event = await getEventDetails(username, eventid)
    if (!event) {
        return {
            title: "Event Not Found",
            description: "Event Not Found",
        }
    }
    return {
        title: `Book a ${event.title} with ${event.user.name} | Schedullerr`,
        description: `Schedule a ${event.duration}-minute ${event.title} with ${event.user.name}.`,
    }
}

const EventPage = async ({ params }) => {
    const { username, eventid } = await params;
    const event = await getEventDetails(username, eventid)
    const availability = await getEventAvailabilty(eventid)
    console.log(availability)
    if (!event) {
        notFound();
    }
    return (
        <div className="flex flex-col justify-center lg:flex-row px-4 py-8">

            <EventDetails event={event} />
            <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm event={event} availability={availability} />
            </Suspense>
        </div>
    )
}
export default EventPage
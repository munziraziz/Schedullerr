import { Suspense } from "react"
import EventCard from "@/components/event-card"
import { getUsersEvents } from "@/actions/events"

export default function EventsPage() {
    return (

        <Suspense fallback={<div>Loading Events...</div>}>
            <Events />
        </Suspense>
    )


}
const Events = async () => {
    const { events, username } = await getUsersEvents();

    if (events.length === 0) {
        return (
            <div>
                {/* <h1>Events Page</h1> */}
                <p>No events found</p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event} username={username} />
            ))}
        </div>
    )
}


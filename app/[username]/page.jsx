import { getUsersByUsername } from "@/actions/users"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EventCard from "@/components/event-card"



export async function generateMetaData({params}){
        const user = await getUsersByUsername(params.username)
         if (!user) {
            return{
                title : "User Not Found",
                description : "User Not Found",
            }
        }
        return {
            title : `${user.name}'s Profile | Schedullerr`,
            description : `Book an event with ${user.name}.View available public events and schedules`,
            
        }

}

const Userpage = async ({ params }) => {
    const { username } = await params
    const user = await getUsersByUsername(username)
    if (!user) {
        notFound();
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center mb-8">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.imageUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mb-2 mt-2 ">{user.name}</h1>
            </div>
            <p className="text-gray-600 text-center">
                Welcome to my schedulling page. Please select an event below to book a call with me.</p>

            {user.events.length === 0 ? (
                <p className="text-center text-gray-500">No events found</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {user.events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            username={username}
                            isPublic
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default Userpage
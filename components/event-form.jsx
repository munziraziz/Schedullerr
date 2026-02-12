"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventFormSchema } from "@/app/_lib/validators"
import { useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Controller } from "react-hook-form"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import useFetch from "@/hooks/use-fetch"
import { createEvent } from "@/actions/events"



const EventForm = ({ onSubmitForm }) => {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            duration: 30,
            isPrivate: true,
        },
    })

    const [data, loading, error, fnCreateEvent] = useFetch(createEvent);


    const onSubmit = async (data) => {
        const event = await fnCreateEvent(data)
        if (event) onSubmitForm(event)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4">
                <div className=" text-gray-700">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <input type="text" id="title" {...register("title")} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div className=" text-gray-700">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <input type="text" id="description" {...register("description")} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div className=" text-gray-700">
                    <label htmlFor="duration" className="text-sm font-medium">Duration</label>
                    <input type="number" id="duration" {...register("duration", { valueAsNumber: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                </div>
                <div className=" text-gray-700">
                    <label htmlFor="isPrivate" className="text-sm font-medium">Select Privacy</label>

                    <Controller
                        name='isPrivate'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value ? "true" : "false"} onValueChange={(value) => field.onChange(value === "true")}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Privacy" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Private</SelectItem>
                                    <SelectItem value="false">Public</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.isPrivate && <p className="text-red-500 text-sm">{errors.isPrivate.message}</p>}
                </div>

            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            <Button type="submit" disabled={loading} className="w-full mt-4 text-white py-2 rounded-md">{loading ? "Creating Event..." : "Create Event"}</Button>
        </form>
    )
}

export default EventForm
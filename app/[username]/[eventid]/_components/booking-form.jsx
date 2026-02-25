"use client"
import { bookingSchema } from "@/app/_lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import { timeSlots } from "@/app/(main)/availability/data"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useFetch from "@/hooks/use-fetch"
import { createBooking } from "@/actions/bookings"
const BookingForm = ({ event, availability }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(bookingSchema)
    })
    const availableDays = availability.map((day) => new Date(day.date));
    const timeSlots = selectedDate ? availability.find((day) => day.date === format(selectedDate, "yyyy-MM-dd"))?.slots || [] : [];

    useEffect(() => {
        setValue("date", format(selectedDate, "yyyy-MM-dd"))
    }, [selectedDate])

    useEffect(() => {
        setValue("time", selectedTime)
    }, [selectedTime])

    const [data, loading, error, fnCreateBooking] = useFetch(createBooking);

    const onSubmit = async (data) => {
        console.log("Form submitted with this data : ", data);

        if (!selectedDate || !selectedTime) {
            console.error("date or time is not selected")
            return
        }

        const startTime = new Date(`${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`);
        const endTime = new Date(startTime.getTime() + event.duration * 60000);

        const bookingData = {
            name: data.name,
            email: data.email,
            additionalInfo: data.additionalInfo,
            eventId: event.id,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        }

        await fnCreateBooking(bookingData)
    }

    if (data?.success) {
        return (
            <div className="text-center p-10 border bg-white">
                <h2 className="text-2xl font-bold mb-4">Booking created successfully</h2>
                {data.meetLink && (<p>Join the meeting : {" "}
                    <a href={data.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline">
                        {data.meetLink}
                    </a></p>)}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 p-10 border bg-white">
            {error && <p className="text-red-500 text-center font-bold">{error.message}</p>}
            {data && !data.success && (
                <p className="text-red-500 text-center font-bold">
                    {data.error}
                    {data.details && (
                        <span className="block text-xs font-normal">
                            {JSON.stringify(data.details)}
                        </span>
                    )}
                </p>
            )}
            <div className="md:h-96 flex flex-col md:flex-row gap-5">
                <div className="w-full"> <DayPicker mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        setSelectedDate(date)
                        setSelectedTime(null)
                    }}
                    disabled={{ before: new Date() }}
                    modifiers={{
                        available: availableDays
                    }}
                    modifiersClassNames={{
                        available: "bg-blue-400 text-white rounded-full"
                    }}
                />
                </div>
            </div>
            <div className="w-full h-full md:overflow-scroll no-scrollbar">
                {selectedDate && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                            {timeSlots.map((slot) => (
                                <Button key={slot} onClick={() => setSelectedTime(slot)}
                                    variant={selectedTime === slot ? "default" : "outline"}
                                >
                                    {slot}
                                </Button>

                            ))}
                        </div>
                    </div>
                )}
            </div>


            {selectedTime && <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input type="text" placeholder="Name" {...register("name")} />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <Input type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <Textarea type="additionalInfo" placeholder="Additional Info" {...register("additionalInfo")} />
                    {errors.additionalInfo && <p className="text-red-500">{errors.additionalInfo.message}</p>}
                </div>

                <Button type="submit" disabled={loading} className="w-full">{loading ? "Scheduling..." : "Schedule Event"}</Button>
            </form>}
        </div>
    )
}
export default BookingForm
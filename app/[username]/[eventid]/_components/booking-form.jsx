"use client"
import { bookingSchema } from "@/app/_lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
const BookingForm = ({ event, availability }) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(bookingSchema)
    })
    const availableDays = availability.map((day) => new Date(day.date))
    return (
        <div>
            <div>
                <div> <DayPicker mode="single"
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
                /></div>
            </div>
            <div></div>
        </div>
    )
}
export default BookingForm
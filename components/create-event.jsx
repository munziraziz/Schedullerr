"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import EventForm from "./event-form";

export default function CreateEventDrawer() {

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const create = searchParams.get("create");
        if (create === "true") {
            setOpen(true);
        }
    }, [searchParams])

    const handleClose = () => {
        setOpen(false);
        if (searchParams.get("create") === "true") {
            router.replace(window?.location?.pathname)
        }
    }
    return (
        <Drawer open={open} onClose={handleClose}>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Create New Event</DrawerTitle>
                </DrawerHeader>
                <EventForm
                    onSubmitForm={() => {
                        handleClose();
                    }}
                />
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

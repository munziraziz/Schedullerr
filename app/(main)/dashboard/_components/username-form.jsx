"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/_lib/validators";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUserUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";

const UsernameForm = ({ initialUsername }) => {
    const [origin, setOrigin] = useState("");
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: initialUsername,
        },
    });

    useEffect(() => {
        setOrigin(window.location.origin);
        setValue("username", initialUsername);
    }, [initialUsername, setValue]);

    const [data, loading, error, UpdateUserUsername] = useFetch(updateUserUsername);

    const onSubmit = (data) => {
        UpdateUserUsername(data.username)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <div className="flex items-center gap-2">
                    <span>{origin}</span>
                    <Input {...register("username")} placeholder="username" />
                </div>
                {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
            </div>
            {loading && <BarLoader className="mb-4" width={"100%"} color="#3b82f6" />}
            <Button type="submit">Update Username</Button>
        </form>
    );
};

export default UsernameForm;    

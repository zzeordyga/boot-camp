"use client";
import { useEffect, useState } from "react";
import { timeHelper } from "@/lib/timeHelper";

interface TimeProps {
    date: Date | null;
    className?: string;
}

export default function Time({ date, className }: TimeProps) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30_000);
        return () => clearInterval(id);
    }, []);

    if (!date) {
        return <span className={className}>Just now</span>;
    }

    return (
        <time
            dateTime={date.toISOString()}
            title={date.toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
            })}
            className={className}
        >
            {timeHelper({ date, now })}
        </time>
    );
}
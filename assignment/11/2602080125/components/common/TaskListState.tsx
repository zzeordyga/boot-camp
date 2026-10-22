"use client";
import { ClipboardList, SearchX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const TaskListSkeleton = () => (
    <ul className="space-y-3" aria-busy="true">
        {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                <Skeleton className="size-4 rounded" />
                <div className="flex flex-1 flex-col gap-2">
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
                <Skeleton className="size-8 rounded-md" />
                <Skeleton className="size-8 rounded-md" />
            </li>
        ))}
    </ul>
);

interface TaskEmptyStateProps {
    variant: "empty" | "noResults";
    message: string;
}

export const TaskEmptyState = ({ variant, message }: TaskEmptyStateProps) => {
    const Icon = variant === "empty" ? ClipboardList : SearchX;

    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Icon className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    );
};
import type { TaskResponseData } from "@/types/taskTypes";
import { getTaskStatus } from "@/utils/taskStatus";

export type SortBy = "created" | "title" | "deadline";
export type SortOrder = "asc" | "desc";
export type StatusFilter = "all" | "todo" | "done" | "overdue";

interface SortTasksProps {
    tasks: TaskResponseData[];
    sortBy: SortBy;
    order: SortOrder;
}

interface FilterTasksProps {
    tasks: TaskResponseData[];
    filter: StatusFilter;
}

export const sortTasks = ({ tasks, sortBy, order }: SortTasksProps) => {
    const list = [...tasks];

    if (sortBy === "created") return order === "desc" ? list : list.reverse();

    const dir = order === "asc" ? 1 : -1;

    return list.sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title) * dir;

        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir;
    });
};

export const filterTasks = ({ tasks, filter }: FilterTasksProps) => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => getTaskStatus({ task }) === filter);
};
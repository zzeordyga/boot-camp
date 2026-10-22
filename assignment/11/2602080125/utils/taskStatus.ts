export type TaskStatus = "todo" | "done" | "overdue";

export interface TaskStatusInput {
    done: boolean;
    dueDate?: string | null;
}

export interface TaskStatusProps {
    task: TaskStatusInput;
    now?: Date;
}

export const getTaskStatus = ({ task, now = new Date() }: TaskStatusProps) => {
    if (task.done) return "done";
    if (task.dueDate && new Date(task.dueDate).getTime() < now.getTime()) return "overdue";
    return "todo";
}

export const formatDueDate = (dueDate: string, language: "en" | "id" = "en") => {
    return new Date(dueDate)
        .toLocaleString(language === "id" ? "id-ID" : "en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Jakarta",
        })
        .replace(/\./g, ":");
};
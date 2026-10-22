"use client";
import { useState } from "react";
import { CheckLine, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSettings } from "@/context/SettingsContext";
import type { TaskResponseData } from "@/types/taskTypes";
import { getTaskStatus, formatDueDate, type TaskStatus } from "@/utils/taskStatus";

const statusVariant: Record<TaskStatus, "secondary" | "default" | "destructive"> = {
    todo: "secondary",
    done: "default",
    overdue: "destructive",
};

interface TaskItemProps {
    task: TaskResponseData;
    onToggle: (task: TaskResponseData) => void;
    onEdit: (task: TaskResponseData) => void;
    onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
    const { translate, language } = useSettings();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const status = getTaskStatus({ task });

    return (
        <li className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
            <label className="flex min-w-0 flex-1 items-center gap-4">
                <Checkbox checked={task.done} onCheckedChange={() => onToggle(task)} />
                <div className="flex min-w-0 flex-col gap-1">
                    <span className={`truncate font-medium ${task.done ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {task.dueDate && (
                            <span className={`text-xs ${status === "overdue" ? "text-destructive" : "text-muted-foreground"}`}>
                                {formatDueDate(task.dueDate, language)}
                            </span>
                        )}
                        <Badge variant={statusVariant[status]}>{translate[status]}</Badge>
                    </div>
                </div>
            </label>

            <div className="flex shrink-0 items-center gap-1">
                {
                    !(task.done) ? (
                        <>
                            <Button size="icon" variant="outline" aria-label={translate.edit} onClick={() => onEdit(task)}>
                                <Pencil className="size-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="outline"
                                className="text-destructive hover:text-destructive"
                                aria-label={translate.delete}
                                onClick={() => setConfirmOpen(true)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="icon" variant="outline" aria-label={translate.edit} disabled className="disabled:opacity-80">
                                <CheckLine className="size-4 text-green-500" />
                            </Button>
                        </>
                    )
                }

            </div>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{translate.deleteTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {translate.deleteDescription} &quot;{task.title}&quot;
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{translate.cancel}</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={() => onDelete(task.id)}>
                            {translate.delete}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </li>
    );
};

export default TaskItem;
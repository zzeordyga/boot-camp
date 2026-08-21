import { Task } from "../services/taskService";

const priorityWeight: Record<string, number> = {
    high: 3,
    medium: 2,
    low: 1,
};

export function sortTasks(tasks: Task[], sortOrder: 'dueDate' | 'priority' | 'createdAt'): Task[] {
    return [...tasks].sort((a, b) => {
        if (sortOrder === 'priority') {
            return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }

        if (sortOrder === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        return 0; 
    });
}
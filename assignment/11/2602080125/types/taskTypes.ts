export interface TaskResponseData {
    id: string;
    title: string;
    done: boolean;
    dueDate: string | null;
}

export interface AddTask {
    title: string;
    dueDate?: string | null;
}

export interface EditTask {
    id: string;
    data: Partial<Omit<TaskResponseData, "id">>;
    message?: string;
}

export interface DeleteTask {
    id: string;
}
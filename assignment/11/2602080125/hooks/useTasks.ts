"use client";
import { useEffect, useState } from "react";
import {
    collection, onSnapshot, addDoc, updateDoc, deleteDoc,
    doc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";
import { dbFirebase } from "@/lib/firebase";
import type { TaskResponseData, AddTask, EditTask, DeleteTask } from "@/types/taskTypes";

const TASKS_COLLECTION = "tasks";

const useTasks = () => {
    const [tasks, setTasks] = useState<TaskResponseData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(dbFirebase, TASKS_COLLECTION),
            orderBy("createdAt", "desc")
        );

        const unsub = onSnapshot(
            q,
            (snap) => {
                setTasks(
                    snap.docs.map((item) => ({
                        id: item.id,
                        title: item.data().title as string,
                        done: Boolean(item.data().done),
                        dueDate: (item.data().dueDate as string | null) ?? null,
                    }))
                );
                setLoading(false);
            },
            (err) => {
                console.error(err);
                toast.error("Failed to load tasks", { description: err.message });
                setLoading(false);
            }
        );

        return () => unsub();
    }, []);

    const addTask = async ({ title, dueDate = null }: AddTask) => {
        try {
            await addDoc(collection(dbFirebase, TASKS_COLLECTION), {
                title,
                done: false,
                dueDate,
                createdAt: serverTimestamp(),
            });
            toast.success("Task added");
        } catch (err) {
            toast.error("Failed to add task", { description: (err as Error).message });
            throw err;
        }
    };

    const updateTask = async ({ id, data, message = "Task updated" }: EditTask) => {
        try {
            await updateDoc(doc(dbFirebase, TASKS_COLLECTION, id), data);
            toast.success(message);
        } catch (err) {
            toast.error("Failed to update task", { description: (err as Error).message });
            throw err;
        }
    };

    const deleteTask = async ({ id }: DeleteTask) => {
        try {
            await deleteDoc(doc(dbFirebase, TASKS_COLLECTION, id));
            toast.success("Task deleted");
        } catch (err) {
            toast.error("Failed to delete task", { description: (err as Error).message });
            throw err;
        }
    };

    return { tasks, loading, addTask, updateTask, deleteTask };
};

export default useTasks;
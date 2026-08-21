import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

import { db } from '../../../11/2602095902/lib/firebase';

export interface Task {
    id?: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt?: any;
}

const TASKS_COLLECTION = 'tasks';

export const subscribeToTasks = (callback: (tasks: Task[]) => void) => {
    const q = query(collection(db, TASKS_COLLECTION), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Task[];
        callback(tasks);
    });
};

export const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    return await addDoc(collection(db, TASKS_COLLECTION), {
        ...task,
        createdAt: serverTimestamp(),
    });
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
    const taskRef = doc(db, TASKS_COLLECTION, id);
    return await updateDoc(taskRef, updates);
};

export const deleteTask = async (id: string) => {
    const taskRef = doc(db, TASKS_COLLECTION, id);
    return await deleteDoc(taskRef);
};
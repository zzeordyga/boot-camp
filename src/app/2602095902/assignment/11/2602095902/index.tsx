'use client';

import React, { useEffect, useState } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { subscribeToTasks, Task } from './services/taskService';
import TaskItems from './components/TaskItems';
import TaskSettings from './components/TaskSettings';
import { sortTasks } from './utils/taskSorter';
import TaskForm from './components/TaskForm';

function TaskAppContent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { sortOrder } = useSettings();

    useEffect(() => {
        // Real-time Firestore subscription via onSnapshot
        const unsubscribe = subscribeToTasks((fetchedTasks) => {
            setTasks(fetchedTasks);
        });

        return () => unsubscribe();
    }, []);

    const sortedTasks = sortTasks(tasks, sortOrder);

    return (
        <div>
            <main className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
                <div className="max-w-3xl mx-auto space-y-6">
                    <header className="flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold tracking-tight">Task Manager</h1>
                    </header>

                    <TaskSettings />
                    <TaskForm />

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold">Your Tasks ({tasks.length})</h2>
                        {sortedTasks.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 italic">No tasks found. Create one above!</p>
                        ) : (
                            sortedTasks.map((task) => <TaskItems key={task.id} task={task} />)
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default function MainPage() {
    return (
        <SettingsProvider>
            <TaskAppContent />
        </SettingsProvider>
    );
}
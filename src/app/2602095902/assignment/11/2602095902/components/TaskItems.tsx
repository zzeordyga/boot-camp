'use client';

import React from 'react';
import { Task, updateTask, deleteTask } from '../services/taskService';

export default function TaskItems({ task }: { task: Task }) {
    const toggleComplete = () => {
        if (task.id) {
            updateTask(task.id, { completed: !task.completed });
        }
    };

    const handleDelete = () => {
        if (task.id) {
            deleteTask(task.id);
        }
    };

    const priorityColors = {
        low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
        <div className={`p-4 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 dark:border-gray-700 ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-start gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div>
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
                    )}
                    {task.dueDate && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                            Due: {task.dueDate}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-2 md:pt-0 dark:border-gray-700">
                <span className={`text-xs px-2.5 py-0.5 rounded font-medium ${priorityColors[task.priority]}`}>
                    {task.priority.toUpperCase()}
                </span>
                <button
                    onClick={handleDelete}
                    aria-label="Delete task"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 text-sm font-medium transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import { addTask } from '../services/taskService';

export default function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setIsSubmitting(true);
        try {
            await addTask({
                title,
                description,
                priority,
                dueDate,
                completed: false,
            });
            setTitle('');
            setDescription('');
            setPriority('medium');
            setDueDate('');
        } catch (err) {
            console.error('Failed to add task:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Task</h2>

            <div>
                <input
                    type="text"
                    placeholder="Task Title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="low" className="dark:bg-gray-800">Low</option>
                        <option value="medium" className="dark:bg-gray-800">Medium</option>
                        <option value="high" className="dark:bg-gray-800">High</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors disabled:opacity-50"
            >
                {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
        </form>
    );
}
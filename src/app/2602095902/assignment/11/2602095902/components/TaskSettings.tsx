'use client';

import React from 'react';
import { useSettings } from '../context/SettingsContext';

export default function TaskSettings() {
    const { sortOrder, setSortOrder } = useSettings();

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center gap-2">
                <label htmlFor="sort-order" className="font-medium">Sort By:</label>
                <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="p-1 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                >
                    <option value="createdAt">Date Created</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                </select>
            </div>
        </div>
    );
}
'use client';

import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type SortOrder = 'dueDate' | 'priority' | 'createdAt';

interface SettingsContextType {
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [sortOrder, setSortOrder] = useLocalStorage<SortOrder>('app_sort', 'createdAt');

    return (
        <SettingsContext.Provider
            value={{
                sortOrder,
                setSortOrder,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
"use client";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    window.addEventListener("storage", callback);
    return () => {
        listeners.delete(callback);
        window.removeEventListener("storage", callback);
    };
};

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const raw = useSyncExternalStore(
        subscribe,
        () => {
            try {
                return localStorage.getItem(key);
            } catch {
                return null;
            }
        },
        () => null
    );

    const value = useMemo<T>(() => {
        if (raw === null) return initialValue;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return initialValue;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raw]);

    const set = useCallback(
        (next: T) => {
            try {
                localStorage.setItem(key, JSON.stringify(next));
            } catch (err) {
                console.error(err);
            }
            listeners.forEach((l) => l());
        },
        [key]
    );

    return [value, set] as const;
};

export default useLocalStorage;
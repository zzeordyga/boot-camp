import { useCallback, useEffect, useState } from "react";

function readStoredValue(key, initialValue) {
    if (typeof window === "undefined") {
        return initialValue;
    }

    try {
        const saved = window.localStorage.getItem(key);
        return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
        console.error(`Failed to read localStorage key "${key}":`, error);
        return initialValue;
    }
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => readStoredValue(key, initialValue));

    useEffect(() => {
        setValue(readStoredValue(key, initialValue));
    }, [key, initialValue]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const handleStorageChange = (event) => {
            if (event.type === "storage" && event.key === key) {
                setValue(event.newValue === null ? initialValue : JSON.parse(event.newValue));
                return;
            }

            if (event.detail?.key === key) {
                setValue(event.detail.value);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("local-storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("local-storage", handleStorageChange);
        };
    }, [initialValue, key]);

    const setStoredValue = useCallback((newValue) => {
        setValue(newValue);

        if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(newValue));
            window.dispatchEvent(new CustomEvent("local-storage", {
                detail: { key, value: newValue },
            }));
        }
    }, [key]);

    return [value, setStoredValue];
}
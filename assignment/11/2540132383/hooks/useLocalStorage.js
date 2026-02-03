import { useState, useEffect } from 'react';

const useLocalStorage = (key, initValue) =>
{
    const [storedValue, setStoredValue] = useState(() =>
    {
        try {
            const item = window.localStorage.getItem(key);
            console.log(item);
            if (item) {
                return JSON.parse(item);
            }
            else {
                return initValue;
            }
        } catch (error) {
            console.error(`Error reading key : "${key}":`, error);
            return initValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(`Error setting key : "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};


export default useLocalStorage;
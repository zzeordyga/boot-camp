import { useEffect, useState } from "react";

export default function useLocalStorage (key, initialValue) {
    const [value, setValue] = useState(() => {
        if(typeof window == "undefined") return initialValue;
        try{
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }

        catch {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}
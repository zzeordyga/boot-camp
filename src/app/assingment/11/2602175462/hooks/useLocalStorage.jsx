import { useState, useEffect } from "react";

export default function useLocalStorage(key, initValue){
    const [value, setValue] = useState(initValue);

    useEffect(()=>{
        const item = localStorage.getItem(key);

        if(item !== null){
            setValue(JSON.parse(item));
        }
    }, [key]);

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key,value]);

    return [value, setValue];
}
'use client'
import { useState } from "react";

export function useDataHooks(initialValue)
{
    const [value, setValue] = useState(initialValue)

    const handleChange = (event) =>(
        setValue(event.target.value)
    )

    return {
        value, handleChange
    }
}
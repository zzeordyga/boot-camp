"use client"
import { useEffect, useState } from "react";

export default function useLocalStorage() {

    const [sort, setSort] = useState("dueDate");

    useEffect(() => {
        const sortSetting = localStorage.getItem("sorting");
        if (sortSetting) setSort(sortSetting);
    }, [sort]);

    const changeSort = (sortValue) => {
        localStorage.setItem("sorting", sortValue);
        setSort(sortValue);
    }

    return {sort, changeSort};
}
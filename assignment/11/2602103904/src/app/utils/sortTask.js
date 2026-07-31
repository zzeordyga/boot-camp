export function sortTasks(tasks, sortBy) {
    const copiedTasks = [...tasks];

    if (!Array.isArray(tasks)) {
        return [];
    }

    switch (sortBy) {
        case "task":
            return copiedTasks.sort((a, b) => {
                const taskA = a?.task ?? "";
                const taskB = b?.task ?? "";
                return String(taskA).localeCompare(String(taskB), undefined, { sensitivity: "base" });
            });

        case "deadline":
            return copiedTasks.sort((a, b) => {
                const dateA = getComparableDate(a.deadline);
                const dateB = getComparableDate(b.deadline);

                if (dateA === null && dateB === null) {
                    return 0;
                }

                if (dateA === null) {
                    return 1;
                }

                if (dateB === null) {
                    return -1;
                }

                return dateA - dateB;
            });

        default:
            return copiedTasks;
    }
}

function getComparableDate(value) {
    if (!value) {
        return null;
    }

    if (typeof value.toDate === "function") {
        return value.toDate().getTime();
    }

    if (typeof value === "object" && typeof value.seconds === "number") {
        return value.seconds * 1000;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}
import { sortTasks } from "../utils/sortTask";

describe(
    "sortTasks utility", () => {
        test(
            "sort task alphabetically", () => {
                const tasks = [
                    {
                        task: "React",
                    },
                    {
                        task: "Database",
                    },
                    {
                        task: "NextJS",
                    },
                ];

                const result = sortTasks(tasks, "task");

                expect(result[0].task).toBe("Database");
                expect(result[1].task).toBe("NextJS");
                expect(result[2].task).toBe("React");
            }
        );

        test("sort deadline ascending", () => {
            const tasks = [{
                task: "React",
                deadline: {
                    toDate: () => new Date("2026-08-20"),
                },
            },
            {
                task: "Database",
                deadline: {
                    toDate: () => new Date("2026-08-05"),
                },
            },
            {
                task: "NextJS",
                deadline: {
                    toDate: () => new Date("2026-08-10"),
                },
            },
            ];

            const result = sortTasks(tasks, "deadline");

            expect(result[0].task).toBe("Database");
            expect(result[1].task).toBe("NextJS");
            expect(result[2].task).toBe("React");
        });

        test("sorts Firestore-like deadline values correctly", () => {
            const tasks = [{
                task: "React",
                deadline: {
                    seconds: 1720000000,
                    nanoseconds: 0,
                },
            }, {
                task: "Database",
                deadline: {
                    seconds: 1710000000,
                    nanoseconds: 0,
                },
            }];

            const result = sortTasks(tasks, "deadline");

            expect(result[0].task).toBe("Database");
            expect(result[1].task).toBe("React");
        });

        test("returns original array if sort type invalid", () => {
            const tasks = [{
                task: "React",
            },];

            const result = sortTasks(tasks, "unknown");

            expect(result).toEqual(tasks);
        });
    }
);
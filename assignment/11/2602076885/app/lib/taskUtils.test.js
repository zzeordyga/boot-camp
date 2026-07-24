import { sortTasks } from "./taskUtils";

describe("sortTasks", () => {
  const tasks = [
    {
      id: "1",
      title: "Old Task",
      createdAt: {
        toMillis: () => 1000,
      },
    },
    {
      id: "2",
      title: "New Task",
      createdAt: {
        toMillis: () => 3000,
      },
    },
    {
      id: "3",
      title: "Middle Task",
      createdAt: {
        toMillis: () => 2000,
      },
    },
  ];

  test("sorts tasks from newest to oldest", () => {
    const result = sortTasks(tasks, "newest");

    expect(result.map((task) => task.id)).toEqual(["2", "3", "1"]);
  });

  test("sorts tasks from oldest to newest", () => {
    const result = sortTasks(tasks, "oldest");

    expect(result.map((task) => task.id)).toEqual(["1", "3", "2"]);
  });
});

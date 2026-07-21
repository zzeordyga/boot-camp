import { sortTasks, getTaskStats } from "../lib/taskUtils";

describe("sortTasks", () => {
  const tasks = [
    { id: "1", title: "Buy milk", completed: false, createdAt: 100 },
    { id: "2", title: "Answer emails", completed: true, createdAt: 300 },
    { id: "3", title: "Clean desk", completed: false, createdAt: 200 },
  ];

  it("sorts by newest first by default", () => {
    const result = sortTasks(tasks);
    expect(result.map((t) => t.id)).toEqual(["2", "3", "1"]);
  });

  it("sorts by oldest first", () => {
    const result = sortTasks(tasks, "oldest");
    expect(result.map((t) => t.id)).toEqual(["1", "3", "2"]);
  });

  it("sorts alphabetically by title", () => {
    const result = sortTasks(tasks, "alphabetical");
    expect(result.map((t) => t.title)).toEqual([
      "Answer emails",
      "Buy milk",
      "Clean desk",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = [...tasks];
    sortTasks(tasks, "alphabetical");
    expect(tasks).toEqual(original);
  });

  it("returns an empty array for non-array input", () => {
    expect(sortTasks(null)).toEqual([]);
    expect(sortTasks(undefined)).toEqual([]);
  });
});

describe("getTaskStats", () => {
  it("counts completed and pending tasks correctly", () => {
    const tasks = [
      { completed: true },
      { completed: false },
      { completed: true },
    ];
    expect(getTaskStats(tasks)).toEqual({
      total: 3,
      completed: 2,
      pending: 1,
    });
  });

  it("handles an empty list", () => {
    expect(getTaskStats([])).toEqual({ total: 0, completed: 0, pending: 0 });
  });
});

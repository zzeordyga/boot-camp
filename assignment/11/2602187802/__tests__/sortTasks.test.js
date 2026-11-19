import { sortTasks } from "../lib/sortTasks";

describe("sortTasks", () => {
  const sampleTasks = [
    { id: "1", title: "Oldest task", createdAt: { toMillis: () => 1000 } },
    { id: "2", title: "Middle task", createdAt: { toMillis: () => 2000 } },
    { id: "3", title: "Newest task", createdAt: { toMillis: () => 3000 } },
  ];

  test("sorts tasks by newest first", () => {
    const result = sortTasks(sampleTasks, "newest");
    expect(result.map((t) => t.id)).toEqual(["3", "2", "1"]);
  });

  test("sorts tasks by oldest first", () => {
    const result = sortTasks(sampleTasks, "oldest");
    expect(result.map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  test("places task with null createdAt as newest", () => {
    const withPending = [
      ...sampleTasks,
      { id: "4", title: "Pending serverTimestamp", createdAt: null },
    ];
    const newestResult = sortTasks(withPending, "newest");
    expect(newestResult[0].id).toBe("4");

    const oldestResult = sortTasks(withPending, "oldest");
    expect(oldestResult[oldestResult.length - 1].id).toBe("4");
  });

  test("does not mutate the original array", () => {
    const original = [...sampleTasks];
    const result = sortTasks(original, "newest");

    expect(result).not.toBe(original);
    expect(original.map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  test("handles an empty array", () => {
    expect(sortTasks([], "newest")).toEqual([]);
    expect(sortTasks([], "oldest")).toEqual([]);
  });
});

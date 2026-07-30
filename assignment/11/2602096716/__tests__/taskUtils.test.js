import { sortTasksByDate } from "../taskUtils";

describe("sortTasksByDate", () => {
  const tasks = [
    { id: "1", title: "A", createdAt: { seconds: 100 } },
    { id: "2", title: "B", createdAt: { seconds: 300 } },
    { id: "3", title: "C", createdAt: { seconds: 200 } },
  ];

  it("mengurutkan dari terbaru ke terlama", () => {
    expect(sortTasksByDate(tasks, "newest").map((t) => t.id)).toEqual(["2", "3", "1"]);
  });

  it("mengurutkan dari terlama ke terbaru", () => {
    expect(sortTasksByDate(tasks, "oldest").map((t) => t.id)).toEqual(["1", "3", "2"]);
  });

  it("tidak memutasi array asli", () => {
    const original = [...tasks];
    sortTasksByDate(tasks, "newest");
    expect(tasks).toEqual(original);
  });
});
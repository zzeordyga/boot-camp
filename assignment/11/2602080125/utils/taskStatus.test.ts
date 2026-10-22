import { getTaskStatus } from "./taskStatus";

const now = new Date("2026-10-22T10:00:00Z");

describe("getTaskStatus", () => {
    it("returns done when task is done, even if past deadline", () => {
        expect(
            getTaskStatus({ task: { done: true, dueDate: "2026-10-01T00:00:00Z" }, now })
        ).toBe("done");
    });

    it("returns overdue when deadline has passed", () => {
        expect(
            getTaskStatus({ task: { done: false, dueDate: "2026-10-01T00:00:00Z" }, now })
        ).toBe("overdue");
    });

    it("returns todo when deadline is in the future", () => {
        expect(
            getTaskStatus({ task: { done: false, dueDate: "2026-11-01T00:00:00Z" }, now })
        ).toBe("todo");
    });

    it("returns todo when there is no deadline", () => {
        expect(
            getTaskStatus({ task: { done: false, dueDate: null }, now })
        ).toBe("todo");
    });
});
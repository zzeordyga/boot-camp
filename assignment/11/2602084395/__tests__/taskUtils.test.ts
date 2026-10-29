import { filterTasks, formatDate } from "@/utils/taskUtils"

describe("taskUtils", () => {
  describe("filterTasks", () => {
    const mockTasks = [
      { id: "1", title: "Task 1", completed: false, createdAt: null },
      { id: "2", title: "Task 2", completed: true, createdAt: null },
      { id: "3", title: "Task 3", completed: false, createdAt: null }
    ]

    it("should return all tasks when showCompleted is true", () => {
      const result = filterTasks(mockTasks, true)
      expect(result).toHaveLength(3)
    })

    it("should return only incomplete tasks when showCompleted is false", () => {
      const result = filterTasks(mockTasks, false)
      expect(result).toHaveLength(2)
      expect(result.every((task) => !task.completed)).toBe(true)
    })
  })

  describe("formatDate", () => {
    it("should format timestamp to Indonesian date format", () => {
      const mockTimestamp = {
        toDate: () => new Date("2024-01-15")
      }
      const result = formatDate(mockTimestamp)
      expect(result).toContain("15")
      expect(result).toContain("Jan")
      expect(result).toContain("2024")
    })
  })
})
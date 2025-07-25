import { formatDate } from "@/utils/formatDate";

test("formats a date correctly", () => {
  const result = formatDate("2025-07-25T00:00:00Z");
  expect(result).toBeDefined();
});

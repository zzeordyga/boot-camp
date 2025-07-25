// __tests__/formatDate.test.js
import { formatDate } from "../utils/formatDate";

test("formats date to Indonesian locale", () => {
  expect(formatDate("2023-07-25")).toBe("25/7/2023");
});

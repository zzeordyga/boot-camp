// __tests__/TaskItem.test.js
import { render, screen } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

test("renders task title", () => {
  render(<TaskItem title="My Task" />);
  expect(screen.getByText("My Task")).toBeInTheDocument();
});

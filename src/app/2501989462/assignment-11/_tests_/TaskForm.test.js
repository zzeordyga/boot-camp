import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/TaskForm";

test("renders TaskForm and adds task", () => {
  render(<TaskForm />);
  const input = screen.getByPlaceholderText("Enter task");
  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.submit(input);
  expect(input.value).toBe("");
});

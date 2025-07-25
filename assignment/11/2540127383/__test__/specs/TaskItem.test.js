import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "@/components/TaskItem";

test("renders task title", () => {
  render(<TaskItem task={{ id: "1", title: "Test Task", completed: false }} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText("Test Task")).toBeInTheDocument();
});

test("calls delete handler when delete button is clicked", () => {
  const handleDelete = jest.fn();
  render(<TaskItem task={{ id: "1", title: "Test Task", completed: false }} onToggle={() => {}} onDelete={handleDelete} />);
  fireEvent.click(screen.getByText("Delete"));
  expect(handleDelete).toHaveBeenCalledWith("1");
});

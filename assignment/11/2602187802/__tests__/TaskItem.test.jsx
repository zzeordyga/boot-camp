import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsProvider } from "../context/SettingsContext";
import TaskItem from "../components/TaskItem";

function renderTaskItem(task, handlers = {}) {
  const props = {
    task,
    onToggle: handlers.onToggle || jest.fn(),
    onEdit: handlers.onEdit || jest.fn(),
    onDelete: handlers.onDelete || jest.fn(),
  };

  render(
    <SettingsProvider>
      <ul>
        <TaskItem {...props} />
      </ul>
    </SettingsProvider>
  );

  return props;
}

describe("TaskItem", () => {
  const activeTask = {
    id: "task-1",
    title: "Belajar Next.js",
    completed: false,
  };

  test("renders task title", () => {
    renderTaskItem(activeTask);
    expect(screen.getByText("Belajar Next.js")).toBeInTheDocument();
  });

  test("calls onToggle with task id and next completed state when checkbox is clicked", () => {
    const onToggle = jest.fn();
    renderTaskItem(activeTask, { onToggle });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith("task-1", true);
  });

  test("calls onDelete with task id when delete button is clicked", () => {
    const onDelete = jest.fn();
    renderTaskItem(activeTask, { onDelete });

    const deleteButton = screen.getByRole("button", { name: /hapus|delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith("task-1");
  });

  test("displays completed styling and checked state for completed task", () => {
    const completedTask = {
      id: "task-2",
      title: "Setup Firestore",
      completed: true,
    };
    renderTaskItem(completedTask);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    const listItem = screen.getByRole("listitem");
    expect(listItem).toHaveAttribute("data-completed", "true");
    expect(listItem).toHaveClass("completed");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "./TaskCard";

jest.mock("../lib/firebase", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe("TaskCard", () => {
  const task = {
    id: "123",
    title: "Finish Assignment 11",
    description: "Complete the Task Management assignment",
    completed: false,
  };

  test("renders task information", () => {
    render(<TaskCard task={task} />);

    expect(screen.getByText("Finish Assignment 11")).toBeInTheDocument();

    expect(
      screen.getByText("Complete the Task Management assignment"),
    ).toBeInTheDocument();

    expect(screen.getByText("⏳ In Progress")).toBeInTheDocument();
  });

  test("shows edit form when Edit button is clicked", () => {
    render(<TaskCard task={task} />);

    const editButton = screen.getByRole("button", {
      name: "Edit",
    });

    fireEvent.click(editButton);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Finish Assignment 11"),
    ).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskItem from "./TaskItem";
import { SettingsProvider } from "@/context/SettingsContext";

const task = { id: "1", title: "Belajar Jest", done: false, dueDate: null };

const setup = () => {
    const onToggle = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
        <SettingsProvider>
        <ul>
        <TaskItem task={ task } onToggle = { onToggle } onEdit = { onEdit } onDelete = { onDelete } />
        </ul>
        </SettingsProvider>
    );

    return { onToggle, onEdit, onDelete };
};

describe("TaskItem", () => {
    it("renders the title and status badge", () => {
        setup();
        expect(screen.getByText("Belajar Jest")).toBeInTheDocument();
        expect(screen.getByText("To do")).toBeInTheDocument();
    });

    it("calls onEdit with the task when edit is clicked", async () => {
        const { onEdit } = setup();
        await userEvent.click(screen.getByRole("button", { name: "Edit" }));
        expect(onEdit).toHaveBeenCalledWith(task);
    });

    it("asks for confirmation before calling onDelete", async () => {
        const { onDelete } = setup();
        await userEvent.click(screen.getByRole("button", { name: "Delete" }));
        expect(onDelete).not.toHaveBeenCalled();

        const buttons = await screen.findAllByRole("button", { name: "Delete" });
        await userEvent.click(buttons[buttons.length - 1]);
        expect(onDelete).toHaveBeenCalledWith("1");
    });
});
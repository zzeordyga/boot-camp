import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "../components/TaskForm";
import { SettingsProvider } from "../context/SettingsContext";

// TaskForm reads translated strings via useSettings(), so it must be
// rendered inside the same SettingsProvider it uses in the real app.
function renderWithProviders(ui) {
  return render(<SettingsProvider>{ui}</SettingsProvider>);
}

describe("TaskForm", () => {
  it("calls onAdd with the trimmed title when submitted with valid input", async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();

    renderWithProviders(<TaskForm onAdd={onAdd} />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, "  Write assignment README  ");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).toHaveBeenCalledWith("Write assignment README");
  });

  it("clears the input after a successful submit", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskForm onAdd={jest.fn()} />);

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    await user.type(input, "Finish tests");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(input).toHaveValue("");
  });

  it("shows a validation error and does not call onAdd when submitted empty", async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();

    renderWithProviders(<TaskForm onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByText(/can't be empty/i)).toBeInTheDocument();
  });
});

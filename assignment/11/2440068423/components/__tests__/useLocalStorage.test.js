import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";
import React from "react";

function TestComponent({ storageKey, defaultValue }) {
  const [value, setValue] = useLocalStorage(storageKey, defaultValue);

  return (
    <div>
      <p data-testid="value">{value}</p>
      <button onClick={() => setValue("updated")}>Update</button>
    </div>
  );
}

describe("useLocalStorage custom hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return default value", () => {
    render(<TestComponent storageKey="test" defaultValue="default" />);
    const val = screen.getByTestId("value");
    expect(val.textContent).toBe("default");
  });

  it("should update and persist to localStorage", async () => {
    render(<TestComponent storageKey="test" defaultValue="default" />);
    
    // Gunakan fireEvent + waitFor
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(screen.getByTestId("value").textContent).toBe("updated");
    });

    const stored = JSON.parse(localStorage.getItem("test"));
    expect(stored).toBe("updated");
  });
});

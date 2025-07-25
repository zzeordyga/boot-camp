import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  it("should initialize with initial value", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should update localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    act(() => {
      result.current[1]("updated");
    });
  });
});

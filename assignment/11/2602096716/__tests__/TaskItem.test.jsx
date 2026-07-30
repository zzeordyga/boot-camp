import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../TaskItem";

describe("TaskItem", () => {
  const task = { id: "1", title: "Belajar Jest", done: false };

  it("menampilkan judul tugas", () => {
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Belajar Jest")).toBeInTheDocument();
  });

  it("memanggil onToggle saat checkbox diklik", () => {
    const onToggle = jest.fn();
    render(<TaskItem task={task} onToggle={onToggle} onDelete={() => {}} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(task);
  });

  it("memanggil onDelete saat tombol hapus diklik", () => {
    const onDelete = jest.fn();
    render(<TaskItem task={task} onToggle={() => {}} onDelete={onDelete} />);
    fireEvent.click(screen.getByText("✕"));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
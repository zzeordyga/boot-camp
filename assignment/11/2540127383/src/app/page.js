"use client";
import { useTasks } from "@/hooks/useTasks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "asc");

  const sortedTasks = [...tasks].sort((a, b) => 
    sortOrder === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
  );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex justify-end mb-2">
        <button
          className="border px-2 py-1"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>
      <TaskForm onAdd={addTask} />
      <div className="mt-4 border rounded">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function AssignmentPage() {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </main>
  );
}

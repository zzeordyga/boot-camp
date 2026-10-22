"use client";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import useTasks from "@/hooks/useTasks";
import useLocalStorage from "@/hooks/useLocalStorage";
import TaskFormDialog from "@/components/common/TaskFormDialog";
import TaskItem from "@/components/common/TaskItem";
import SettingsBar from "@/components/common/SettingsBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/context/SettingsContext";
import type { TaskResponseData } from "@/types/taskTypes";
import type { TaskFormValues } from "@/schemas/TaskSchema";
import { filterTasks, sortTasks, type SortBy, type SortOrder, type StatusFilter } from "@/utils/sortTasks";
import { TaskEmptyState, TaskListSkeleton } from "@/components/common/TaskListState";

const Home = () => {
  const { translate } = useSettings();
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingItem, setEditingItem] = useState<TaskResponseData | null>(null);

  const [filter, setFilter] = useLocalStorage<StatusFilter>("taskFilter", "all");
  const [sortBy, setSortBy] = useLocalStorage<SortBy>("taskSortBy", "created");
  const [order, setOrder] = useLocalStorage<SortOrder>("taskSortOrder", "desc");

  const visible = useMemo(
    () => sortTasks({
      tasks: filterTasks({
        tasks,
        filter
      }),
      sortBy,
      order
    }),
    [tasks, filter, sortBy, order]
  );

  const counts = useMemo<Record<StatusFilter, number>>(
    () => ({
      all: tasks.length,
      todo: filterTasks({ tasks, filter: "todo" }).length,
      done: filterTasks({ tasks, filter: "done" }).length,
      overdue: filterTasks({ tasks, filter: "overdue" }).length,
    }),
    [tasks]
  );


  const handleAdd = () => {
    setFormMode("add");
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task: TaskResponseData) => {
    setFormMode("edit");
    setEditingItem(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (values: TaskFormValues) => {
    if (formMode === "edit" && editingItem) {
      await updateTask({
        id: editingItem.id,
        data: values
      });
    } else {
      await addTask(values);
    }
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 border-b">
          <CardTitle className="text-2xl">{translate.appTitle}</CardTitle>
          <div className="flex items-center gap-2">
            <Button onClick={handleAdd}>
              <Plus className="size-4 sm:mr-1" />
              <span className="hidden sm:inline">{translate.addTask}</span>
            </Button>

            <SettingsBar
              filter={filter}
              onFilterChange={setFilter}
              counts={counts}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              order={order}
              onOrderChange={setOrder}
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <TaskListSkeleton />
          ) : tasks.length === 0 ? (
            <TaskEmptyState variant="empty" message={translate.empty} />
          ) : visible.length === 0 ? (
            <TaskEmptyState variant="noResults" message={translate.noResults} />
          ) : (
            <ul className="space-y-3">
              {visible.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={(x) =>
                    updateTask({
                      id: x.id,
                      data: {
                        done: !x.done
                      },
                      message: "Status updated"
                    }).catch(console.error)
                  }
                  onEdit={handleEdit}
                  onDelete={(id) => deleteTask({ id }).catch(console.error)}
                />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <TaskFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        mode={formMode}
        initialValues={editingItem ?? undefined}
      />
    </main>
  );
};

export default Home;
"use client"

import { useTasks } from "@/hooks/useTasks"
import { useLanguage } from "@/context/LanguageContext"
import { useTheme } from "@/context/ThemeContext"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import ThemeToggle from "@/components/ThemeToggle"
import LanguageToggle from "@/components/LanguageToggle"
import { useState } from "react"

export default function Home() {
  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [sortOrder, setSortOrder] = useLocalStorage<"asc" | "desc">("taskSortOrder", "desc")
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      await addTask(newTaskTitle.trim())
      setNewTaskTitle("")
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.createdAt?.toDate() || new Date(0)
    const dateB = b.createdAt?.toDate() || new Date(0)
    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-linear-to-br from-blue-50 to-indigo-100"}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
            {t("title")}
          </h1>
          <div className="flex gap-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        <form onSubmit={handleAddTask} className={`mb-8 rounded-2xl p-6 shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder={t("addTask")}
              className={`flex-1 rounded-lg border-2 px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark"
                  ? "border-gray-500 bg-gray-700 text-white placeholder-gray-300"
                  : "border-gray-400 bg-white text-gray-800 placeholder-gray-500"
              }`}
            />
            <button
              type="submit"
              className="rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg active:scale-95"
            >
              {t("addTask")}
            </button>
          </div>
        </form>

        <div className={`mb-4 flex items-center justify-between rounded-xl p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md`}>
          <span className={`font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className={`rounded-lg border-2 px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-200 bg-gray-50 text-gray-800"
            }`}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className={`rounded-2xl p-12 text-center ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              No tasks yet. Add your first task!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`group rounded-xl p-5 shadow-md transition-all hover:shadow-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } ${task.completed ? "opacity-70" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => updateTask(task.id, { completed: !task.completed })}
                    className="mt-1 h-5 w-5 cursor-pointer rounded border-2 border-blue-500 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-lg font-medium transition-all ${
                        task.completed
                          ? theme === "dark"
                            ? "text-gray-500 line-through"
                            : "text-gray-400 line-through"
                          : theme === "dark"
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.createdAt && (
                      <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                        {task.createdAt.toDate().toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all hover:bg-red-600 group-hover:opacity-100"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
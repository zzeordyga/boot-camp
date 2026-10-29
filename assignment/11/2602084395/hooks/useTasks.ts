"use client"

import { useState, useEffect } from "react"
import { subscribeToTasks, addTask, updateTask, deleteTask, Task } from "@/utils/taskService"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToTasks((tasksData) => {
      setTasks(tasksData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleAddTask = async (title: string) => {
    await addTask(title)
  }

  const handleUpdateTask = async (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    await updateTask(id, updates)
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
  }

  return {
    tasks,
    loading,
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask
  }
}
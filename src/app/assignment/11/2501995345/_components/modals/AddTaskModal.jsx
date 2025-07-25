"use client";

import { useContext, useEffect, useState } from "react";
import LanguageContext from "../../_contexts/LanguageContexts";
import ModalContext from "../../_contexts/ModalContext";
import getFirebase from "../../_libs/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTaskModal() {
  const { langs } = useContext(LanguageContext);
  const { setModal } = useContext(ModalContext);

  const { db } = getFirebase();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState({
    title: "",
    description: "",
  });

  const handleAddTask = async () => {
    const newError = {};

    if (taskName === "") {
      newError.title = "Task name is required";
    }
    if (taskDescription === "") {
      newError.description = "Task description is required";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    setError({
      title: "",
      description: "",
    });

    try {
      setIsLoading(true);

      const taskCollection = collection(db, "tasks");
      const newTask = {
        name: taskName,
        description: taskDescription,
      };
      await addDoc(taskCollection, newTask);

      setTaskName("");
      setTaskDescription("");
      setSuccessMessage(langs.modal.addTask.successMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [successMessage]);

  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center">
      <div
        className="w-full h-full fixed top-0 left-0 bg-black/50"
        onClick={() => setModal("")}
      ></div>
      <div className="flex flex-col gap-4 w-1/2 min-h-1/2 bg-white rounded-md p-4 z-10">
        <h1 className="text-2xl font-bold">{langs.modal.addTask.title}</h1>
        <p className="text-sm">{langs.modal.addTask.description}</p>

        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <div className="flex flex-col gap-6 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              {langs.modal.addTask.input.title}
            </label>
            <input
              type="text"
              id="title"
              placeholder={langs.modal.addTask.input.title}
              className="border border-gray-300 rounded-md p-2"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            {error.title && (
              <p className="text-red-500 text-sm">{error.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-bold">
              {langs.modal.addTask.input.description}
            </label>
            <textarea
              id="description"
              placeholder={langs.modal.addTask.input.description}
              className="border border-gray-300 rounded-md p-2 resize-none"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            {error.description && (
              <p className="text-red-500 text-sm">{error.description}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit hover:bg-blue-400 active:bg-blue-600 active:scale-95 transition-all duration-300 cursor-pointer"
            onClick={handleAddTask}
            disabled={isLoading}
          >
            {langs.modal.addTask.button.add}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md w-fit hover:bg-red-400 active:bg-red-600 active:scale-95 transition-all duration-300 cursor-pointer"
            onClick={() => setModal("")}
            disabled={isLoading}
          >
            {langs.modal.addTask.button.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}

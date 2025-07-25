"use client";

import { useContext, useEffect, useState } from "react";
import LanguageContext from "./_contexts/LanguageContexts";
import ModalContext from "./_contexts/ModalContext";

import { MODAL_TYPES } from "./_libs/constants";
import getFirebase from "./_libs/firebase";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Page() {
  const { langs } = useContext(LanguageContext);
  const { setModal } = useContext(ModalContext);

  const { db } = getFirebase();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);

      const tasksCollection = collection(db, "tasks");
      const q = query(tasksCollection);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-20 py-20 mt-20">
      <h1 className="text-4xl font-bold">{langs.title}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit hover:bg-blue-400 active:bg-blue-600 active:scale-95 transition-all duration-300"
        onClick={() => setModal(MODAL_TYPES.ADD_TASK)}
      >
        {langs.button.addTask}
      </button>

      {isLoading && (
        <div className="flex justify-center items-center">
          <p className="text-sm">{langs.loading}</p>
        </div>
      )}

      {!isLoading && tasks.length === 0 && (
        <div className="flex justify-center items-center">
          <p className="text-sm">{langs.noTasks}</p>
        </div>
      )}

      {!isLoading && tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-md p-4 shadow-md w-auto flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold">{task.name}</h2>
              <p className="text-sm">{task.description}</p>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md w-fit hover:bg-red-400 active:bg-red-600 active:scale-95 transition-all duration-300 cursor-pointer"
                onClick={() => handleDeleteTask(task.id)}
              >
                {langs.button.delete}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

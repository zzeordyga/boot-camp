'use client'

import LanguageToggle from "./components/LanguageToggle";
import ThemeToggle from "./components/ThemeToggle";
import { useSettings } from "./contexts/SettingContext";
import { translations } from "./lib/translation";
import getConfig from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import DataCard from "./components/Card";

export default function Page() {
  const { language } = useSettings();
  const t = translations[language];

  const { db } = getConfig();
  const [ task, setTask ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ deadline, setDeadline ] = useState("");
  const [ isStatus, setIsStatus ] = useState(t.progress);
  const [ loading, setLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !subject || !deadline) {
      alert(t.warningButton);
      return;
    }

    setLoading(true);
    try {
      const formattedDeadline = new Date(deadline);
      const isStatusBool = isStatus === t.done;
      
      await addDoc(collection(db, "study"), {
        task: task,
        subject: subject,
        deadline: formattedDeadline,
        status: isStatusBool,
        createdAt: new Date(),
      });
      alert(t.succeed);

      setTask("");
      setSubject("");
      setDeadline("");
      setIsStatus(t.progress);
    } catch(error) {
      console.error("Error adding data: ", error);
      alert(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center px-4 py-5 text-center sm:px-6">
      <div className="flex w-full flex-col gap-5 justify-between overflow-hidden rounded-xl border-2 border-gray-400 dark:text-white">
        <div className="w-full bg-blue-300 px-6 py-5 text-xl font-semibold sm:px-8 md:text-2xl dark:bg-blue-600">
          {t.addTask}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Add Data */}
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex flex-row md:flex-col gap-4 px-4 text-sm items-center md:items-start sm:px-5 md:text-lg w-full">
              <p className="whitespace-nowrap">{t.taskName}:</p>
              <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="w-full border border-gray-300 dark:bg-gray-50 md:text-black rounded-lg px-4 py-2" placeholder={t.namePlaceholder} />
            </div>
            <div className="flex flex-row md:flex-col gap-4 px-4 text-sm items-center md:items-start sm:px-5 md:text-lg w-full">
              <p className="whitespace-nowrap">{t.subject}:</p>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border border-gray-300 dark:bg-gray-50 md:text-black rounded-lg px-4 py-2" placeholder={t.subjectPlaceholder} />
            </div>
            <div className="flex flex-row md:flex-col gap-4 px-4 text-sm items-center md:items-start sm:px-5 md:text-lg w-full">
              <p className="whitespace-nowrap">{t.deadline}:</p>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full border border-gray-300 dark:bg-gray-50 md:text-black rounded-lg px-4 py-2" placeholder={t.deadlinePlaceholder} />
            </div>
            <div className="flex flex-row md:flex-col gap-4 px-4 text-sm items-center md:items-start sm:px-5 md:text-lg w-full">
              <p className="whitespace-nowrap">{t.status}:</p>
              <select value={isStatus} onChange={(e) => setIsStatus(e.target.value)} className="w-full border border-gray-300 dark:bg-gray-50 md:text-black rounded-lg px-4 py-2">
                <option value={t.progress} className="dark:text-black text-md md:text-lg">
                    {t.progress}
                </option>
                <option value={t.done} className="dark:text-black text-md md:text-lg">
                    {t.done}
                </option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end px-4 pb-5 sm:px-5">
            <button type="submit" disabled={loading} className="inline-flex items-center rounded-lg bg-blue-300 dark:bg-blue-600 dark:text-white px-4 py-3 text-md md:text-lg font-medium text-black sm:px-5 cursor-pointer">
              {loading ? t.saving : t.addButton}
            </button>
          </div>
        </form>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <div>
        <DataCard />
      </div>
    </div>
  );
}
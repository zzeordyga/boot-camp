"use client";

import { useState, useEffect } from "react";
import getConfig from "../firebase/config";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useSettings } from "../contexts/SettingContext";
import { translations } from "../lib/translation";
import { sortTasks } from "../utils/sortTask";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SortSelect from "./SortSelect";

export default function DataCard() {
    const { db } = getConfig();
    const { language } = useSettings();
    const t = translations[language];
    const [sortBy] = useLocalStorage("sortBy", "deadline");

    const [studies, setStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "study"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setStudies(data);
                setLoading(false);
            },
            (error) => {
                console.error(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [db]);

    if (loading) {
        return (
            <div className="py-6">
                <p>{t.loadingData}</p>
            </div>
        );
    }

    const handleStatus = async (studyId, currentStatus) => {
        try {
            const studyRef = doc(db, "study", studyId);

            await updateDoc(studyRef, {
                status: !currentStatus,
            });
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const handleDelete = async (studyId) => {
        const confirmed = window.confirm(
            language === "id" ? "Apakah yakin ingin menghapus data ini?" : "Are you sure you want to delete this data?"
        );

        if (!confirmed) return;

        try {
            const studyRef = doc(db, "study", studyId);
            await deleteDoc(studyRef);
        } catch (error) {
            console.error("Error delete data: ", error);
        }
    };

    const sortedStudies = sortTasks(studies, sortBy ?? "deadline");

    return (
        <section className="w-full mt-8">
            <h2 className="text-xl md:text-2xl font-bold border-b pb-4 mb-6 dark:text-white">
                {t.studyTitle}: {studies.length}
            </h2>
            <SortSelect />

            {studies.length === 0 ? (
                <p className="text-gray-500">{t.noData}</p>
            ) : (
                <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {sortedStudies.map((study) => {
                        const deadlineDate = study.deadline?.toDate ? study.deadline.toDate() : null;

                        return (
                            <article key={study.id} className=" bg-blue-300 dark:bg-blue-600 dark:text-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow">
                                <div className="flex flex-col text-start space-y-3">
                                    <h3 className="text-xl font-bold capitalize border-b border-gray-600 dark:border-gray-200 pb-2 text-center">
                                        {study.task}
                                    </h3>

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3 capitalize text-lg">
                                            <p>{t.subject}: </p>
                                            <p className="font-semibold">{study.subject}</p>
                                        </div>

                                        <div className="text-md">
                                            📅 {t.deadline}:{" "}
                                            {deadlineDate ? deadlineDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", }) : "Tidak ada tanggal"}
                                        </div>
                                    </div>

                                    <div className="pt-3 flex items-center justify-between">
                                        <button type="button" onClick={() => handleStatus(study.id, study.status)} className="cursor-pointer">
                                            {study.status ? (
                                                <span className="inline-flex px-3 py-1 rounded-full bg-green-600 text-md font-medium">
                                                    {t.done}
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-3 py-1 rounded-full bg-yellow-600 text-md font-medium">
                                                    {t.progress}
                                                </span>
                                            )}
                                        </button>
                                        <button type="submit" onClick={() => handleDelete(study.id)} className="cursor-pointer px-5 py-2 bg-gray-400 rounded-full text-md hover:text-white hover:bg-gray-600">{t.deleteData}</button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
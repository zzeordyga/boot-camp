"use client";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import Script from "next/script";
import { getBadgeColor as badgeColor } from '../utils/badgeColor';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SettingsProvider, useSettings } from '../context/SettingsContext';

function HomepageContent() {
    const { language, toggleLanguage } = useSettings();
    const [sortOrder, setSortOrder] = useLocalStorage('sortOrder', 'desc');
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState([]);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('All');
    const [formTag, setFormTag] = useState('home')
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [edit, setEdit] = useState('');
    const [addModal, setAddModal] = useState(false);

    useEffect(() => {
        const taskCollection = collection(db, 'task');
        const unsubsTask = onSnapshot(
            taskCollection, (snapshot) => {
                const dataTask = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTask(dataTask);
                setLoading(false);
            }, (error) => {
                console.error("Gagal mengambil data task", error);
                setError(error.message);
                setLoading(false);
            }
        );
        return () => {
            unsubsTask();
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (edit) {
                await updateDoc(doc(db, 'task', edit), {
                    name: name,
                    description: description,
                    tag: formTag,
                    due_date: date,
                });
                alert('Task berhasil diupdate');
                setEdit(null);

            } else {
                await addDoc(collection(db, 'task'), {
                    name: name,
                    description: description,
                    tag: formTag,
                    due_date: date,
                    status: 'todo'
                });
                alert('Task berhasil ditambahkan');
            }
            setName('');
            setDescription('');
            setDate(today);
            setFormTag('home');
            setAddModal(false);


        } catch (error) {
            console.error("Gagal menambahkan task", error);
            setError(error.message);
            alert('Task gagal ditambahkan :' + error.message);
        }

    }

    const handleToggleStatus = async (taskId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'todo' ? 'done' : 'todo';
            await updateDoc(doc(db, 'task', taskId), {
                status: newStatus
            });

            if (newStatus === 'done') {
                setFilterStatus('Done');
            } else {
                setFilterStatus('To Do');
            }
        } catch (error) {
            console.error("Gagal mengubah status", error);
            alert("Gagal mengubah status: " + error.message);
        }

    }

    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus task ini?");
        if (!confirmDelete) {
            return;
        }
        try {
            await deleteDoc(doc(db, 'task', taskId));
            alert('Task berhasil dihapus');
        } catch (error) {
            console.error("Gagal menghapus task", error);
            alert("Gagal menghapus task: " + error.message);
        }
    }

    const handleEdit = (task) => {
        setEdit(task.id);
        setName(task.name);
        setDescription(task.description);
        setFormTag(task.tag);

        if (task.due_date?.seconds) {
            setDate(new Date(task.due_date.seconds * 1000).toISOString().split('T')[0]);
        } else {
            setDate(task.due_date);
        }

        setAddModal(true);
    }

    // Sort tasks before rendering based on sortOrder (desc = newest first, asc = oldest first)
    const sortedTasks = [...task].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.due_date > b.due_date ? 1 : -1;
        } else {
            return a.due_date < b.due_date ? 1 : -1;
        }
    });

    return (
        <main className="font-sans transition-colors duration-300">
            <Script src="https://unpkg.com/@tailwindcss/browser@4" strategy="lazyOnload" />
            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                }
            `}</style>
            <div className={`
                min-h-screen bg-[#fdf8f3] 
                px-6 py-8 md:px-16 md:py-8
            `}>
                <h1 className={`
                    text-3xl md:text-[32px] 
                    font-bold text-[#1e3a22] font-serif dark:text-white
                `}>
                    {language === 'en' ? 'Tasku' : 'Tugasku'}
                </h1>
                <h3 className="mb-5 text-[#6b5740] dark:text-gray-300">
                    {language === 'en' ? "Let's make today productive 🌿" : "Mari produktif hari ini 🌿"}
                </h3>
                
                <div className="flex gap-3 mt-4 mb-4">
                    <button onClick={toggleLanguage} className="px-3 py-1 bg-white border border-[#c1896a]/20 text-[#8a7060] rounded-md text-sm hover:bg-[#f0e8e0]">
                        🌐 {language === 'en' ? 'ID' : 'EN'}
                    </button>
                    <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} className="px-3 py-1 bg-white border border-[#c1896a]/20 text-[#8a7060] rounded-md text-sm hover:bg-[#f0e8e0]">
                        🔃 Sort by Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                    </button>
                </div>

                <div className="mt-4">
                    <button onClick={() => setAddModal(true)}
                        className={`
                        flex items-center gap-2 
                        px-5 py-2 
                        bg-gradient-to-br from-[#2d5a36] to-[#4a8c57] 
                        text-[#f0e8e0] text-sm md:text-base font-semibold
                        rounded-[30px] border-none 
                        cursor-pointer hover:opacity-90 transition-opacity
                    `}>
                        <i className="fa-solid fa-plus text-[#f0e8e0]"></i>
                        Add New Task
                    </button>
                </div>
                {/*tab filter status*/}
                <div
                    className={`
                    mt-6 mb-6
                    flex items-center gap-2
                    bg-[#f5ede0] px-2 py-2
                    rounded-xl w-fit
                `}>
                    <button

                        onClick={() => setFilterStatus('All')}
                        className={`
                       ${filterStatus === 'All' ? 'bg-gradient-to-br from-[#a06040] to-[#c1896a] text-[#f0e8e0]' : 'bg-transparent text-[#8a7060]'}
                        rounded-lg border-none
                        cursor-pointer hover:opacity-90 transition-opacity
                        text-sm font-semibold
                        px-5 py-2 
                        `}>
                        All Tasks
                    </button>
                    <button
                        onClick={() => setFilterStatus('To Do')}
                        className={`
                        ${filterStatus === 'To Do' ? 'bg-gradient-to-br from-[#a06040] to-[#c1896a] text-[#f0e8e0]' : 'bg-transparent text-[#8a7060]'}
                        rounded-lg border-none
                        cursor-pointer hover:opacity-90 transition-opacity
                        text-sm font-semibold
                        px-5 py-2 
                        `}>
                        To Do
                    </button>
                    <button
                        onClick={() => setFilterStatus('Done')}
                        className={`
                        ${filterStatus === 'Done' ? 'bg-gradient-to-br from-[#2d5a36] to-[#4a8c57]  text-[#f0e8e0] ' : 'bg-transparent  text-[#8a7060] '}
                        rounded-lg border-none
                        cursor-pointer hover:opacity-90 transition-opacity
                        text-sm font-semibold
                        px-5 py-2 
                        `}>
                        Done
                    </button>
                </div>
                {/**task list */}
                {sortedTasks
                    .filter((t) => {
                        if (filterStatus === 'All') return true;
                        if (filterStatus === 'To Do') return t.status === 'todo';
                        if (filterStatus === 'Done') return t.status === 'done';
                        return true;
                    })
                    .map((task) => (
                        <div
                            key={task.id}
                            className={`
                        ${task.status === 'done' ?
                                    'bg-gradient-to-br from-[rgba(220,242,224,0.9)] to-[rgba(200,230,208,0.8)] border-[rgba(90,138,98,0.25)] shadow-md shadow-[#2d5a36]/15'
                                    : 'bg-gradient-to-br from-[rgba(255,248,240,0.95)] to-[rgba(255,235,220,0.85)] border-[rgba(192,128,96,0.2)] shadow-md shadow-[#a06040]/15'
                                }
                        rounded-xl
                        border
                        border-1
                        p-4
                        mb-4
                        w-full
                `}>
                            <div className="flex items-start gap-3 w-full justify-between group">

                                {/* Kiri: Checkbox & Konten */}
                                <div className="flex items-start gap-3">
                                    <div className="relative flex items-center justify-center ml-2 mt-1">
                                        <input type="checkbox"
                                            checked={task.status === 'done'}
                                            onChange={() => handleToggleStatus(task.id, task.status)}
                                            className={`
                                        peer 
                                        appearance-none rounded-xl checked:bg-[#2d5a36]
                                        checked:border-transparent cursor-pointer border-[#c1896a]
                                        border-2 w-6 h-6
                                    `} />
                                        <i className="fa-solid fa-check absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none text-xs"></i>
                                    </div>
                                    <div className="flex flex-col gap-1">

                                        <div className="flex gap-2">
                                            <h4
                                                className={`
                                            font-semibold text-md text-[#2d1f0f] 
                                            transition-all duration-200
                                            group-has-[:checked]:line-through group-has-[:checked]:opacity-60
                                        `}>
                                                {task.name}
                                            </h4>
                                            <span className={`
                                            ${badgeColor(task.tag)}
                                            border-1 text-sm rounded-2xl w-fit px-4 py-1 font-semibold
                                        `}>
                                                # {task.tag}
                                            </span>
                                        </div>
                                        <p className={`
                                        text-[#8a7060] text-sm mt-2
                                    `}>
                                            {task.description}
                                        </p>
                                        <div className="flex items-center text-xs font-medium text-[#a06040] mt-2 bg-white/40 w-fit px-2 py-1 rounded-md border border-[#a06040]/10">
                                            <i className="fa-regular fa-calendar mr-1.5"></i>
                                            {task.due_date?.seconds
                                                ? new Date(task.due_date.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                                                : String(task.due_date)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2 mt-1">
                                    <button onClick={() => handleEdit(task)} className="text-[#8a7060] hover:text-[#2d5a36] transition-colors" title="Edit Task">
                                        <i className="fa-solid fa-pen text-lg"></i>
                                    </button>
                                    <button onClick={() => handleDelete(task.id)} className="text-[#8a7060] hover:text-red-500 transition-colors" title="Delete Task">
                                        <i className="fa-solid fa-trash text-lg"></i>
                                    </button>
                                </div>

                            </div>



                        </div>

                    ))}

            </div>

            {addModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className={`
                        bg-[#faf5ef] rounded-2xl shadow-xl border border-[#c1896a]/20
                        w-full max-w-md flex flex-col p-6 relative
                    `}>
                        {/* Tombol Close */}
                        <button
                            onClick={() => setAddModal(false)}
                            className="absolute top-4 right-4 text-[#8a7060] hover:text-[#a06040] transition-colors"
                        >
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>

                        <h1 className={`
                         text-2xl md:text-[32px] 
                        font-bold text-[#1e3a22] font-serif
                        `}
                        >{edit ? 'Edit Task' : 'Add New Task'}</h1>
                        <h3 className={`
                        text-sm md:text-base font-medium text-[#8a7060] mt-1 mb-6
                        `}>Fill in the details below</h3>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Input Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#6b5740]">Task Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="What do you need to do?"
                                    className="p-2.5 rounded-xl border border-[#c1896a]/40 bg-white outline-none focus:border-[#2d5a36] focus:ring-1 focus:ring-[#2d5a36] text-[#2d1f0f]"
                                    required
                                />
                            </div>

                            {/* Input Description */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#6b5740]">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add some details..."
                                    rows="3"
                                    className="p-2.5 rounded-xl border border-[#c1896a]/40 bg-white outline-none focus:border-[#2d5a36] focus:ring-1 focus:ring-[#2d5a36] text-[#2d1f0f] resize-none"
                                />
                            </div>

                            <div className="flex gap-4">
                                {/* Select Tag */}
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-semibold text-[#6b5740]">Tag</label>
                                    <select
                                        value={formTag}
                                        onChange={(e) => setFormTag(e.target.value)}
                                        className="p-2.5 rounded-xl border border-[#c1896a]/40 bg-white outline-none focus:border-[#2d5a36] focus:ring-1 focus:ring-[#2d5a36] text-[#2d1f0f] cursor-pointer"
                                    >
                                        <option value="home">Home</option>
                                        <option value="office">Office</option>
                                        <option value="study">Study</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                </div>

                                {/* Input Date */}
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-semibold text-[#6b5740]">Due Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="p-2.5 rounded-xl border border-[#c1896a]/40 bg-white outline-none focus:border-[#2d5a36] focus:ring-1 focus:ring-[#2d5a36] text-[#2d1f0f] cursor-pointer"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-2 px-4 py-3 bg-gradient-to-br from-[#2d5a36] to-[#4a8c57] text-[#f0e8e0] rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity"
                            >
                                {edit ? 'Update Task' : 'Save Task'}
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </main>
    )

}

export default function Homepage() {
    return (
        <SettingsProvider>
            <HomepageContent />
        </SettingsProvider>
    );
}
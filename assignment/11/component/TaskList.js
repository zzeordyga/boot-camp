"use client"
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from '../firebase/config';

export default function TaskList() {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState([]);
    const [form, setForm] = useState({
        title: "",
        priority: "",
        due: ""
    })

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Tasks"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(data)
            setTask(data);
        })
        return () => unsub();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const addTask = async () => {
        if (!form.title.trim()) return;

        await addDoc(collection (db, "Tasks"), {
            title: form.title.trim(),
            priority: form.priority,
            dueDate: form.due,
            createdAt: serverTimestamp(),
        })

        setForm({ title: '', priority: '', due: '' });
        setShowModal(false);
    }

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, "Tasks", id));
    }
    return (
        <div className="p-10 mt-10">
            <h1 className="text-3xl font-bold mb-5">Task List</h1>

            <div className="flex justify-end">
                <button onClick={() => setShowModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md px-3 py-2 cursor-pointer">Add Task</button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4">New Task</h2>

                        <div className="mt-5">
                            <label className="font-medium">Title</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-2 mt-2 border border-gray rounded-md"></input>
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Priority</label>
                            <select name="priority" className="w-full p-2 mt-2 border border-gray rounded-md" value={form.priority} onChange={handleChange}>
                                <option value={"Low"}>Low</option>
                                <option value={"Medium"}>Medium</option>
                                <option value={"High"}>High</option>
                            </select>
                        </div>
                        <div className="mt-3">
                            <label className="font-medium">Title</label>
                            <input type="date" name="due" className="w-full p-2 mt-2 border border-gray rounded-md" value={form.due} onChange={handleChange}></input>
                        </div>

                        <div className="flex justify-between mt-10 mb-5">
                            <button
                            onClick={() => setShowModal(false)}
                            className="text-purple-600 border-2 border-purple-600 font-medium px-3 py-2 rounded-md cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md px-3 py-2 cursor-pointer"
                            onClick={() => addTask()}
                            >
                                Save Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full p-10">
                <table className="border w-full">
                    <thead>
                        <tr>
                            <th className="border p-3">Title</th>
                            <th className="border p-3">Priority</th>
                            <th className="border p-3">Due Date</th>
                            <th className="border p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.map((item) => (
                            <tr key={item.id} className="border p-3">
                                <td className="border p-3">{item.title}</td>
                                <td className="border p-3">{item.priority}</td>
                                <td className="border p-3">{item.dueDate}</td>
                                <td className="flex justify-center p-3">
                                    <button onClick={() => deleteTask(item.id)} className="bg-red-600 font-medium text-white rounded-md px-3 py-2 cursor-pointer">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
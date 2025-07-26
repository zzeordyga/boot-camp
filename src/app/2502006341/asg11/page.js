"use client"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react"
import getDb from "./config";
import useLocalStorage from "./hooks/useLocalStorage";
import { useTheme } from "./context/ThemeContext";

export default function Main(){

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState("");
    const [errors, setErrors] = useState("");
    const selectSort = useRef(null);
    const popup = useRef(null);
    const content = useRef(null);
    const contentEdit = useRef(null);
    const date = useRef(null);
    const db = getDb();
    const {sort, changeSort} = useLocalStorage();
    const {theme, toggleTheme} = useTheme();

    useEffect(()=>{
        document.body.classList.toggle("dark", theme==="dark");
    }, [theme])

    useEffect(()=>{
        const taskRef = collection(db, "tasks");
        const q = query(taskRef, orderBy(sort));
        const unsuscribe = onSnapshot(q, (snapshot)=>{
            setLoading(true);
           const taskData = snapshot.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
           }));
           if(taskData){
            setTasks(taskData);
            setLoading(false);
           }
        });
        return () => unsuscribe();
    }, [loading, sort]);

    const handleSort = () => {
        const sortValue = selectSort.current.value;
        changeSort(sortValue);
    }

    const openPopup = () => {
        popup.current.style.display = "flex";
    }

    const closePopup = () => {
        popup.current.style.display = "none";
    }

    const handleOnChange = () => {
        setErrors();
    }

    const addTask = async (e) => {
        e.preventDefault();
        if(content.current.value===""){
            setErrors("Task must be filled");
            return;
        }
        else if(date.current.value===""){
            setErrors("Date must be filled");
            return;
        }
        const dateObject = new Date(date.current.value);
        console.log(dateObject);
        const taskRef = await addDoc(collection(db, "tasks"), {
            content: content.current.value,
            dueDate: Timestamp.fromDate(dateObject),
        });
        console.log("Succesfully added: " + taskRef.id);
        content.current.value = "";
        date.current.value = "";
        closePopup();
    }

    const deleteTask = async (taskId) => {
        await deleteDoc(doc(db, "tasks", taskId));
    }

    const editTask = async (taskId) => {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, {
            content: contentEdit.current.value
        });
        setEdit("");
    }

    console.log(tasks);
    console.log(loading);
    console.log(edit);

    return <div className="hero">
        <h1>Task Manager</h1>
        <div className="sort">
            <label>Sort: </label>
            <select ref={selectSort} value={sort} onChange={handleSort}>
                <option value="dueDate">Due Date</option>
                <option value="content">Alphabetical</option>
            </select>
            <button onClick={toggleTheme}>Switch to {theme==="light"? "dark" : "light"} mode</button>
        </div>
        <button onClick={openPopup}>Add task</button>
        {loading? <p className="subtitle">Loading ...</p> : 
            <div className="card-list">
                {tasks.length===0? <p className="subtitle">Yay! You have no tasks</p> :
                    tasks.map((task)=>(<div className="card" key={task.id}>
                        {edit===task.id? <input type="text" style={{backgroundColor: "white"}} ref={contentEdit} defaultValue={task.content} required/> : <h3>{task.content}</h3>}
                        <p className="subtitle" style={{textAlign: "justify"}}>{task.dueDate.toDate().toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</p>
                        <div className="buttons">
                            {edit===task.id? <button className="sec-btn" onClick={()=>editTask(task.id)}>Save</button>: <button className="sec-btn" onClick={()=>setEdit(task.id)}>Edit</button>}
                            <button style={{backgroundColor: "mediumseagreen"}} onClick={()=>deleteTask(task.id)}>Set Done</button>
                        </div>
                    </div>))
                }
            </div>
        }
        <div ref={popup} className="popup">
            <form className="add-post-form">
                <div className="content">
                    <label>Task</label>
                    <input type="text" ref={content} onChange={handleOnChange} />
                </div>
                <div className="content">
                    <label>Due Date</label>
                    <input type="datetime-local" ref={date} onChange={handleOnChange} />
                </div>
                {errors && <p className="error-text">{errors}</p>}
                <button onClick={addTask}>Add</button>
                <button onClick={closePopup} className="sec-btn">Cancel</button>
            </form>
        </div>
    </div>
}
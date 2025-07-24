"use client";
import useLocalStorage from "../hook/useLocalStorage";

const fakeData = [
  {
    id: 1,
    title: "Post 1",
    content: "Content for post 1",
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content for post 2",
  },
  {
    id: 3,
    title: "Post 3",
    content: "Content for post 3",
  },
  {
    id: 4,
    title: "Post 4",
    content: "Content for post 4",
  },
  {
    id: 5,
    title: "Post 5",
    content: "Content for post 5",
  }
];

export default function sesi11Page() {
    const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "asc");

    const sortedData = [...fakeData].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        }else {
            return b.title.localeCompare(a.title);
        }
    }); 

    return (
        <div>
        <h1 style={{ color: '#333' }}>Welcome to Sesi 11 Home</h1>
        <p style={{ fontSize: '16px' }}>This is the default page for sesi-11.</p>
        <h2>Sort Order: {sortOrder}</h2>
        <button onClick={() => setSortOrder("asc")}>Sort Ascending</button>
        <button onClick={() => setSortOrder("desc")}>Sort Descending</button>
        <h3>Sample Data:</h3>
        <ul>
            {sortedData.map((item) => (
                <li key={item.id}>
                    <p>{item.id}</p>
                    <p>{item.title}</p>
                    <p>{item.content}</p>
                </li>
            ))}
        </ul>
        </div>
    );
}
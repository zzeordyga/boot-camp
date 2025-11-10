"use client";

import Layout from "../component/Layout";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function AssignmentW8() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const pathName = usePathname();
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=50")
      .then((res) => res.json())
      .then(setData);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Layout>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display: "flex",
          width: "100%",
        }}
      />
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.length > 0 &&
            filteredData.slice(0, 50).map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => {
                        localStorage.setItem("postId", item.id);
                        router.push(`${pathName}/details`);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}

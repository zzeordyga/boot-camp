"use client";
import { useEffect, useMemo, useRef, useState } from "react"
import "./css/home.css"
import { useRouter } from "next/navigation";

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
      const fetchDatas = async () => {
        try {
          const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
          const data = await response.json();
          setData(data);
        } finally {
          setLoading(false);
        }
      }

      fetchDatas();
  }, []);

  useEffect(() => {
    searchRef.current?.focus();
  }, [])

  const filteredPost = useMemo(() => {
    return data.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const viewDetail = (postId) => {
      router.push(`/2602136713/details/${postId}`)
  }

  return (
    <div className="home">
      <div className="search-container">
        <input className="search-input" ref={searchRef} type="text" placeholder="Search a Post" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <div className="post-grid">
          {filteredPost.map((post) => (
            <div key={post.id} className="post-card">
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <button onClick={() => viewDetail(post.id)} className="detail-btn">View Detail</button>
            </div>
          ))}
      </div>

       
    </div>
  )
}

export default page
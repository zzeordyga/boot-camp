'use client';

import { useEffect, useState } from "react";
import getDatabase from "./firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";



export default function Home() {
  const [postList, setPostData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")


  const filteredPost = postList.filter((post) =>
    post.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
          const db = getDatabase();
          const postCol = collection(db, "posts");
          const postSnapshoot = await getDocs(postCol);
          const postList = postSnapshoot.docs.map((doc) => ({
            id : doc.id,
            ...doc.data()
          }))
          console.log("🔥 Data dari Firestore:", postList);

          setPostData(postList);
      }
      catch (error){
        setError("Error Fetching the data")
      } finally {
        setLoading(false);
      }
     
    }

    fetchData();

  }, []);
  return (
    <div  className="p-10 mt-5">
      <h1 className="font-bold text-5xl text-center">All Post Data</h1>

      <input type="text" 
      placeholder="Search your data here"
      value={searchKeyword} 
      onChange={(e) => setSearchKeyword(e.target.value)}
      className="w-48 border border-gray-400 focus:border-gray-500 p-2 rounded mt-10"></input>

      <div className="w-full mt-10">
        {loading ? (
          <p className="text-lg  text-center font-medium text-gray-400">Loading ...</p>
        ) : 
        error ? (
           <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <table className="w-full border rounded-2xl">
            <thead>
              <tr>
                <th className="border">Title</th>
                <th className="border">Content</th>
                <th className="border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredPost.length == 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-5">No post found</td>
                </tr>
              ) : (
                filteredPost.map((value, index) => (
                  <tr key={index}>
                    <td className="border p-5">{value.title}</td>
                    <td className="border  p-5">{value.content}</td>
                    <td className="border p-5">{value.createdAt?.toDate().toLocaleString()}</td>

                  </tr>
                ))
              )}
              {}
            </tbody>
          </table>
        )
        }
        
      </div>
    </div>
     
  );
}

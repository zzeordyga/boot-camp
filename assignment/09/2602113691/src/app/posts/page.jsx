import PostListView from "@/app/posts/components/PostListView";
import React from "react";
import AddPost from "@/app/posts/components/AddPost";
import SearchBar from "./components/SearchBar";

export default async function Posts() {
  return ( 
    <>
        <SearchBar />
        <AddPost />
        <PostListView />
    </>
  )
}

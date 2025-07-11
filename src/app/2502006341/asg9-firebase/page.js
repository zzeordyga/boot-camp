"use client"
import { useRouter } from "next/navigation";

export default function Home(){

    const router = useRouter();

    function goToPosts(){
        router.push("/2502006341/asg9-firebase/posts");
    }

    return <div className="hero">
        This is a <h1>Next.js + Firebase</h1> project!
        <p className="subtitle">Check it out by going to posts</p>
        <button onClick={goToPosts}>Go to posts</button>
    </div>
}
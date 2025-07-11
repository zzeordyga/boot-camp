import Link from "next/link";

export default function Home(){
    return <div className="hero">
        <h1>Main Page</h1>
        
        <p>Since the folder in this Github project is used for 3 assignments, I made a directory to navigate to them.</p>

        <div className="card-list">
            <div className="card">
                <h3>Session 6 - React Assignment</h3>
                <Link href="/2502006341/asg6-react">To the page!</Link>
            </div>
            <div className="card">
                <h3>Session 8 - Next.js Assignment</h3>
                <Link href="/2502006341/asg8-nextjs">To the page!</Link>
            </div>
            <div className="card">
                <h3>Session 9 - Firebase + Next.js Assignment</h3>
                <Link href="/2502006341/asg9-firebase">To the page!</Link>
            </div>
        </div>
    </div>
}
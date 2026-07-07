import Link from "next/link";
import "../../css/detail.css"

const page = async ({params}) => {
    const { slug } = await params;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
    const post = await response.json();    

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h1 className="detail-heading">This is a detail page for the post of title</h1>
                <h1 className="detail-title">{post.title}</h1>

                <p className="detail-subtitle">With a description of</p>
                <p className="detail-body">{post.body}</p>

                <Link href="/2602136713" className="back-btn">
                    Back
                </Link>
            </div>
        </div>
    )
}

export default page

export async function generateStaticParams(){
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const posts = await response.json();

    return posts.map((post) => ({
        slug: post.id.toString(),
    }))
}
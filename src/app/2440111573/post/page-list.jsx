'use client';


export default function postListComponent({posts}){

    return(
        <>
        <div>
            <li>
            {posts.map((post) => (
                <div
                key={post.id}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    margin: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    width: "300px", // Fixed width for card-like appearance
                    minHeight: "150px",
                }}
                >
                <h4
                    style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.2em",
                    color: "#333",
                    }}
                >
                    {post.title}
                </h4>
                <p
                    style={{
                    margin: "0 0 15px 0",
                    color: "#666",
                    lineHeight: "1.5",
                    }}
                >
                    {post.content}
                </p>
                <time
                    style={{
                    marginTop: "auto", // Pushes it to the bottom
                    fontSize: "0.9em",
                    color: "#888",
                    }}
                >
                    {post.createdAt}
                </time>
                </div>
            ))}
            </li>
        </div>
        </>
    );
}
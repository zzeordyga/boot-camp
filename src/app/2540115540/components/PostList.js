export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts found.</p>;
  return (
    <ul>
      {posts.map(p => (
        <li key={p.id}>
          <strong>{p.title}</strong> <em>({new Date(p.createdAt.seconds * 1000).toLocaleString()})</em>
          <p>{p.content}</p>
        </li>
      ))}
    </ul>
  );
}

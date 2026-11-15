function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          No posts found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Try searching with another keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-lg font-bold text-gray-900">
            {post.title}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {post.content}
          </p>

          <div className="mt-5 border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-400">
              {post.createdAt?.toDate
                ? post.createdAt.toDate().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date unavailable"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;
export default function PostCard({ title, content, createdAt }) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <h2 className="text-lg font-bold text-blue-500">{title}</h2>
        <p className="font-semibold text-gray-600 text-sm">{createdAt}</p>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

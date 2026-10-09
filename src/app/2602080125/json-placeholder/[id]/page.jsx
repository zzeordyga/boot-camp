import PostDetail from "../../../../../views/2602080125/json-placeholder/post-detail";

const TOTAL_POSTS = 100;
export function generateStaticParams() {
    return Array.from({ length: TOTAL_POSTS }, (_, i) => ({
        id: String(i + 1),
    }));
}

export default function Page() {
    return <PostDetail />;
}
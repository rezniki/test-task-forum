import type { Post } from "../types/post";
import { Link } from "react-router-dom";

interface Props {
    post: Post;
}

export default function PostCard({ post }: Props) {
    return (
        <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-700">{post.body.slice(0, 80)}...</p>
        <Link
            to={`/post/${post.id}`}
            className="text-blue-500 hover:underline mt-2 block"
        >
            Читать далее
        </Link>
        </div>
    );
}

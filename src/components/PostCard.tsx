import React from "react";
import type { Post } from "../types/post";
import { Link } from "react-router-dom";

interface Props {
    post: Post;
    onLike: (id: number) => void;
    onDislike: (id: number) => void;
    onToggleFavorite: (id: number) => void;
    onDelete: (id: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onLike, onDislike, onToggleFavorite, onDelete }) => {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
        <Link to={`/posts/${post.id}`} className="hover:underline">
            <h2 className="text-lg font-semibold">{post.title}</h2>
        </Link>
        <p className="text-gray-700 mt-2">{post.body}</p>

        <div className="flex items-center gap-3 mt-4">
            <button onClick={() => onLike(post.id)} className="px-3 py-1 bg-green-500 text-white rounded">
            👍 {post.likes ?? 0}
            </button>
            <button onClick={() => onDislike(post.id)} className="px-3 py-1 bg-red-500 text-white rounded">
            👎 {post.dislikes ?? 0}
            </button>
            <button
            onClick={() => onToggleFavorite(post.id)}
            className={`px-3 py-1 rounded ${post.isFavorite ? "bg-yellow-400" : "bg-gray-300"}`}
            >
            ⭐ {post.isFavorite ? "В избранном" : "В избранное"}
            </button>
            <button onClick={() => onDelete(post.id)} className="ml-auto px-3 py-1 bg-gray-500 text-white rounded">
            🗑 Удалить
            </button>
        </div>
        </div>
    );
};

export default PostCard;

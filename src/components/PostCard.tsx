import React from "react";
import type { Post } from "../types/post";

interface Props {
    post: Post;
    likes: number;
    isFavorite: boolean;
    onLike: () => void;
    onDislike: () => void;
    onToggleFavorite: () => void;
    onDelete: () => void;
}

const PostCard: React.FC<Props> = ({
    post,
    likes,
    isFavorite,
    onLike,
    onDislike,
    onToggleFavorite,
    onDelete,
    }) => {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold">{post.title}</h2>
        <p className="text-gray-700 mt-2">{post.body}</p>

        <div className="flex items-center gap-4 mt-4">
            <button
            onClick={onLike}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
            👍 {likes}
            </button>
            <button
            onClick={onDislike}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
            👎
            </button>
            <button
            onClick={onToggleFavorite}
            className={`px-3 py-1 rounded ${
                isFavorite ? "bg-yellow-400" : "bg-gray-300"
            }`}
            >
            ⭐ {isFavorite ? "В избранном" : "В избранное"}
            </button>
            <button
            onClick={onDelete}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
            🗑 Удалить
            </button>
        </div>
        </div>
    );
};

export default PostCard;

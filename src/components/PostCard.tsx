import React, { useState } from "react";
import type { Post } from "../types/post";
import { Link } from "react-router-dom";

interface PostCardProps {
    post: Post;
    onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="border p-4 rounded shadow-sm bg-white">
        <Link to={`/posts/${post.id}`}>
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
        </Link>
        <p className="mb-4">{post.body}</p>

        <div className="flex gap-4 mb-3">
            <button
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => setLikes(likes + 1)}
            >
            👍 {likes}
            </button>
            <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => setDislikes(dislikes + 1)}
            >
            👎 {dislikes}
            </button>
            <button
            className={`px-3 py-1 rounded ${isFavorite ? "bg-yellow-500" : "bg-gray-300"}`}
            onClick={() => setIsFavorite(!isFavorite)}
            >
            ⭐ {isFavorite ? "В избранном" : "В избранное"}
            </button>
        </div>

        <button
            onClick={() => onDelete(post.id)}
            className="px-3 py-1 bg-gray-500 text-white rounded"
        >
            Удалить
        </button>
        </div>
    );
};

export default PostCard;


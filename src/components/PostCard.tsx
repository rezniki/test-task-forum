import React from "react";
import type { Post } from "../types/post";
import { Link } from "react-router-dom";

interface Props {
    post: Post;
    onLike: (id: number) => void;
    onDislike: (id: number) => void;
    onFavorite: (id: number) => void;
    onDelete: (id: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onLike, onDislike, onFavorite, onDelete }) => {
    return (
        <div className="border rounded p-4 shadow bg-white">
        <Link to={`/post/${post.id}`}>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        </Link>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="flex gap-3">
            <button
            className={`px-3 py-1 rounded ${post.liked ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => onLike(post.id)}
            >
            👍
            </button>
            <button
            className={`px-3 py-1 rounded ${post.disliked ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => onDislike(post.id)}
            >
            👎
            </button>
            <button
            className={`px-3 py-1 rounded ${post.favorite ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            onClick={() => onFavorite(post.id)}
            >
            ⭐
            </button>
            <button
            className="px-3 py-1 rounded bg-gray-300"
            onClick={() => onDelete(post.id)}
            >
            🗑
            </button>
        </div>
        </div>
    );
};

export default PostCard;

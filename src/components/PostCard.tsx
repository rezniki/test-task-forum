import React from "react";
import type { Post } from "../types/post";

interface Props {
    post: Post;
    onLike: (id: number) => void;
    onDislike: (id: number) => void;
    onFavorite: (id: number) => void;
}

const PostCard: React.FC<Props> = ({ post, onLike, onDislike, onFavorite }) => {
    return (
        <div className="border rounded p-4 shadow bg-white">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="flex gap-3">
            <button
            className={`px-3 py-1 rounded ${post.liked ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => onLike(post.id)}
            >
            👍 Like
            </button>
            <button
            className={`px-3 py-1 rounded ${post.disliked ? "bg-red-500 text-white" : "bg-gray-200"}`}
            onClick={() => onDislike(post.id)}
            >
            👎 Dislike
            </button>
            <button
            className={`px-3 py-1 rounded ${post.favorite ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
            onClick={() => onFavorite(post.id)}
            >
            ⭐ Favorite
            </button>
        </div>
        </div>
    );
};

export default PostCard;


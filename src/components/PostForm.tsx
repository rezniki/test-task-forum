import React, { useState } from "react";
import type { Post } from "../types/post";

type PostFormProps = {
    onSubmit: (post: Omit<Post, "id">) => void;
};

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        onSubmit({
        title,
        body,
        userId: 1 
        });

        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow">
        <div>
            <label className="block mb-1 font-semibold">Заголовок</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите заголовок поста"
            />
        </div>

        <div>
            <label className="block mb-1 font-semibold">Текст</label>
            <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите текст поста"
            />
        </div>

        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
            Создать пост
        </button>
        </form>
    );
};

export default PostForm;

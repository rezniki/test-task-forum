import React, { useState } from "react";
import type { Post } from "../types/post";

interface PostFormProps {
    onSubmit: (post: Omit<Post, "id">) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId] = useState(1); // Для теста создаём пост от "первого пользователя"

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        onSubmit({ title, body, userId });
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm bg-white mb-6">
        <h2 className="text-lg font-semibold mb-4">Создать пост</h2>

        <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-3"
        />

        <textarea
            placeholder="Текст поста"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full mb-3"
        />

        <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Опубликовать
        </button>
        </form>
    );
};

export default PostForm;

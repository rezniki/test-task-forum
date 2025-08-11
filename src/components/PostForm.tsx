import React, { useState } from "react";
import type { Post } from "../types/post";

interface Props {
    onSubmit: (p: Omit<Post, "id">) => void;
}

const PostForm: React.FC<Props> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId] = useState(1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;
        onSubmit({ userId, title, body });
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={submit} className="p-4 bg-white rounded shadow mb-6">
        <h3 className="font-semibold mb-3">Создать пост</h3>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Заголовок" className="w-full border p-2 mb-2 rounded" />
        <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Текст" rows={4} className="w-full border p-2 mb-2 rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Опубликовать</button>
        </form>
    );
};

export default PostForm;

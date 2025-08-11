import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

const COMMENTS_KEY_PREFIX = "forum_comments_post_";

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        if (!id) return;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(r => r.json())
        .then((d: Post) => setPost(d));

        const saved = localStorage.getItem(COMMENTS_KEY_PREFIX + id);
        if (saved) {
        setComments(JSON.parse(saved));
        } else {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(r => r.json())
            .then((c: Comment[]) => setComments(c));
        }
    }, [id]);

    const persistComments = (next: Comment[]) => {
        setComments(next);
        if (id) localStorage.setItem(COMMENTS_KEY_PREFIX + id, JSON.stringify(next));
    };

    const addComment = () => {
        if (!text.trim() || !id) return;
        const newC: Comment = {
        id: Date.now(),
        postId: Number(id),
        name: "Вы",
        email: "you@example.com",
        body: text.trim(),
        };
        persistComments([...comments, newC]);
        setText("");
    };

    if (!post) return <div className="p-6">Загрузка...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
        <Link to="/" className="text-blue-500 underline">← Назад</Link>
        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <p className="mt-2">{post.body}</p>

        <h2 className="text-xl font-semibold mt-6">Комментарии</h2>
        <div className="space-y-2 mt-3">
            {comments.map(c => (
            <div key={c.id} className="p-3 bg-white border rounded">
                <div className="text-sm text-gray-600 mb-1">{c.name} — {c.email}</div>
                <div>{c.body}</div>
            </div>
            ))}
        </div>

        <div className="mt-4">
            <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full border p-2 rounded" rows={3} placeholder="Оставить комментарий..." />
            <button onClick={addComment} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Отправить</button>
        </div>
        </div>
    );
};

export default PostDetails;


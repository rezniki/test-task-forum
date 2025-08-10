import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

const PostDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (!id) return;

        // Загружаем пост
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));

        // Загружаем комментарии
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then((res) => res.json())
        .then((data) => setComments(data));
    }, [id]);

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const newCommentObj: Comment = {
        postId: Number(id),
        id: Date.now(),
        name: "Вы",
        email: "you@example.com",
        body: newComment,
        };

        setComments((prev) => [...prev, newCommentObj]);
        setNewComment("");
    };

    if (!post) return <p>Загрузка...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
        <Link to="/" className="text-blue-500 hover:underline">
            ← Назад
        </Link>

        <h1 className="text-2xl font-bold mt-4">{post.title}</h1>
        <p className="mt-2">{post.body}</p>

        <h2 className="text-lg font-semibold mt-6">Комментарии</h2>
        <div className="mt-2 space-y-2">
            {comments.map((c) => (
            <div key={c.id} className="border p-2 rounded bg-gray-50">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
                <p>{c.body}</p>
            </div>
            ))}
        </div>

        <div className="mt-4">
            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите комментарий..."
            className="border w-full p-2 rounded"
            />
            <button
            onClick={handleAddComment}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
            Добавить комментарий
            </button>
        </div>
        </div>
    );
};

export default PostDetails;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (!id) return;
        axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => setPost(res.data));

        axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(res => setComments(res.data));
    }, [id]);

    const addComment = () => {
        if (!newComment.trim()) return;
        const comment: Comment = {
        id: Date.now(),
        postId: Number(id),
        name: "You",
        email: "you@example.com",
        body: newComment
        };
        setComments(prev => [...prev, comment]);
        setNewComment("");
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="p-4">
        <Link to="/" className="text-blue-500 underline">← Back</Link>
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="mb-4">{post.body}</p>

        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <div className="space-y-2 mb-4">
            {comments.map(c => (
            <div key={c.id} className="border p-2 rounded bg-gray-50">
                <p className="text-sm text-gray-600">{c.name} ({c.email})</p>
                <p>{c.body}</p>
            </div>
            ))}
        </div>

        <textarea
            className="border p-2 w-full mb-2"
            rows={3}
            placeholder="Write a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
        />
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addComment}
        >
            Add Comment
        </button>
        </div>
    );
}

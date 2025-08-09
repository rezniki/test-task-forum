import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => setPost(res.data));
        axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => setComments(res.data));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="mb-6">{post.body}</p>
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        {comments.map(c => (
            <div key={c.id} className="border-b py-2">
            <p className="font-bold">{c.name}</p>
            <p className="text-sm text-gray-500">{c.email}</p>
            <p>{c.body}</p>
            </div>
        ))}
        </div>
    );
};

export default PostPage;

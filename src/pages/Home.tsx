import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import PostCard from "../components/PostCard";

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    useEffect(() => {
        axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts").then(res => setPosts(res.data));
        axios.get<User[]>("https://jsonplaceholder.typicode.com/users").then(res => setUsers(res.data));
    }, []);

    const filteredPosts = selectedUser ? posts.filter(p => p.userId === selectedUser) : posts;

    const toggleLike = (id: number) =>
        setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, disliked: false } : p));

    const toggleDislike = (id: number) =>
        setPosts(prev => prev.map(p => p.id === id ? { ...p, disliked: !p.disliked, liked: false } : p));

    const toggleFavorite = (id: number) =>
        setPosts(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p));

    const deletePost = (id: number) =>
        setPosts(prev => prev.filter(p => p.id !== id));

    return (
        <div className="p-4">
        <select
            className="border p-2 mb-4"
            onChange={e => setSelectedUser(e.target.value ? Number(e.target.value) : null)}
        >
            <option value="">All users</option>
            {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
            ))}
        </select>
        <div className="grid gap-4">
            {filteredPosts.map(post => (
            <PostCard
                key={post.id}
                post={post}
                onLike={toggleLike}
                onDislike={toggleDislike}
                onFavorite={toggleFavorite}
                onDelete={deletePost}
            />
            ))}
        </div>
        </div>
    );
}

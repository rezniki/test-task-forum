import React, { useEffect, useState } from "react";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import UserFilter from "../components/UserFilter";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const PostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
            const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
            const postsData: Post[] = await postsRes.json();
            const usersData: User[] = await usersRes.json();
            setPosts(postsData);
            setUsers(usersData);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const handleCreatePost = (newPost: Omit<Post, "id">) => {
        const postWithId: Post = {
        ...newPost,
        id: posts.length ? posts[posts.length - 1].id + 1 : 1,
        };
        setPosts((prev) => [postWithId, ...prev]);
    };

    const handleDeletePost = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
        setFavorites((prev) => prev.filter((favId) => favId !== id));
        const newLikes = { ...likes };
        delete newLikes[id];
        setLikes(newLikes);
    };

    const handleLike = (id: number) => {
        setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDislike = (id: number) => {
        setLikes((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) - 1,
        }));
    };

    const handleToggleFavorite = (id: number) => {
        setFavorites((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
        );
    };

    const filteredPosts = selectedUserId
        ? posts.filter((post) => post.userId === selectedUserId)
        : posts;

    if (loading) {
        return <div className="p-6 text-center">Загрузка...</div>;
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Форум</h1>

        <UserFilter
            users={users}
            selectedUserId={selectedUserId}
            onChange={setSelectedUserId}
        />

        <PostForm onSubmit={handleCreatePost} />

        <div className="mt-8 space-y-4">
            {filteredPosts.map((post) => (
            <PostCard
                key={post.id}
                post={post}
                likes={likes[post.id] || 0}
                isFavorite={favorites.includes(post.id)}
                onLike={() => handleLike(post.id)}
                onDislike={() => handleDislike(post.id)}
                onToggleFavorite={() => handleToggleFavorite(post.id)}
                onDelete={() => handleDeletePost(post.id)}
            />
            ))}
        </div>
        </div>
    );
};

export default PostsPage;

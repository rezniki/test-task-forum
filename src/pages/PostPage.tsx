import React, { useEffect, useState } from "react";
import type { Post } from "../types/post";
import type { User } from "../types/user";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import UserFilter from "../components/UserFilter";

const POSTS_KEY = "forum_posts_v1";
const USERS_KEY = "forum_users_v1";

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(POSTS_KEY);
    if (saved) {
      setPosts(JSON.parse(saved));
      setLoading(false);
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(r => r.json())
        .then((data: any[]) => {
          const enriched: Post[] = data.map(d => ({ ...d, likes: 0, dislikes: 0, isFavorite: false }));
          setPosts(enriched);
          localStorage.setItem(POSTS_KEY, JSON.stringify(enriched));
        })
        .finally(()=>setLoading(false));
    }

    const savedUsers = localStorage.getItem(USERS_KEY);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(r => r.json())
        .then((u: User[]) => {
          setUsers(u);
          localStorage.setItem(USERS_KEY, JSON.stringify(u));
        });
    }
  }, []);

  const persist = (next: Post[]) => {
    setPosts(next);
    localStorage.setItem(POSTS_KEY, JSON.stringify(next));
  };

  const createPost = (p: Omit<Post, "id">) => {
    const nextId = posts.length ? Math.max(...posts.map(x=>x.id)) + 1 : 1;
    const newPost: Post = { ...p, id: nextId, likes: 0, dislikes: 0, isFavorite: false };
    persist([newPost, ...posts]);
  };

  const deletePost = (id: number) => persist(posts.filter(x=>x.id !== id));

  const like = (id: number) => persist(posts.map(x => x.id === id ? { ...x, likes: (x.likes||0)+1, dislikes: x.dislikes } : x));
  const dislike = (id: number) => persist(posts.map(x => x.id === id ? { ...x, dislikes: (x.dislikes||0)+1, likes: x.likes } : x));
  const toggleFav = (id: number) => persist(posts.map(x => x.id === id ? { ...x, isFavorite: !x.isFavorite } : x));

  const filtered = selectedUserId ? posts.filter(p => p.userId === selectedUserId) : posts;

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Форум</h1>

      <UserFilter users={users} selectedUserId={selectedUserId} onChange={setSelectedUserId} />

      <PostForm onSubmit={createPost} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <PostCard
            key={p.id}
            post={p}
            onLike={like}
            onDislike={dislike}
            onToggleFavorite={toggleFav}
            onDelete={deletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;

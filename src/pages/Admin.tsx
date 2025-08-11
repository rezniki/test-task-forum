import React, { useEffect, useState } from "react";
import type { User } from "../types/user";

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [priority, setPriority] = useState<number[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(r => r.json())
        .then((u: User[]) => setUsers(u));
    }, []);

    const changeUser = (id: number, key: keyof User, val: string) => {
        setUsers(prev => prev.map(u => u.id === id ? ({ ...u, [key]: val } as User) : u));
    };

    const togglePriority = (postId: number) => {
        setPriority(prev => prev.includes(postId) ? prev.filter(x=>x!==postId) : [...prev, postId]);
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Админка</h2>

        <section className="mb-6">
            <h3 className="font-semibold mb-2">Пользователи</h3>
            {users.map(u => (
            <div key={u.id} className="p-3 bg-white border rounded mb-2 flex gap-2">
                <input value={u.name} onChange={e => changeUser(u.id, "name", e.target.value)} className="border p-1 rounded" />
                <input value={u.email} onChange={e => changeUser(u.id, "email", e.target.value)} className="border p-1 rounded" />
                <input value={u.username} onChange={e => changeUser(u.id, "username", e.target.value)} className="border p-1 rounded" />
            </div>
            ))}
        </section>

        <section>
            <h3 className="font-semibold mb-2">Приоритет постов (пример)</h3>
            {[1,2,3,4,5].map(pid => (
            <div key={pid} className="flex items-center gap-3 mb-2">
                <span>Пост #{pid}</span>
                <button onClick={() => togglePriority(pid)} className={`px-3 py-1 rounded ${priority.includes(pid) ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                {priority.includes(pid) ? "В топе" : "Обычный"}
                </button>
            </div>
            ))}
        </section>
        </div>
    );
};

export default AdminPanel;


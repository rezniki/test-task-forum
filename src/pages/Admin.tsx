import React, { useEffect, useState } from "react";
import axios from "axios";
import type { User } from "../types/user";

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
        .then(res => setUsers(res.data));
    }, []);

    const updateUser = (id: number, field: keyof User, value: string) => {
        setUsers(prev =>
        prev.map(u => u.id === id ? { ...u, [field]: value } : u)
        );
    };

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        {users.map(u => (
            <div key={u.id} className="border p-3 rounded mb-3 bg-gray-50">
            <input
                className="border p-1 mr-2"
                value={u.name}
                onChange={e => updateUser(u.id, "name", e.target.value)}
            />
            <input
                className="border p-1"
                value={u.email}
                onChange={e => updateUser(u.id, "email", e.target.value)}
            />
            </div>
        ))}
        </div>
    );
}

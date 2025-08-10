import React, { useState } from "react";
import type { User } from "../types/user";

export default function Profile() {
    const [user, setUser] = useState<User>({
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        isAdmin: true
    });

    const updateField = (field: keyof User, value: string) => {
        setUser(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <label className="block mb-2">Name</label>
        <input
            className="border p-2 w-full mb-4"
            value={user.name}
            onChange={e => updateField("name", e.target.value)}
        />
        <label className="block mb-2">Email</label>
        <input
            className="border p-2 w-full mb-4"
            value={user.email}
            onChange={e => updateField("email", e.target.value)}
        />
        <label className="block mb-2">Username</label>
        <input
            className="border p-2 w-full mb-4"
            value={user.username}
            onChange={e => updateField("username", e.target.value)}
        />

        <p className="mt-4 text-sm text-gray-500">
            {user.isAdmin ? "Admin privileges enabled" : "Regular user"}
        </p>
        </div>
    );
}

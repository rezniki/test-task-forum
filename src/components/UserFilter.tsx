import React from "react";
import type { User } from "../types/user";

interface UserFilterProps {
    users: User[];
    selectedUserId: number | null;
    onChange: (userId: number | null) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, selectedUserId, onChange }) => {
    return (
        <div className="mb-4">
        <select
            value={selectedUserId ?? ""}
            onChange={(e) => {
            const value = e.target.value;
            onChange(value ? Number(value) : null);
            }}
            className="border border-gray-300 rounded p-2 w-full"
        >
            <option value="">Все пользователи</option>
            {users.map((user) => (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
            ))}
        </select>
        </div>
    );
};

export default UserFilter;

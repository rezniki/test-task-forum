import React from "react";
import type { User } from "../types/user";

interface Props {
    users: User[];
    selectedUserId: number | null;
    onChange: (id: number | null) => void;
}

const UserFilter: React.FC<Props> = ({ users, selectedUserId, onChange }) => {
    return (
        <div className="mb-4">
        <select
            value={selectedUserId ?? ""}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
            className="border p-2 rounded w-full"
        >
            <option value="">Все пользователи</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        </div>
    );
};

export default UserFilter;


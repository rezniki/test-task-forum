import React, { useState } from "react";
import type { User } from "../types/user";

interface Props {
  user: User;
  onUpdate: (u: User) => void;
}

const Profile: React.FC<Props> = ({ user, onUpdate }) => {
  const [form, setForm] = useState<User>(user);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const [, key] = name.split(".");
      setForm(prev => ({ ...prev, address: { ...(prev.address ?? {}), [key]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value } as User));
    }
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
    localStorage.setItem("forum_current_user", JSON.stringify(form));
    alert("Профиль сохранён локально");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Личный кабинет</h2>
      <form onSubmit={save} className="space-y-3">
        <input name="name" value={form.name} onChange={change} className="w-full border p-2 rounded" />
        <input name="username" value={form.username} onChange={change} className="w-full border p-2 rounded" />
        <input name="email" value={form.email} onChange={change} className="w-full border p-2 rounded" />
        <input name="address.street" value={form.address?.street || ""} onChange={change} className="w-full border p-2 rounded" placeholder="Улица" />
        <input name="address.city" value={form.address?.city || ""} onChange={change} className="w-full border p-2 rounded" placeholder="Город" />
        <input name="phone" value={form.phone || ""} onChange={change} className="w-full border p-2 rounded" />
        <input name="website" value={form.website || ""} onChange={change} className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Сохранить</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

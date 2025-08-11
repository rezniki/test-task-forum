import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import PostsPage from "./pages/PostPage";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/Admin";
import type { User } from "./types/user";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    name: "Иван Петров",
    username: "ivanpetrov",
    email: "ivan@example.com",
    isAdmin: true,
    address: {
      street: "Ленина",
      suite: "12",
      city: "Москва",
      zipcode: "101000",
    },
    phone: "+7 (999) 123-45-67",
    website: "example.com",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4 flex items-center gap-4">
        <Link to="/" className="hover:underline">Главная</Link>
        <Link to="/profile" className="hover:underline">Профиль</Link>
        {currentUser.isAdmin && <Link to="/admin" className="hover:underline">Админка</Link>}
        <div className="ml-auto text-sm opacity-90">
          {currentUser.name} ({currentUser.username})
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/profile"
            element={<Profile user={currentUser} onUpdate={setCurrentUser} />}
          />
          <Route
            path="/admin"
            element={currentUser.isAdmin ? <AdminPanel /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

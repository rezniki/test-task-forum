import React from "react";
import { Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostPage";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;



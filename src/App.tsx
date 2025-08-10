import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsPage from "./pages/PostPage";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


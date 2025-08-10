import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PostPage from "../pages/PostPage";
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
        { path: "/", element: <Home /> },
        { path: "/post/:id", element: <PostPage /> },
        { path: "/profile", element: <Profile /> },
        { path: "/admin", element: <Admin /> }
        ]
    }
]);

import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/" className="hover:underline">Главная</Link>
        <Link to="/profile" className="hover:underline">Профиль</Link>
        <Link to="/admin" className="hover:underline">Админка</Link>
        </nav>
    );
}

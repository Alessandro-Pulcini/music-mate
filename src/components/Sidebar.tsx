import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `block px-2 py-1 rounded hover:bg-gray-700 ${
      isActive ? "bg-gray-700 font-semibold" : ""
    }`;

  return (
    <aside className="bg-gray-800 text-white w-64 p-4 h-full">
      <nav className="space-y-2">
        <NavLink to="/" className={linkStyle}>
          🏠 Home
        </NavLink>
        <NavLink to="/spotify" className={linkStyle}>
          🎵 Spotify
        </NavLink>
        <NavLink to="/about" className={linkStyle}>
          ℹ️ About
        </NavLink>
      </nav>
    </aside>
  );
}

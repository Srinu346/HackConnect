import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10 shadow-md">
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Hackathon Connect 🚀
      </Link>

      <div className="flex gap-6 text-white text-sm font-medium">
        <Link to="/home" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/create-team" className="hover:text-pink-400 transition">Create Team</Link>
        <Link to="/teams" className="hover:text-pink-400 transition">Find Teams</Link>
        <Link to="/my-teams" className="hover:text-pink-400 transition">My Teams</Link>
        <Link to="/profile" className="hover:text-pink-400 transition">Profile</Link>
        <button onClick={handleLogout} className="hover:text-red-400 transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

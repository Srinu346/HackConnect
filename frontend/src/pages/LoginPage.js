import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/LoginPage.css"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        navigate("/home");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center font-sans px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-3xl w-full max-w-sm text-white animate-fade-in-up space-y-5"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Login
        </h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

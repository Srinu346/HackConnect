import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.text();

      if (res.ok) {
        setSuccess("Registration successful. You can now login.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-center px-4 font-sans">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 space-y-5 animate-fade-in-up"
      >
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Register
        </h2>

        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        {success && <p className="text-green-400 text-center text-sm">{success}</p>}

        <div>
          <label className="text-sm text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition shadow-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

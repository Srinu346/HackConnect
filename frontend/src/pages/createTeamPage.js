import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/createTeamPage.css";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";

const CreateTeamPage = () => {
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ name: "", stack: "" }]);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch("http://localhost:3001/api/teams/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ title, domain, description, members }),
      });

      const data = await res.text();

      if (res.ok) {
        alert(data.message || "Team created successfully!");
        navigate("/home");
      } else {
        alert(data.error || "Team creation failed.");
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: "", stack: "" }]);
  };

  const removeMember = (index) => {
    if (members.length === 1) return;
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
  };

  return (
    
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-start animate-fade-in-up">
        
        {/* Left */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug bg-gradient-to-tr from-purple-400 to-pink-500 text-transparent bg-clip-text">
            🚀 Launch Your Dream Team
          </h1>
          <p className="text-lg text-gray-300">
            Form a hackathon team and add members with their expertise.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
        </div>

        {/* Right */}
        <form
          onSubmit={handleCreate}
          className="bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl rounded-3xl p-10 space-y-6 hover:scale-[1.01] transition-transform"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Create Team</h2>

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Team Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input"
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Domain / Tech Stack</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
              className="input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="input resize-none"
            />
          </div>

          {/* Members */}
          <div>
            <label className="block text-sm text-purple-400 mb-2">Team Members</label>
            {members.map((member, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                  className="w-1/2 input"
                  required
                />
                <input
                  type="text"
                  placeholder="Tech Stack"
                  value={member.stack}
                  onChange={(e) => handleMemberChange(index, "stack", e.target.value)}
                  className="w-1/2 input"
                  required
                />
                <button
                  type="button"
                  className="text-red-400 font-bold hover:text-red-600"
                  onClick={() => removeMember(index)}
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-pink-400 hover:text-pink-600 font-semibold"
              onClick={addMember}
            >
              ➕ Add Member
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition shadow-lg"
          >
            Create Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;

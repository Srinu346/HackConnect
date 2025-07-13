import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyTeamsPage(){
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3001/api/teams/all-teams", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching teams:", err));
  }, [navigate]);

  const filteredTeams = teams.filter((team) =>
    team.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        🔍 Browse Hackathon Teams
      </h1>

      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search teams by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredTeams.map((team) => (
          <div
            key={team._id}
            className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-pink-400 mb-1">{team.title}</h2>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-semibold text-purple-400">Domain:</span> {team.domain}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-semibold text-purple-400">Creator:</span> {team.creatorName || team.creator}
            </p>
            <p className="text-sm text-gray-400 mb-4">{team.description}</p>

            {team.members && (
              <div className="mb-4">
                <p className="text-sm text-purple-300 font-semibold mb-1">Members:</p>
                <ul className="list-disc list-inside text-sm text-gray-200">
                  {team.members.map((m, idx) => (
                    <li key={idx}>{m.name || m}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => alert("Request to Join feature coming soon!")}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 rounded-xl hover:scale-105 transition"
            >
              Request to Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeamsPage;

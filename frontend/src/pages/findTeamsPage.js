import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/findTeamsPage.css"


const FindTeamsPage = () => {
  const [teams, setTeams] = useState([]);
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
    .then((data) => {
      console.log("Teams fetched:", data);
      setTeams(data);
    })
    .catch((err) => console.error("Error fetching teams:", err));
}, [navigate]);


  async function creator (team){
    const creatorId = team.creator;
    
  }


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-12 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fade-in-down">
        🔍 Discover Hackathon Teams
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {teams.map((team) => (
          <div
            key={team._id}
            className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up"
          >
            <h2 className="text-2xl font-bold text-pink-400 mb-2">{team.title}</h2>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-semibold text-purple-400">Domain:</span> {team.domain}
            </p>
            <p className="text-sm text-gray-200 mb-6 line-clamp-3">{team.description}</p>
            <p className="text-sm text-gray-200 mb-6 line-clamp-3">{team.creator}</p>

            <button
              className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition shadow"
              onClick={() => alert("Request to Join feature coming soon!")}
            >
              Request to Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTeamsPage;

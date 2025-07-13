import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TeamDetailsPage = () => {
  const paramId = useParams().id;
  const navigate = useNavigate();

  const [teamId, setTeamId] = useState(paramId || "");
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState("");

  const fetchTeam = async (idToFetch) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/teams/get-team/${paramId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const data = await res.json();
      setTeam(data.data);
      setMessage("");
    } catch (err) {
      console.error("Error fetching team:", err);
      setTeam(null);
      setMessage("Failed to load team. Check the ID.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramId) {
      fetchTeam(paramId);
    }
  }, [paramId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleJoinRequest = async () => {
    setIsRequesting(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await fetch(`http://localhost:3001/api/teams/${teamId}/join`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setMessage(result.message || "Request sent!");
    } catch (err) {
      setMessage("Failed to send request.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="text-2xl font-bold text-pink-500">HackMate</div>
        <div className="space-x-6">
          <button onClick={() => navigate("/home")} className="hover:text-pink-400">Home</button>
          <button onClick={() => navigate("/my-teams")} className="hover:text-pink-400">My Teams</button>
          <button onClick={() => navigate("/profile")} className="hover:text-pink-400">Profile</button>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Logout</button>
        </div>
      </nav>

      {/* Search Box */}
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTeam(teamId);
          }}
          className="flex gap-4 items-center"
        >
          <input
            type="text"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="Enter Team ID"
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-lg"
          >
            Fetch Team
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
      </div>

      {/* Team Content */}
      {loading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : team ? (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-extrabold mb-4 text-pink-400">{team.title}</h1>
          <p className="mb-1"><span className="text-purple-400 font-semibold">Domain:</span> {team.domain}</p>
          <p className="mb-1 text-white/80"><span className="font-semibold">Description:</span> {team.description}</p>
          <p className="mb-6"><span className="font-semibold text-yellow-400">Status:</span> {team.status === 'open' ? '🟢 Open' : '🔴 Closed'}</p>

          {/* Tech Stack */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-green-400">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {team.techStack?.map((tech, idx) => (
                <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Required Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-yellow-400">Required Skills:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {team.requiredSkills?.map((skill, idx) => (
                <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm border border-white/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Request to Join */}
          {team.status === "open" && (
            <div className="mb-10">
              <button
                onClick={handleJoinRequest}
                disabled={isRequesting}
                className="bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-lg shadow-md transition"
              >
                {isRequesting ? "Requesting..." : "Request to Join"}
              </button>
            </div>
          )}

          {/* Creator */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-400 mb-2">Team Leader</h2>
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl">
              <p><span className="font-semibold text-pink-300">Name:</span> {team.creator?.name || "N/A"}</p>
              <p><span className="font-semibold text-purple-300">College:</span> {team.creator?.college || "N/A"}</p>
            </div>
          </div>

          {/* Members */}
          <div>
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Team Members</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {team.members?.map((member, idx) => (
                <div key={idx} className="bg-white/10 border border-white/20 p-4 rounded-xl">
                  <p><span className="font-semibold text-pink-300">Name:</span> {member.user?.name}</p>
                  <p><span className="font-semibold text-purple-300">College:</span> {member.user?.college}</p>
                  <p><span className="font-semibold text-yellow-300">Role:</span> {member.role || "Not Assigned"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TeamDetailsPage;

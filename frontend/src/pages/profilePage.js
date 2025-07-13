import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:3001/api/user/profile", {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    const res = await fetch("http://localhost:3001/api/user/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(user),
    });

    const updated = await res.json();
    setUser(updated);
    setEditable(false);
  };

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black text-white flex items-center justify-center text-xl font-bold animate-pulse">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-12 font-sans flex justify-center">
      <div className="w-full max-w-xl bg-white/10 border border-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl animate-fade-in-up space-y-6">
        <h2 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          👤 Profile
        </h2>

        {["firstName", "lastName", "username", "college", "branch", "field"].map((field) => (
          <div key={field}>
            <label className="block text-sm mb-1 capitalize">{field}</label>
            <input
              name={field}
              value={user[field] || ""}
              onChange={handleChange}
              readOnly={!editable}
              className={`w-full px-4 py-2 rounded-md transition ${
                editable ? "bg-white text-black" : "bg-white/10 text-white"
              }`}
            />
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-8">
          {!editable ? (
            <button
              onClick={() => setEditable(true)}
              className="bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-400 to-teal-500 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditable(false)}
                className="bg-gradient-to-r from-gray-500 to-gray-700 px-6 py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

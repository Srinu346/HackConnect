# 🚀 Hackathon Teammate Finder

A futuristic web app to help developers and innovators connect and build hackathon teams with ease.

---

## 🌐 Live Demo

> Coming soon...

---


## 🛠️ Tech Stack

### 🧩 Frontend

* React.js
* Tailwind CSS
* React Router DOM

### 🧠 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## ✨ Features

* 🔐 User authentication with JWT
* 🧑‍💼 Create a team with title, domain, description, and members
* 🔍 Browse and search existing teams
* 🙋‍♂️ Request to join teams (coming soon)
* 👤 Profile management 
* 🌌 Futuristic UI with glassmorphism, gradients, and animated effects

---

## 📁 Folder Structure

```
Project/
│
├── backend/                  # Express + MongoDB Backend
│   ├── routes/              # Route files (teams.js, auth.js)
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # JWT middleware
│   ├── db.js                # Database connection
│   └── server.js            # Entry point
│
├── frontend/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/      # Navbar, Header, Footer, etc.
│       ├── pages/           # CreateTeamPage, RegisterPage, HomePage, etc.
│       ├── stylesheets/     # Tailwind + custom styles
│       └── App.js
│
└── .env                     # Environment variables
```

---

## 🚀 Setup Instructions

### 🔧 Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `backend/` with:

   ```
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

> Server runs at: `http://localhost:3001`

---

### 💻 Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

> Frontend runs at: `http://localhost:3000`

---

## 🚧 Future Improvements

* ✅ Team creation with members
* 🔜 Request to join functionality
* 🔔 Toast notifications
* 👥 Team member role management
* 📱 Mobile responsive layout
* 🛍️ Organizer dashboard (optional)

---

## 🤝 Contributing

We welcome contributions!
If you'd like to suggest a feature, improve UI, or fix bugs, feel free to fork and submit a pull request.

---

## 📜 License

MIT © 2025 Akella Srinivas

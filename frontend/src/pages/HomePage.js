import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import "../stylesheets/FuturisticHome.css";

const HomePage = () => {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
  }

  return (
    <div className="futuristic-homepage">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">🚀 Welcome to Hackathon Connect</h1>
        <p className="hero-subtitle">
          Uniting innovators. Build. Collaborate. Win.
        </p>
        <div className="cta-buttons">
          <button
            className="neon-button"
            onClick={() => navigate("/create-team")}
          >
            Create Team
          </button>
          <button
            className="neon-button"
            onClick={() => navigate("/teams")}
          >
            Find a Team
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="feature-card glass hover-effect">
          <div className="icon-circle">
            🚧
          </div>
          <h3>Create a Team</h3>
          <p>Lead innovative projects by forming a custom team tailored to your vision.</p>
        </div>
        <div className="feature-card glass hover-effect">
          <div className="icon-circle">
            🔍
          </div>
          <h3>Find a Team</h3>
          <p>Browse available teams and join one aligned with your skills and passion.</p>
        </div>
        <div className="feature-card glass hover-effect">
          <div className="icon-circle">
            👤
          </div>
          <h3>Profile Management</h3>
          <p>Customize your developer profile and highlight your interests and achievements.</p>
        </div>
        <div className="feature-card glass hover-effect">
          <div className="icon-circle">
            🌐
          </div>
          <h3>Team Showcase</h3>
          <p>Display your team’s strengths and stay connected with your members easily.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

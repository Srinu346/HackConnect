import "../stylesheets/LandingPage.css"; // for custom clip-path
import { styles } from "../stylesheets/LandingPage";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h1 className="text-2xl font-bold tracking-wide text-white">Hackathon Connect</h1>
        <div className="space-x-4">
          <button className={styles.navLink} ><Link to="./login" >Login</Link></button>
          <button className={styles.navLink}><Link to="./register">Register</Link></button>
        </div>
      </nav>

      {/* Diagonal Background Sections */}
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className={`${styles.diagonalLeft} ${styles.panelBase}`}>
          <div className="z-10 text-white text-center p-10 animate-fade-in-down">
            <h2 className="text-4xl font-bold mb-4">Find a Team</h2>
            <p className="text-lg">Browse open teams and connect instantly.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className={`${styles.diagonalRight} ${styles.panelBase}`}>
          <div className="z-10 text-white text-center p-10 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">Find a Teammate</h2>
            <p className="text-lg">Already have a team? Start building now.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

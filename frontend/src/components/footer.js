import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-16 py-6 px-4 text-center text-sm text-gray-400 border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <p>
        © {new Date().getFullYear()} Hackathon Connect. Built with ❤️ by Akella Srinivas.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/Srinu346"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;

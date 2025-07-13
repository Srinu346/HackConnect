import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <header className="text-center my-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 animate-fade-in-down">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-300 mt-2 text-md sm:text-lg animate-fade-in-up">{subtitle}</p>
      )}
    </header>
  );
};

export default Header;

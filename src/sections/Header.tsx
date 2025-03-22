"use client";

import React from "react";

interface HeaderProps {
  scrollToSection: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  scrollToSection,
  activeSection,
}) => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {["home", "projects", "about", "testimonials"].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`nav-item ${
              activeSection === section
                ? "bg-white text-gray-900"
                : "hover:bg-white/70 hover:text-gray-900"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
};

"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <span>
          Final-Year MCA Student · Open to Software Developer roles
        </span>

        <div className="topbar-right">
          <span>✉️ amittghoyal@gmail.com</span>
          <span>📞 9510360227</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar" id="navbar">
        <a href="#home" className="nav-logo">
          Amit<span>.dev</span>
        </a>

        <ul className="nav-menu">
          <li><a href="#home" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#achievements">Achievements</a></li>
          <li><a href="#awards">Awards</a></li>
          <li><a href="#memories">Memories</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <a
            href="/resume.pdf"
            className="btn btn-outline btn-sm"
            download
          >
            📄 Résumé
          </a>

          <a href="#contact" className="btn btn-teal btn-sm">
            Hire Me
          </a>
        </div>

        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-nav-close"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>

        <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="#education" onClick={() => setMobileOpen(false)}>Education</a>
        <a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a>
        <a href="#achievements" onClick={() => setMobileOpen(false)}>Achievements</a>
        <a href="#awards" onClick={() => setMobileOpen(false)}>Awards</a>
        <a href="#memories" onClick={() => setMobileOpen(false)}>Memories</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </div>
    </>
  );
}
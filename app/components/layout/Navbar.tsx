"use client";

import { useState, useEffect } from "react";

/* ─── SVG ICONS ─── */
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2.84l3-.02a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.98 17z"/>
  </svg>
);

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const NAV_LINKS = [
  { href: "#home",         label: "Home"         },
  { href: "#about",        label: "About"        },
  { href: "#education",    label: "Education"    },
  { href: "#projects",     label: "Projects"     },
  { href: "#milestones",   label: "Milestones"   },
  { href: "#memories",     label: "Memories"     },
  { href: "#contact",      label: "Contact"      },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [active, setActive]         = useState("#home");

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActive(href);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        /* ── TOPBAR ── */
        .nb-topbar {
          background: var(--ink);
          color: rgba(255,255,255,0.55);
          font-size: 0.74rem;
          font-weight: 600;
          padding: 0.42rem 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .nb-topbar-left {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .nb-topbar-left::before {
          content: '';
          display: block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--teal-light);
          box-shadow: 0 0 0 3px rgba(18,169,126,0.2);
          flex-shrink: 0;
        }
        .nb-topbar-right {
          display: flex;
          gap: 1.4rem;
        }
        .nb-topbar-item {
          display: flex;
          align-items: center;
          gap: 0.38rem;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nb-topbar-item:hover { color: var(--white); }
        .nb-topbar-item svg  { color: var(--teal-light); flex-shrink: 0; }

        /* ── NAVBAR ── */
        .nb-nav {
          position: sticky;
          top: 0;
          z-index: 200;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 0 5vw;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: box-shadow 0.3s;
        }
        .nb-nav.nb-scrolled {
          box-shadow: var(--shadow-sm);
        }

        /* Logo */
        .nb-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--teal);
          letter-spacing: -0.04em;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.05rem;
          flex-shrink: 0;
        }
        .nb-logo span { color: var(--ink); }

        /* Desktop links */
        .nb-menu {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nb-menu a {
          padding: 0.42rem 0.82rem;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--ink-mid);
          border-radius: var(--pill-radius);
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
          position: relative;
          display: block;
        }
        .nb-menu a:hover          { background: var(--teal-pale); color: var(--teal); }
        .nb-menu a.nb-active      { color: var(--teal); }
        .nb-menu a.nb-active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 2px;
          background: var(--teal);
          border-radius: 2px;
        }

        /* Actions */
        .nb-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
        }
        /* Ensure resume btn icon aligns */
        .nb-actions .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Hamburger */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.18s;
        }
        .nb-hamburger:hover { background: var(--teal-pale); }
        .nb-hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: var(--ink);
          border-radius: 2px;
          transition: all 0.3s;
        }

        /* ── MOBILE OVERLAY ── */
        .nb-mobile {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          transform: translateX(100%);
          transition: transform 0.4s var(--ease);
        }
        .nb-mobile.nb-open {
          transform: translateX(0);
        }

        .nb-mobile-close {
          position: absolute;
          top: 1.4rem; right: 1.5rem;
          width: 40px; height: 40px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: background 0.2s, border-color 0.2s;
        }
        .nb-mobile-close:hover {
          background: var(--teal-pale);
          border-color: var(--teal-mid);
          color: var(--teal);
        }

        .nb-mobile-logo {
          position: absolute;
          top: 1.5rem; left: 5vw;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--teal);
          letter-spacing: -0.03em;
          text-decoration: none;
        }
        .nb-mobile-logo span { color: var(--ink); }

        .nb-mobile a {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ink);
          text-decoration: none;
          padding: 0.6rem 2rem;
          border-radius: var(--pill-radius);
          transition: background 0.18s, color 0.18s;
        }
        .nb-mobile a:hover,
        .nb-mobile a.nb-active {
          background: var(--teal-pale);
          color: var(--teal);
        }

        .nb-mobile-footer {
          position: absolute;
          bottom: 2rem;
          display: flex;
          gap: 0.7rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .nb-menu    { display: none; }
          .nb-actions { display: none; }
          .nb-hamburger { display: flex; }
        }
        @media (max-width: 600px) {
          .nb-topbar  { display: none; }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="nb-topbar">
        <div className="nb-topbar-left">
          Final-Year MCA Student · Open to Software Developer roles
        </div>
        <div className="nb-topbar-right">
          <a href="mailto:amittghoyal@gmail.com" className="nb-topbar-item">
            <IconMail />
            amittghoyal@gmail.com
          </a>
          <a href="tel:9510360227" className="nb-topbar-item">
            <IconPhone />
            9510360227
          </a>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nb-nav${scrolled ? " nb-scrolled" : ""}`} id="navbar">

        <a href="#home" className="nb-logo" onClick={() => handleNavClick("#home")}>
          Amit<span>.dev</span>
        </a>

        <ul className="nb-menu">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={active === href ? "nb-active" : ""}
                onClick={() => handleNavClick(href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nb-actions">
          <a href="/resume.pdf" className="btn btn-outline btn-sm" download>
            <IconDownload />
            Résumé
          </a>
          <a href="#contact" className="btn btn-teal btn-sm" onClick={() => handleNavClick("#contact")}>
            Hire Me
          </a>
        </div>

        <button
          className="nb-hamburger"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nb-mobile${mobileOpen ? " nb-open" : ""}`} aria-hidden={!mobileOpen}>

        <a href="#home" className="nb-mobile-logo" onClick={() => handleNavClick("#home")}>
          Amit<span>.dev</span>
        </a>

        <button
          className="nb-mobile-close"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        >
          <IconClose />
        </button>

        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={active === href ? "nb-active" : ""}
            onClick={() => handleNavClick(href)}
          >
            {label}
          </a>
        ))}

        <div className="nb-mobile-footer">
          <a href="/resume.pdf" className="btn btn-outline btn-sm" download>
            <IconDownload />
            Résumé
          </a>
          <a href="#contact" className="btn btn-teal btn-sm" onClick={() => handleNavClick("#contact")}>
            Hire Me
          </a>
        </div>

      </div>
    </>
  );
}
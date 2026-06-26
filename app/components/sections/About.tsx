"use client";
import { useEffect, useRef } from "react";

/* ─── DATA ─── */
const highlights = [
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
      </svg>
    ),
    title: "MCA Final Year",
    subtitle: "GLS University",
    color: "teal",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "CGPA 9.25 / 10",
    subtitle: "Academic Excellence",
    color: "gold",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Full-Stack Dev",
    subtitle: "Python · PHP · Django",
    color: "indigo",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
    title: "5+ Awards",
    subtitle: "Leadership & Competitions",
    color: "rose",
  },
];

const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "PHP", "Java", "C / C++", "JavaScript"],
  },
  {
    label: "Frameworks & Databases",
    skills: ["Django", "Bootstrap", "MySQL", "MongoDB", "REST APIs"],
  },
  {
    label: "Tools & Cloud",
    skills: ["Git", "GitHub", "Linux", "AWS", "Power BI", "Scikit-Learn"],
  },
];

const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "amittghoyal@gmail.com",
    href: "mailto:amittghoyal@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: "LinkedIn",
    value: "amit-ghoyal-136858393",
    href: "https://linkedin.com/in/amit-ghoyal-136858393",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    label: "GitHub",
    value: "github.com/amitghoyal",
    href: "https://github.com/amitghoyal",
  },
];

const socials = [
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/amit-ghoyal-136858393",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    title: "GitHub",
    href: "https://github.com/amitghoyal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    title: "Email",
    href: "mailto:amittghoyal@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    title: "Download Résumé",
    href: "/resume.pdf",
    download: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
];

export default function About() {
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = photoRef.current;
    if (!img) return;
    const show = () => { img.style.opacity = "1"; };
    if (img.complete && img.naturalWidth > 0) show();
    else img.onload = show;
  }, []);

  return (
    <section className="section section-alt" id="about">
      <style>{`
        /* ══════════════════════════════════════
           ABOUT V3
        ══════════════════════════════════════ */

        .about-v3 {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 2rem;
          align-items: start;
        }

        /* ── PROFILE CARD ── */
        .pcard {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          margin-bottom: 1.1rem;
        }

        /* Top photo banner — full-width portrait area */
        .pcard-banner {
          width: 100%;
          height: 220px;
          position: relative;
          background: linear-gradient(160deg, var(--teal-mid) 0%, #A8E6CF 100%);
          overflow: hidden;
        }
        /* Watermark letter when no photo */
        .pcard-banner-letter {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7rem;
          font-weight: 700;
          color: var(--teal);
          opacity: 0.15;
          user-select: none;
        }
        .pcard-banner img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        /* Subtle bottom fade on the banner */
        .pcard-banner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(transparent, var(--white));
          pointer-events: none;
        }

        /* Avatar ring overlapping banner/body seam */
        .pcard-avatar-ring {
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 3px solid var(--white);
          box-shadow: 0 0 0 3px var(--teal-mid);
          overflow: hidden;
          background: linear-gradient(135deg, var(--teal-mid), var(--teal));
          display: flex; align-items: center; justify-content: center;
          margin: -40px auto 0;
          position: relative;
          z-index: 2;
          font-size: 1.8rem;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
        }

        .pcard-body {
          padding: 0.6rem 1.8rem 1.6rem;
          text-align: center;
        }

        .pcard-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.2rem;
          margin-top: 0.6rem;
        }
        .pcard-role {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--teal);
          letter-spacing: 0.03em;
          margin-bottom: 0.15rem;
        }
        .pcard-uni {
          font-size: 0.75rem;
          color: var(--ink-muted);
          font-weight: 500;
          margin-bottom: 1rem;
        }

        /* status badges */
        .pcard-meta {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.3rem;
        }
        .pcard-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.32rem;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.26rem 0.65rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--ink-mid);
        }
        .pcard-badge svg { width: 11px; height: 11px; flex-shrink: 0; }
        .pcard-badge.open {
          background: #E8F8F2;
          border-color: var(--teal-mid);
          color: var(--teal);
        }
        .pcard-badge.open .open-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--teal);
          flex-shrink: 0;
          animation: pulseRing 2s ease-in-out infinite;
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(10,123,92,0.4); }
          50%      { box-shadow: 0 0 0 4px rgba(10,123,92,0); }
        }

        /* contact rows */
        .pcard-contacts {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.3rem;
          text-align: left;
        }
        .pcard-contact-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.55rem 0.75rem;
          border-radius: 10px;
          background: var(--bg);
          border: 1px solid var(--border);
          transition: all 0.22s;
          text-decoration: none;
          color: var(--ink);
        }
        .pcard-contact-row:hover {
          border-color: var(--teal-mid);
          background: var(--teal-pale);
          color: var(--teal);
          transform: translateX(3px);
        }
        .pcard-contact-icon {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: var(--white);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.22s;
        }
        .pcard-contact-icon svg {
          width: 14px; height: 14px;
          stroke: var(--teal);
          fill: none;
        }
        .pcard-contact-row:hover .pcard-contact-icon {
          background: var(--teal);
          border-color: var(--teal);
        }
        .pcard-contact-row:hover .pcard-contact-icon svg { stroke: #fff; }
        .pcard-contact-label {
          font-size: 0.63rem;
          font-weight: 700;
          color: var(--ink-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 0.12rem;
        }
        .pcard-contact-val {
          font-size: 0.75rem;
          font-weight: 700;
          color: inherit;
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 210px;
        }

        .pcard-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0 0 1.1rem;
        }

        /* social icon row */
        .pcard-socials {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }
        .soc-v2 {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s;
          text-decoration: none;
        }
        .soc-v2 svg {
          width: 16px; height: 16px;
          stroke: var(--ink-muted);
          fill: none;
          transition: stroke 0.25s;
        }
        .soc-v2:hover {
          background: var(--teal);
          border-color: var(--teal);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10,123,92,0.25);
        }
        .soc-v2:hover svg { stroke: #fff; }

        /* ── HIGHLIGHT GRID ── */
        .hl-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .hl-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1rem 0.9rem;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          box-shadow: var(--shadow-xs);
          transition: all 0.3s var(--ease);
          position: relative;
          overflow: hidden;
        }
        .hl-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s var(--ease);
        }
        .hl-card.teal::before  { background: linear-gradient(90deg, var(--teal), var(--teal-light)); }
        .hl-card.gold::before  { background: linear-gradient(90deg, #F5A623, #FBCF6B); }
        .hl-card.indigo::before{ background: linear-gradient(90deg, #4F46E5, #818CF8); }
        .hl-card.rose::before  { background: linear-gradient(90deg, #E11D48, #FB7185); }
        .hl-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: transparent; }
        .hl-card:hover::before { transform: scaleX(1); }

        .hl-ico {
          width: 38px; height: 38px;
          border-radius: 10px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hl-ico svg { width: 18px; height: 18px; }
        .hl-ico.teal   { background: var(--teal-pale);  color: var(--teal); }
        .hl-ico.gold   { background: #FFF5E0; color: #D4860A; }
        .hl-ico.indigo { background: #EEF2FF; color: #4F46E5; }
        .hl-ico.rose   { background: #FFF1F2; color: #E11D48; }

        .hl-title { font-size: 0.82rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .hl-sub   { font-size: 0.7rem;  font-weight: 600; color: var(--ink-muted); margin-top: 0.12rem; }

        /* ── RIGHT PANEL ── */
        .about-right { display: flex; flex-direction: column; gap: 1.2rem; }

        /* ── BIO CARD ── */
        .about-bio {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem 2.2rem;
          box-shadow: var(--shadow-xs);
          position: relative;
          overflow: hidden;
        }
        /* Decorative teal circle in corner */
        .about-bio::after {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 130px; height: 130px;
          border-radius: 50%;
          background: var(--teal-pale);
          pointer-events: none;
        }
        .about-bio-heading {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;
        }
        .about-bio-heading svg {
          width: 18px; height: 18px;
          stroke: var(--teal);
          fill: none;
          flex-shrink: 0;
        }
        .about-bio p {
          color: var(--ink-mid);
          font-weight: 500;
          line-height: 1.9;
          margin-bottom: 0.9rem;
          font-size: 0.91rem;
          position: relative;
          z-index: 1;
        }
        .about-bio p:last-child { margin-bottom: 0; }

        /* pull-quote highlight inside bio */
        .about-quote {
          margin: 1.2rem 0;
          padding: 1rem 1.2rem;
          background: var(--teal-pale);
          border-left: 3px solid var(--teal);
          border-radius: 0 10px 10px 0;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--teal);
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        /* CTA inside bio */
        .about-bio-cta {
          display: flex;
          gap: 0.7rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        /* ── SKILLS CARD ── */
        .skills-panel {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem 2.2rem;
          box-shadow: var(--shadow-xs);
        }
        .skills-panel-heading {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .skills-panel-heading svg {
          width: 18px; height: 18px;
          stroke: var(--teal);
          fill: none;
          flex-shrink: 0;
        }

        .skill-group { margin-bottom: 1.3rem; }
        .skill-group:last-child { margin-bottom: 0; }
        .skill-group-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .skill-group-label::before {
          content: '';
          display: block;
          width: 10px; height: 1.5px;
          background: var(--teal);
        }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .skill-pill-v2 {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.32rem 0.82rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--ink-mid);
          transition: all 0.2s;
          cursor: default;
        }
        .skill-pill-v2:hover {
          background: var(--teal-pale);
          border-color: var(--teal-mid);
          color: var(--teal);
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .about-v3 { grid-template-columns: 1fr; }
          .about-left { max-width: 420px; margin: 0 auto; width: 100%; }
          .pcard-banner { height: 200px; }
        }
        @media (max-width: 600px) {
          .hl-grid { grid-template-columns: 1fr; }
          .about-bio, .skills-panel { padding: 1.5rem 1.3rem; }
          .pcard-contact-val { max-width: 160px; }
        }
      `}</style>

      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Who I Am</p>
          <h2 className="sec-h2">About Me</h2>
          <p className="sec-lead">
            A passionate MCA student building software solutions and preparing
            for a career in technology.
          </p>
        </div>

        <div className="about-v3">

          {/* ══ LEFT COLUMN ══ */}
          <div className="about-left">

            {/* ── Profile Card ── */}
            <div className="pcard">

              {/* Full-width photo banner */}
              <div className="pcard-banner">
                <span className="pcard-banner-letter">A</span>
                <img ref={photoRef} src="/profile.png" alt="Amit Ghoyal" />
              </div>

              {/* Small avatar ring at seam */}
              <div className="pcard-avatar-ring">A</div>

              <div className="pcard-body">
                <div className="pcard-name">Amit Ghoyal</div>
                <div className="pcard-role">MCA Final Year Student</div>
                <div className="pcard-uni">GLS University, Ahmedabad</div>

                {/* Status badges */}
                <div className="pcard-meta">
                  <span className="pcard-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Ahmedabad, India
                  </span>
                  <span className="pcard-badge open">
                    <span className="open-dot" />
                    Open to Work
                  </span>
                </div>

                {/* Contact rows */}
                <div className="pcard-contacts">
                  {contactItems.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="pcard-contact-row"
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <div className="pcard-contact-icon">{c.icon}</div>
                      <div>
                        <div className="pcard-contact-label">{c.label}</div>
                        <div className="pcard-contact-val">{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <hr className="pcard-divider" />

                {/* Social icon row */}
                <div className="pcard-socials">
                  {socials.map((s) => (
                    <a
                      key={s.title}
                      href={s.href}
                      className="soc-v2"
                      title={s.title}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      {...(s.download ? { download: true } : {})}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Highlight Grid ── */}
            <div className="hl-grid">
              {highlights.map((h, i) => (
                <div className={`hl-card ${h.color}`} key={i}>
                  <div className={`hl-ico ${h.color}`}>{h.svg}</div>
                  <div>
                    <div className="hl-title">{h.title}</div>
                    <div className="hl-sub">{h.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="about-right">

            {/* Bio */}
            <div className="about-bio">
              <div className="about-bio-heading">
                <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                My Story
              </div>

              <p>
                I'm <strong>Amit Ghoyal</strong>, a final-year MCA student at GLS University,
                Ahmedabad, with a strong foundation in programming, database
                management, and machine learning. My academic journey has been
                defined by curiosity and a relentless drive to turn ideas into
                working, impactful software.
              </p>

              <div className="about-quote">
                "I don't just write code — I design systems that solve real problems
                and deliver measurable value."
              </div>

              <p>
                My experience spans full-stack web development, backend engineering,
                relational database design, and applied machine learning. I enjoy
                building software that solves real-world problems — from clean REST
                APIs to data-driven dashboards — and I care deeply about both
                performance and user experience.
              </p>

              <p>
                Currently seeking Software Developer opportunities where I can
                contribute meaningfully from day one, learn from experienced engineers,
                and help build scalable, impactful products.
              </p>

              <div className="about-bio-cta">
                <a href="#projects" className="btn btn-teal btn-md">
                  View Projects
                </a>
                <a href="/resume.pdf" className="btn btn-outline btn-md" download>
                  Download Résumé
                </a>
              </div>
            </div>

            {/* Skills */}
            <div className="skills-panel">
              <div className="skills-panel-heading">
                <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
                Technical Skills
              </div>

              {skillGroups.map((group) => (
                <div className="skill-group" key={group.label}>
                  <div className="skill-group-label">{group.label}</div>
                  <div className="skill-pills">
                    {group.skills.map((s) => (
                      <span className="skill-pill-v2" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
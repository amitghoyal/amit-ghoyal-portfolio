"use client";
import { useEffect, useRef } from "react";

const highlights = [
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
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
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Full-Stack Dev",
    subtitle: "Python · PHP · Django",
    color: "indigo",
  },
  {
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
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
    label: "Frameworks & DBs",
    skills: ["Django", "Bootstrap", "MySQL", "MongoDB", "REST APIs"],
  },
  {
    label: "Tools & Cloud",
    skills: ["Git", "GitHub", "Linux", "AWS", "Power BI", "Scikit-Learn"],
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
        /* ── ABOUT LAYOUT ── */
        .about-v2 {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2.4rem;
          align-items: start;
        }

        /* ── PROFILE CARD ── */
        .pcard {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem 1.8rem 1.8rem;
          text-align: center;
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
          margin-bottom: 1.2rem;
        }
        /* teal bar at top */
        .pcard::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--teal), var(--teal-light));
          border-radius: 22px 22px 0 0;
        }

        .pcard-avatar {
          width: 110px; height: 110px;
          border-radius: 50%;
          margin: 0.5rem auto 1.2rem;
          position: relative;
          background: linear-gradient(135deg, var(--teal-mid), #A8E6CF);
          box-shadow: 0 0 0 4px var(--teal-pale), 0 0 0 7px var(--teal-mid);
          overflow: hidden;
        }
        .pcard-avatar-letter {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.8rem; font-weight: 700; color: var(--teal);
          opacity: 0.3; user-select: none;
        }
        .pcard-avatar img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          opacity: 0;
          transition: opacity .5s ease;
          background: transparent;
        }

        .pcard-name {
          font-size: 1.15rem; font-weight: 700; color: var(--ink);
          margin-bottom: 0.25rem;
        }
        .pcard-role {
          font-size: 0.82rem; font-weight: 700; color: var(--teal);
          margin-bottom: 0.15rem;
        }
        .pcard-uni {
          font-size: 0.78rem; color: var(--ink-muted); font-weight: 500;
          margin-bottom: 1.3rem;
        }

        /* location + status row */
        .pcard-meta {
          display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap;
          margin-bottom: 1.2rem;
        }
        .pcard-badge {
          display: inline-flex; align-items: center; gap: 0.35rem;
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.28rem 0.7rem;
          font-size: 0.7rem; font-weight: 700; color: var(--ink-mid);
        }
        .pcard-badge svg { width: 12px; height: 12px; stroke: var(--teal); flex-shrink: 0; }
        .pcard-badge.open { background: #E6F9F2; border-color: var(--teal-mid); color: var(--teal); }
        .pcard-badge.open .open-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--teal);
          animation: pulseRing 2s ease-in-out infinite;
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 0 rgba(10,123,92,0.3); }
          50%      { box-shadow: 0 0 0 4px rgba(10,123,92,0.08); }
        }

        .pcard-divider { border: none; border-top: 1px solid var(--border); margin: 0 0 1.2rem; }

        /* social links */
        .pcard-socials { display: flex; gap: 0.55rem; justify-content: center; }
        .soc-v2 {
          width: 36px; height: 36px; border-radius: 10px;
          background: var(--bg); border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          transition: all .25s; cursor: pointer;
        }
        .soc-v2 svg { width: 16px; height: 16px; stroke: var(--ink-muted); fill: none; transition: stroke .25s; }
        .soc-v2:hover { background: var(--teal); border-color: var(--teal); }
        .soc-v2:hover svg { stroke: #fff; }

        /* ── HIGHLIGHT GRID ── */
        .hl-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
        }
        .hl-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.1rem 1rem;
          display: flex; gap: 0.8rem; align-items: flex-start;
          box-shadow: var(--shadow-xs);
          transition: all .3s var(--ease);
        }
        .hl-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--teal-mid); }

        .hl-ico {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .hl-ico svg { width: 18px; height: 18px; }
        .hl-ico.teal  { background: var(--teal-pale);  color: var(--teal); }
        .hl-ico.gold  { background: #FFF5E0; color: #D4860A; }
        .hl-ico.indigo{ background: #EEF2FF; color: #4F46E5; }
        .hl-ico.rose  { background: #FFF1F2; color: #E11D48; }

        .hl-text {}
        .hl-title { font-size: 0.83rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .hl-sub   { font-size: 0.72rem; font-weight: 600; color: var(--ink-muted); margin-top: 0.15rem; }

        /* ── RIGHT CONTENT PANEL ── */
        .about-right { display: flex; flex-direction: column; gap: 1.2rem; }

        .about-bio {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem 2.2rem;
          box-shadow: var(--shadow-xs);
        }
        .about-bio-heading {
          font-size: 1rem; font-weight: 700; color: var(--ink);
          margin-bottom: 1.1rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .about-bio-heading svg {
          width: 18px; height: 18px; stroke: var(--teal); fill: none;
          flex-shrink: 0;
        }
        .about-bio p {
          color: var(--ink-mid);
          font-weight: 500;
          line-height: 1.85;
          margin-bottom: 0.9rem;
          font-size: 0.92rem;
        }
        .about-bio p:last-child { margin-bottom: 0; }

        /* ── SKILLS PANEL ── */
        .skills-panel {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 2rem 2.2rem;
          box-shadow: var(--shadow-xs);
        }
        .skills-panel-heading {
          font-size: 1rem; font-weight: 700; color: var(--ink);
          margin-bottom: 1.4rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .skills-panel-heading svg {
          width: 18px; height: 18px; stroke: var(--teal); fill: none;
          flex-shrink: 0;
        }

        .skill-group { margin-bottom: 1.2rem; }
        .skill-group:last-child { margin-bottom: 0; }
        .skill-group-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--ink-muted);
          margin-bottom: 0.55rem;
        }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .skill-pill-v2 {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.3rem 0.8rem;
          font-size: 0.76rem; font-weight: 700; color: var(--ink-mid);
          transition: all .22s;
          cursor: default;
        }
        .skill-pill-v2:hover {
          background: var(--teal-pale);
          border-color: var(--teal-mid);
          color: var(--teal);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .about-v2 { grid-template-columns: 1fr; }
          .about-left { max-width: 420px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 600px) {
          .hl-grid { grid-template-columns: 1fr; }
          .about-bio, .skills-panel { padding: 1.5rem; }
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

        <div className="about-v2">

          {/* ── LEFT ── */}
          <div className="about-left">

            {/* Profile Card */}
            <div className="pcard">
              <div className="pcard-avatar">
                <span className="pcard-avatar-letter">A</span>
                <img ref={photoRef} src="/profile.jpeg" alt="Amit Ghoyal" />
              </div>

              <div className="pcard-name">Amit Ghoyal</div>
              <div className="pcard-role">MCA Final Year Student</div>
              <div className="pcard-uni">GLS University, Ahmedabad</div>

              <div className="pcard-meta">
                <span className="pcard-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Ahmedabad, India
                </span>
                <span className="pcard-badge open">
                  <span className="open-dot" />
                  Open to Work
                </span>
              </div>

              <hr className="pcard-divider" />

              <div className="pcard-socials">
                {/* LinkedIn */}
                <a href="#" className="soc-v2" title="LinkedIn">
                  <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a href="#" className="soc-v2" title="GitHub">
                  <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>
                {/* Email */}
                <a href="mailto:amit@example.com" className="soc-v2" title="Email">
                  <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
                {/* Resume */}
                <a href="/resume.pdf" download className="soc-v2" title="Download Résumé">
                  <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Highlight Grid */}
            <div className="hl-grid">
              {highlights.map((h, i) => (
                <div className="hl-card" key={i}>
                  <div className={`hl-ico ${h.color}`}>{h.svg}</div>
                  <div className="hl-text">
                    <div className="hl-title">{h.title}</div>
                    <div className="hl-sub">{h.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="about-right">

            {/* Bio */}
            <div className="about-bio">
              <div className="about-bio-heading">
                <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                My Story
              </div>
              <p>
                I'm Amit Ghoyal, a final-year MCA student at GLS University,
                Ahmedabad, with a strong foundation in programming, database
                management, and machine learning. My academic journey has been
                defined by curiosity and a drive to turn ideas into working software.
              </p>
              <p>
                My experience spans web development, backend engineering,
                relational database design, and applied machine learning. I
                enjoy building software that solves real-world problems and
                delivers a great user experience — from clean REST APIs to
                data-driven dashboards.
              </p>
              <p>
                Currently seeking Software Developer opportunities where I can
                contribute meaningfully, learn from experienced engineers, and
                help build scalable, impactful products from day one.
              </p>
            </div>

            {/* Skills */}
            <div className="skills-panel">
              <div className="skills-panel-heading">
                <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
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
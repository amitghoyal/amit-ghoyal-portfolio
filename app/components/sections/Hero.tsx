"use client";
import { useEffect, useRef } from "react";
const IconGradCap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
  </svg>
);

const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const IconPulse = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

/* Drawn "A" monogram — SVG path that animates stroke-dashoffset on mount */
const MonogramA = () => (
  <svg
    className="monogram-a"
    viewBox="0 0 200 260"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      className="mono-path"
      d="M20 240 L100 20 L180 240 M50 160 L150 160"
      stroke="var(--teal)"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Hero() {
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = photoRef.current;
    if (!img) return;
    const show = () => { img.style.display = "block"; };
    if (img.complete && img.naturalWidth > 0) show();
    else img.onload = show;
  }, []);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════
           HERO V3 — PROFESSIONAL / SVG-ONLY
        ═══════════════════════════════════ */

        /* ── SHELL ── */
        .hv3 {
          background: var(--bg);
          padding: 0 5vw;
          overflow: hidden;
          position: relative;
        }

        /* Architectural grid lines — subtle background texture */
        .hv3-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.035;
        }

        /* Teal accent bar at very top */
        .hv3-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--teal) 0%, var(--teal-light) 60%, transparent 100%);
          position: relative;
          z-index: 1;
        }

        /* ── INNER ── */
        .hv3-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 4rem;
          align-items: center;
          min-height: calc(100vh - 71px);
          padding: 80px 0 80px;
          position: relative;
          z-index: 1;
        }

        /* ═══════════════════════════════════
           LEFT COLUMN
        ═══════════════════════════════════ */
        .hv3-left {}

        /* Eyebrow */
        .hv3-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.35rem 0.85rem 0.35rem 0.5rem;
          border: 1px solid var(--teal-mid);
          border-radius: var(--pill-radius);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--teal);
          background: var(--teal-pale);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 1.8rem;

          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.6s var(--ease) 0.1s forwards;
        }

        .hv3-eyebrow-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--teal);
          animation: pulse 2.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(10,123,92,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(10,123,92,0); }
        }

        /* Headline */
        .hv3-headline {
          font-size: clamp(2.5rem, 4vw, 3.9rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 1.2rem;
        }

        .hv3-headline .line {
          display: block;
          overflow: hidden;
        }

        .hv3-headline .line-inner {
          display: block;
          opacity: 0;
          transform: translateY(100%);
          animation: slideUp 0.7s var(--ease) forwards;
        }

        .hv3-headline .line:nth-child(1) .line-inner { animation-delay: 0.25s; }
        .hv3-headline .line:nth-child(2) .line-inner { animation-delay: 0.38s; }
        .hv3-headline .line:nth-child(3) .line-inner { animation-delay: 0.51s; }

        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .hv3-headline em {
          font-style: normal;
          color: var(--teal);
          position: relative;
          display: inline-block;
        }
        /* Underline drawn via pseudo */
        .hv3-headline em::after {
          content: '';
          position: absolute;
          left: 0; bottom: 2px;
          width: 100%; height: 2px;
          background: var(--teal-light);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          animation: lineGrow 0.6s var(--ease) 1.05s forwards;
        }
        @keyframes lineGrow {
          to { transform: scaleX(1); }
        }

        /* Sub */
        .hv3-sub {
          font-size: 0.97rem;
          font-weight: 400;
          color: var(--ink-muted);
          line-height: 1.85;
          max-width: 430px;
          margin-bottom: 2.4rem;

          opacity: 0;
          animation: fadeUp 0.6s var(--ease) 0.65s forwards;
        }

        /* Role tags */
        .hv3-roles {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.5s var(--ease) 0.75s forwards;
        }
        .hv3-role-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.85rem;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--pill-radius);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--ink-mid);
          box-shadow: var(--shadow-xs);
          transition: border-color 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .hv3-role-pill:hover {
          border-color: var(--teal);
          color: var(--teal);
          box-shadow: 0 2px 12px rgba(10,123,92,0.12);
        }
        .hv3-role-pill svg {
          color: var(--teal);
          flex-shrink: 0;
        }

        /* CTAs */
        .hv3-btns {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.5s var(--ease) 0.88s forwards;
        }

        /* Separator line */
        .hv3-sep {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, var(--teal), transparent);
          border-radius: 2px;
          margin: 2.4rem 0;
          opacity: 0;
          animation: fadeUp 0.5s var(--ease) 1s forwards;
        }

        /* Stack */
        .hv3-stack {
          opacity: 0;
          animation: fadeUp 0.5s var(--ease) 1.05s forwards;
        }
        .hv3-stack-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 0.7rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .hv3-stack-label::before {
          content: '';
          display: block;
          width: 12px; height: 1.5px;
          background: var(--teal);
        }
        .hv3-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .hv3-stack-pill {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 0.28rem 0.7rem;
          font-size: 0.73rem;
          font-weight: 700;
          color: var(--ink-mid);
          font-variant-numeric: tabular-nums;
          transition: all 0.2s;
          box-shadow: var(--shadow-xs);
        }
        .hv3-stack-pill:hover {
          border-color: var(--teal);
          color: var(--teal);
          transform: translateY(-1px);
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ═══════════════════════════════════
           RIGHT COLUMN
        ═══════════════════════════════════ */
        .hv3-right {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;

          opacity: 0;
          animation: fadeIn 0.9s var(--ease) 0.4s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        /* Photo + monogram frame */
        .hv3-frame {
          position: relative;
          width: 340px;
          height: 400px;
        }

        /* Outer decorative square corners */
        .hv3-frame-corner {
          position: absolute;
          width: 36px; height: 36px;
          border-color: var(--teal);
          border-style: solid;
        }
        .hv3-frame-corner.tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .hv3-frame-corner.tr { top: -8px; right: -8px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .hv3-frame-corner.bl { bottom: -8px; left: -8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .hv3-frame-corner.br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        .hv3-frame-inner {
          width: 100%; height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(160deg, var(--teal-mid) 0%, #A8E6CF 100%);
          position: relative;
          box-shadow: var(--shadow-lg);
        }

        /* Monogram fallback — animated SVG draw */
        .monogram-a {
          position: absolute;
          inset: 0;
          width: 60%;
          height: auto;
          margin: auto;
          top: 0; bottom: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mono-path {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: drawStroke 1.6s var(--ease) 0.6s forwards;
          opacity: 0.22;
        }
        @keyframes drawStroke {
          to { stroke-dashoffset: 0; opacity: 0.22; }
        }

        .hv3-photo {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: top center;
          display: none;
        }

        /* Dot grid decoration */
        .hv3-dot-grid {
          position: absolute;
          bottom: -32px; right: -36px;
          width: 96px; height: 96px;
          background-image: radial-gradient(circle, rgba(10,123,92,0.28) 1.5px, transparent 1.5px);
          background-size: 12px 12px;
          pointer-events: none;
          z-index: -1;
        }

        /* ── FLOATING INFO CARDS ── */
        .hv3-chip {
          position: absolute;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.7rem 1.1rem;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 0.7rem;
          white-space: nowrap;
          z-index: 10;
          min-width: 160px;
        }

        .hv3-chip-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: var(--teal-pale);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--teal);
          flex-shrink: 0;
        }

        .hv3-chip-main {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
        }
        .hv3-chip-sub {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--ink-muted);
          margin-top: 0.1rem;
        }

        .hv3-chip.c1 {
          top: 24px; left: -56px;
          animation: chipFloat 4.5s ease-in-out infinite;
        }
        .hv3-chip.c2 {
          top: 45%; right: -52px;
          animation: chipFloat 4.5s ease-in-out infinite;
          animation-delay: -1.6s;
        }
        .hv3-chip.c3 {
          bottom: 36px; left: -48px;
          animation: chipFloat 4.5s ease-in-out infinite;
          animation-delay: -3s;
        }

        @keyframes chipFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-9px); }
        }

        /* ═══════════════════════════════════
           STAT BAND
        ═══════════════════════════════════ */
        .hv3-stats {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 0 5vw;
        }
        .hv3-stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hv3-stat {
          padding: 1.6rem 1.2rem;
          text-align: center;
          border-right: 1px solid var(--border);
          transition: background 0.22s;
          cursor: default;
          position: relative;
        }
        .hv3-stat:last-child { border-right: none; }
        .hv3-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--teal), var(--teal-light));
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s var(--ease);
        }
        .hv3-stat:hover { background: var(--teal-pale); }
        .hv3-stat:hover::after { transform: scaleX(1); }
        .hv3-stat-num {
          font-size: 2rem;
          font-weight: 700;
          color: var(--teal);
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .hv3-stat-lbl {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--ink-muted);
          margin-top: 0.35rem;
        }

        /* ═══════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════ */
        @media (max-width: 960px) {
          .hv3-inner {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 56px 0 48px;
            gap: 3rem;
          }
          .hv3-right {
            order: -1;
          }
          .hv3-frame { width: 220px; height: 262px; }
          .hv3-chip  { display: none; }
          .hv3-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .hv3-stat:nth-child(2) { border-right: none; }
          .hv3-stat:nth-child(3) { border-top: 1px solid var(--border); }
          .hv3-stat:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
        }

        @media (max-width: 600px) {
          .hv3 { padding: 0 4vw; }
          .hv3-headline { font-size: 2.15rem; }
          .hv3-frame  { width: 180px; height: 218px; }
          .hv3-dot-grid { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hv3-eyebrow, .hv3-headline .line-inner, .hv3-sub,
          .hv3-roles, .hv3-btns, .hv3-sep, .hv3-stack, .hv3-right {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .mono-path { stroke-dashoffset: 0; opacity: 0.22; animation: none; }
          .hv3-chip  { animation: none; }
          .hv3-eyebrow-dot { animation: none; }
          .hv3-headline em::after { transform: scaleX(1); animation: none; }
        }
      `}</style>

      {/* ── Accent bar ── */}
      <div className="hv3-accent-bar" />

      {/* ── HERO ── */}
      <header className="hv3" id="home">

        {/* Background grid SVG */}
        <svg className="hv3-grid-bg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="var(--ink)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>

        <div className="hv3-inner">

          {/* ── LEFT ── */}
          <div className="hv3-left">

            <div className="hv3-eyebrow">
              <span className="hv3-eyebrow-dot" />
              Available for Internship &amp; Full-Time Roles
            </div>

            <h1 className="hv3-headline">
              <span className="line"><span className="line-inner">Final-year MCA,</span></span>
              <span className="line"><span className="line-inner">building <em>full-stack</em></span></span>
              <span className="line"><span className="line-inner">&amp; <em>ML-powered</em> software</span></span>
            </h1>

            <p className="hv3-sub">
              Specialising in Python, PHP&nbsp;/&nbsp;Django, and applied machine learning
              at GLS University. I design clean, scalable systems and I'm actively
              seeking my first Software Developer role.
            </p>

            <div className="hv3-roles">
              {[
                { label: "Full-Stack Developer", icon: <IconCode /> },
                { label: "ML Engineer",          icon: <IconPulse /> },
              ].map(r => (
                <div className="hv3-role-pill" key={r.label}>
                  {r.icon}
                  {r.label}
                </div>
              ))}
            </div>

            <div className="hv3-btns">
              <a href="#projects" className="btn btn-teal btn-lg">
                View Projects <IconArrow />
              </a>
              <a href="/resume.pdf" className="btn btn-outline btn-lg" download>
                <IconDownload /> Download Résumé
              </a>
            </div>

            <div className="hv3-sep" />

            <div className="hv3-stack">
              <div className="hv3-stack-label">Core Stack</div>
              <div className="hv3-stack-pills">
                {["Python", "PHP", "Django", "MySQL", "JavaScript", "ML / Scikit-learn"].map(t => (
                  <span className="hv3-stack-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="hv3-right">
            <div className="hv3-frame">

              {/* Corner accents */}
              <div className="hv3-frame-corner tl" />
              <div className="hv3-frame-corner tr" />
              <div className="hv3-frame-corner bl" />
              <div className="hv3-frame-corner br" />

              <div className="hv3-frame-inner">
                {/* Animated monogram fallback */}
                <MonogramA />
                {/* Actual photo — shown by JS when loaded */}
                <img
                  ref={photoRef}
                  src="/profile.png"
                  alt="Amit Ghoyal — Software Developer"
                  className="hv3-photo"
                />
              </div>

              <div className="hv3-dot-grid" />

              {/* ── Floating info chips ── */}
              <div className="hv3-chip c1">
                <div className="hv3-chip-icon"><IconGradCap /></div>
                <div>
                  <div className="hv3-chip-main">MCA Final Year</div>
                  <div className="hv3-chip-sub">GLS University</div>
                </div>
              </div>

              <div className="hv3-chip c2">
                <div className="hv3-chip-icon"><IconCode /></div>
                <div>
                  <div className="hv3-chip-main">2+ Projects</div>
                  <div className="hv3-chip-sub">Web · Full-Stack</div>
                </div>
              </div>

              <div className="hv3-chip c3">
                <div className="hv3-chip-icon"><IconStar /></div>
                <div>
                  <div className="hv3-chip-main">CGPA 9.25 / 10</div>
                  <div className="hv3-chip-sub">Academic Excellence</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* ── STAT BAND ── */}
      <div className="hv3-stats">
        <div className="hv3-stats-inner">
          {[
            { num: "2+",    lbl: "Projects Built"         },
            { num: "9.25",  lbl: "MCA CGPA"               },
            { num: "5+",    lbl: "Awards & Recognitions"  },
            { num: "3",     lbl: "Languages Known"        },
          ].map(s => (
            <div className="hv3-stat" key={s.lbl}>
              <div className="hv3-stat-num">{s.num}</div>
              <div className="hv3-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
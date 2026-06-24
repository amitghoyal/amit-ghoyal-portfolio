"use client";
import { useState, useEffect } from "react";

type Achievement = {
  icon: React.ReactNode;
  colorClass: "teal" | "gold" | "indigo" | "rose";
  title: string;
  description: string;
  year: string;
  certificate: string; // path to certificate image
};

const achievements: Achievement[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    colorClass: "gold",
    title: "Best Leader Award",
    year: "2025",
    description:
      "Recognized for outstanding leadership, team management, and contribution to club activities — Trendsetters Marketing Club.",
    certificate: "/certificates/best-leader.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    colorClass: "teal",
    title: "Academic Excellence Award",
    year: "2024",
    description:
      "Awarded for exceptional academic performance and securing top ranks during the 2023–24 academic year.",
    certificate: "/certificates/academic-excellence.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
    colorClass: "indigo",
    title: "Bloggers Paradise — 1st Prize",
    year: "2024",
    description:
      "Won 1st Prize in the Inter-College Bloggers Paradise Competition for creative writing and content strategy.",
    certificate: "/certificates/bloggers-paradise.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    colorClass: "rose",
    title: "Advertisement Competition — 1st Runner-Up",
    year: "2024",
    description:
      "Achieved 1st Runner-Up in the Advertisement Making Competition, showcasing creativity and strategic communication.",
    certificate: "/certificates/advertisement.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    colorClass: "teal",
    title: "Team Collaboration & Soft Skills",
    year: "2023–25",
    description:
      "Problem-Solving · Team Collaboration · Communication · Time Management · Adaptability · Analytical Thinking.",
    certificate: "/certificates/soft-skills.jpg",
  },
];

const palette = {
  teal:   { bg: "var(--teal-pale)",  icon: "var(--teal)",    border: "var(--teal-mid)",  badge: "#0A7B5C" },
  gold:   { bg: "#FFF5E0",           icon: "#D4860A",         border: "#F5D48A",          badge: "#B87300" },
  indigo: { bg: "#EEF2FF",           icon: "#4F46E5",         border: "#C7D2FE",          badge: "#3730A3" },
  rose:   { bg: "#FFF1F2",           icon: "#E11D48",         border: "#FECDD3",          badge: "#9F1239" },
};

export default function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [certError, setCertError] = useState<Record<string, boolean>>({});

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section className="section" id="achievements">
      <style>{`
        /* ── GRID ── */
        .ach-v2-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.2rem;
        }

        /* ── CARD ── */
        .ach-v2-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 1.6rem;
          box-shadow: var(--shadow-xs);
          transition: all .32s var(--ease);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }
        .ach-v2-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          opacity: 0;
          transition: opacity .3s;
          border-radius: 20px 20px 0 0;
        }
        .ach-v2-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        .ach-v2-card:hover::before { opacity: 1; }

        /* colour variants */
        .ach-v2-card.teal::before   { background: linear-gradient(90deg, var(--teal), var(--teal-light)); border-color: var(--teal-mid); }
        .ach-v2-card.gold::before   { background: linear-gradient(90deg, #F5A623, #FFD166); }
        .ach-v2-card.indigo::before { background: linear-gradient(90deg, #4F46E5, #818CF8); }
        .ach-v2-card.rose::before   { background: linear-gradient(90deg, #E11D48, #FB7185); }
        .ach-v2-card:hover.teal   { border-color: var(--teal-mid); }
        .ach-v2-card:hover.gold   { border-color: #F5D48A; }
        .ach-v2-card:hover.indigo { border-color: #C7D2FE; }
        .ach-v2-card:hover.rose   { border-color: #FECDD3; }

        /* Top row: icon + year badge */
        .ach-v2-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .ach-v2-ico {
          width: 46px; height: 46px;
          border-radius: 12px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .ach-v2-ico svg { width: 22px; height: 22px; }

        .ach-v2-year {
          font-size: 0.7rem; font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--pill-radius);
          border: 1px solid;
          white-space: nowrap;
        }

        /* Body */
        .ach-v2-body { flex: 1; }
        .ach-v2-title {
          font-size: 0.97rem; font-weight: 700;
          color: var(--ink); line-height: 1.3;
          margin-bottom: 0.45rem;
        }
        .ach-v2-desc {
          font-size: 0.81rem; color: var(--ink-muted);
          font-weight: 500; line-height: 1.7;
        }

        /* Certificate preview strip */
        .ach-v2-cert-strip {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          height: 110px;
          position: relative;
          background: var(--bg);
        }
        .ach-v2-cert-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          display: block;
          transition: transform .4s var(--ease);
        }
        .ach-v2-card:hover .ach-v2-cert-img { transform: scale(1.04); }

        .ach-v2-cert-fallback {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.4rem;
        }
        .ach-v2-cert-fallback svg {
          width: 28px; height: 28px;
          fill: none; opacity: 0.3;
        }
        .ach-v2-cert-fallback span {
          font-size: 0.68rem; font-weight: 700;
          color: var(--ink-muted);
        }

        /* View overlay on thumb */
        .ach-v2-cert-hover {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          transition: background .3s;
        }
        .ach-v2-card:hover .ach-v2-cert-hover { background: rgba(0,0,0,0.32); }
        .ach-v2-cert-view {
          opacity: 0; transform: scale(0.85);
          background: #fff; border-radius: var(--pill-radius);
          padding: 0.4rem 0.9rem;
          font-size: 0.72rem; font-weight: 700; color: var(--ink);
          display: flex; align-items: center; gap: 0.35rem;
          transition: all .25s var(--ease);
          box-shadow: var(--shadow-sm);
        }
        .ach-v2-cert-view svg { width: 12px; height: 12px; stroke: var(--teal); fill: none; }
        .ach-v2-card:hover .ach-v2-cert-view { opacity: 1; transform: scale(1); }

        /* ── MODAL ── */
        .ach-modal-bg {
          position: fixed; inset: 0; z-index: 700;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          opacity: 0; pointer-events: none;
          transition: opacity .3s;
        }
        .ach-modal-bg.open { opacity: 1; pointer-events: all; }

        @media (min-width: 600px) {
          .ach-modal-bg { align-items: center; padding: 1.5rem; }
        }

        .ach-modal {
          background: var(--white);
          width: 100%; max-width: 640px;
          border-radius: 28px 28px 0 0;
          max-height: 92vh; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 -4px 60px rgba(0,0,0,0.25);
          transform: translateY(50px);
          transition: transform .38s cubic-bezier(.22,1,.36,1);
        }
        .ach-modal-bg.open .ach-modal { transform: translateY(0); }

        @media (min-width: 600px) {
          .ach-modal {
            border-radius: 24px;
            transform: scale(0.92) translateY(20px);
          }
          .ach-modal-bg.open .ach-modal { transform: scale(1) translateY(0); }
        }

        /* drag handle */
        .ach-modal-handle {
          width: 40px; height: 4px; border-radius: 2px;
          background: #e0e0e0;
          margin: 14px auto 0;
        }
        @media (min-width: 600px) { .ach-modal-handle { display: none; } }

        /* cert image in modal */
        .ach-modal-cert-wrap {
          position: relative;
          margin: 1.2rem 1.5rem 0;
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg);
          border: 1px solid var(--border);
        }
        .ach-modal-cert-img {
          width: 100%; display: block;
          max-height: 420px;
          object-fit: contain;
          background: #f9f9f9;
        }
        .ach-modal-cert-fallback {
          height: 200px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.6rem;
        }
        .ach-modal-cert-fallback svg {
          width: 48px; height: 48px;
          fill: none; opacity: 0.2;
          stroke: var(--ink);
        }
        .ach-modal-cert-fallback p {
          font-size: 0.8rem; color: var(--ink-muted); font-weight: 500;
        }

        /* X close */
        .ach-modal-x {
          position: absolute; top: 12px; right: 12px;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(0,0,0,0.3); backdrop-filter: blur(4px);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
          transition: background .2s;
        }
        .ach-modal-x:hover { background: rgba(0,0,0,0.55); }
        .ach-modal-x svg { width: 14px; height: 14px; stroke: #fff; fill: none; }

        .ach-modal-body { padding: 1.4rem 1.5rem 2rem; }
        .ach-modal-ico-row {
          display: flex; align-items: center; gap: 0.85rem;
          margin-bottom: 0.9rem;
        }
        .ach-modal-ico {
          width: 48px; height: 48px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ach-modal-ico svg { width: 23px; height: 23px; }
        .ach-modal-title {
          font-size: 1.2rem; font-weight: 700;
          color: var(--ink); line-height: 1.25;
        }
        .ach-modal-year {
          font-size: 0.74rem; font-weight: 700;
          color: var(--ink-muted); margin-top: 0.15rem;
        }
        .ach-modal-desc {
          font-size: 0.9rem; color: var(--ink-mid);
          font-weight: 500; line-height: 1.8;
          margin-bottom: 1.4rem;
        }
        .ach-modal-close-btn {
          width: 100%;
          padding: 0.72rem;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: var(--ink);
          cursor: pointer; transition: background .2s;
        }
        .ach-modal-close-btn:hover { background: var(--border); }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .ach-v2-grid { grid-template-columns: 1fr; }
          .ach-modal-body { padding: 1.2rem 1.2rem 1.8rem; }
        }
      `}</style>

      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Milestones</p>
          <h2 className="sec-h2">Achievements &amp; Extra-Curricular</h2>
          <p className="sec-lead">
            Things I've completed, contributed to, or earned along the way.
          </p>
        </div>

        <div className="ach-v2-grid">
          {achievements.map((item, i) => {
            const p = palette[item.colorClass];
            const failed = certError[item.title];

            return (
              <div
                key={i}
                className={`ach-v2-card ${item.colorClass}`}
                onClick={() => setSelected(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(item)}
                aria-label={`View certificate for ${item.title}`}
              >
                {/* Top row */}
                <div className="ach-v2-top">
                  <div className="ach-v2-ico" style={{ background: p.bg }}>
                    <div style={{ color: p.icon }}>{item.icon}</div>
                  </div>
                  <span
                    className="ach-v2-year"
                    style={{ background: p.bg, color: p.icon, borderColor: p.border }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Text */}
                <div className="ach-v2-body">
                  <div className="ach-v2-title">{item.title}</div>
                  <p className="ach-v2-desc">{item.description}</p>
                </div>

                {/* Certificate thumb */}
                <div className="ach-v2-cert-strip">
                  {!failed ? (
                    <img
                      className="ach-v2-cert-img"
                      src={item.certificate}
                      alt={`${item.title} certificate`}
                      loading="lazy"
                      onError={() => setCertError(e => ({ ...e, [item.title]: true }))}
                    />
                  ) : (
                    <div className="ach-v2-cert-fallback" style={{ background: p.bg }}>
                      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke={p.icon}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                      <span>Certificate Coming Soon</span>
                    </div>
                  )}
                  <div className="ach-v2-cert-hover">
                    <span className="ach-v2-cert-view">
                      <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Certificate
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div
        className={`ach-modal-bg${selected ? " open" : ""}`}
        onClick={() => setSelected(null)}
      >
        {selected && (() => {
          const p = palette[selected.colorClass];
          const failed = certError[selected.title];

          return (
            <div className="ach-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ach-modal-handle" />

              {/* Certificate image */}
              <div className="ach-modal-cert-wrap">
                {!failed ? (
                  <>
                    <img
                      className="ach-modal-cert-img"
                      src={selected.certificate}
                      alt={`${selected.title} certificate`}
                      onError={() => setCertError(e => ({ ...e, [selected.title]: true }))}
                    />
                    <button className="ach-modal-x" onClick={() => setSelected(null)} aria-label="Close">
                      <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="ach-modal-cert-fallback">
                    <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <p>Certificate image not available yet</p>
                  </div>
                )}
              </div>

              <div className="ach-modal-body">
                <div className="ach-modal-ico-row">
                  <div className="ach-modal-ico" style={{ background: p.bg }}>
                    <div style={{ color: p.icon }}>{selected.icon}</div>
                  </div>
                  <div>
                    <div className="ach-modal-title">{selected.title}</div>
                    <div className="ach-modal-year">{selected.year}</div>
                  </div>
                </div>

                <p className="ach-modal-desc">{selected.description}</p>

                <button className="ach-modal-close-btn" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
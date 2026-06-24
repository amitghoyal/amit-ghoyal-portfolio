"use client";
import { useState, useEffect } from "react";

type Memory = {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  span?: "tall" | "normal"; // optional: tall cards take more visual weight
};

const memories: Memory[] = [
  {
    title: "Best Leader Award",
    date: "2025",
    category: "Leadership",
    image: "/memories/leader-award.jpg",
    description: "Received Best Leader Award for outstanding leadership, team management, and contribution to club activities.",
    span: "tall",
  },
  {
    title: "Academic Excellence Award",
    date: "2024",
    category: "Academics",
    image: "/memories/academic-award.jpg",
    description: "Recognized for excellent academic performance and securing top ranks.",
    span: "normal",
  },
  {
    title: "Bloggers Paradise Winner",
    date: "2024",
    category: "Competition",
    image: "/memories/blogging.jpg",
    description: "Won 1st Prize in the Inter-College Bloggers Paradise Competition.",
    span: "tall",
  },
  {
    title: "Group Dance Competition",
    date: "2024",
    category: "Cultural",
    image: "/memories/dance.jpg",
    description: "Secured 1st Position in Group Dance Competition during Annual Function.",
    span: "normal",
  },
  {
    title: "Advertisement Competition",
    date: "2024",
    category: "Creativity",
    image: "/memories/advertisement.jpg",
    description: "Achieved 1st Runner-Up in Advertisement Making Competition.",
    span: "tall",
  },
  {
    title: "College Event",
    date: "2024",
    category: "Events",
    image: "/memories/event.jpg",
    description: "Participated in various college events and leadership activities.",
    span: "normal",
  },
];

const categoryColors: Record<string, { bg: string; color: string }> = {
  Leadership:  { bg: "rgba(10,123,92,0.85)",  color: "#fff" },
  Academics:   { bg: "rgba(79,70,229,0.85)",  color: "#fff" },
  Competition: { bg: "rgba(245,166,35,0.90)", color: "#fff" },
  Cultural:    { bg: "rgba(225,29,72,0.85)",  color: "#fff" },
  Creativity:  { bg: "rgba(124,58,237,0.85)", color: "#fff" },
  Events:      { bg: "rgba(20,184,166,0.85)", color: "#fff" },
};

// Fallback gradient per category
const categoryGradient: Record<string, string> = {
  Leadership:  "linear-gradient(135deg,#B7E4C7,#52B788)",
  Academics:   "linear-gradient(135deg,#C7D2FE,#818CF8)",
  Competition: "linear-gradient(135deg,#FDE68A,#F59E0B)",
  Cultural:    "linear-gradient(135deg,#FECDD3,#F43F5E)",
  Creativity:  "linear-gradient(135deg,#DDD6FE,#8B5CF6)",
  Events:      "linear-gradient(135deg,#99F6E4,#14B8A6)",
};

export default function Memories() {
  const [selected, setSelected] = useState<Memory | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [cols, setCols] = useState(3);

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 480 ? 1 : w < 768 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Distribute cards across columns (top-to-bottom fill)
  const columns: Memory[][] = Array.from({ length: cols }, () => []);
  memories.forEach((m, i) => columns[i % cols].push(m));

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section className="section section-alt" id="memories">
      <style>{`
        /* ── MASONRY ── */
        .mem-masonry {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .mem-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }

        /* ── CARD ── */
        .mem-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10);
          transition: transform .35s cubic-bezier(.22,1,.36,1),
                      box-shadow .35s cubic-bezier(.22,1,.36,1);
          background: #e8e8e8;
          /* height driven by image aspect ratio */
        }
        .mem-card:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 16px 48px rgba(0,0,0,0.18);
        }
        .mem-card:active { transform: scale(0.98); }

        .mem-img {
          width: 100%;
          display: block;
          /* natural aspect ratio — Pinterest style */
        }
        .mem-fallback {
          width: 100%;
          aspect-ratio: 4/5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .mem-fallback svg {
          width: 36px; height: 36px;
          opacity: 0.35;
          stroke: #fff;
          fill: none;
        }
        .mem-fallback-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.05em;
        }

        /* Gradient overlay */
        .mem-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 35%,
            rgba(0,0,0,0.72) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 14px;
          opacity: 0;
          transition: opacity .3s;
        }
        .mem-card:hover .mem-overlay { opacity: 1; }

        /* Always-visible bottom strip on mobile (no hover) */
        @media (hover: none) {
          .mem-overlay { opacity: 1; }
        }

        .mem-badge {
          align-self: flex-start;
          border-radius: 100px;
          padding: 0.22rem 0.65rem;
          font-size: 0.65rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          letter-spacing: 0.04em;
        }
        .mem-card-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 0.15rem;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .mem-card-date {
          font-size: 0.7rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
        }

        /* View icon */
        .mem-view-icon {
          position: absolute;
          top: 12px; right: 12px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.7);
          transition: opacity .25s, transform .25s;
        }
        .mem-card:hover .mem-view-icon {
          opacity: 1; transform: scale(1);
        }
        .mem-view-icon svg {
          width: 15px; height: 15px;
          stroke: #fff; fill: none;
        }

        /* ── MODAL ── */
        .mem-modal-bg {
          position: fixed; inset: 0; z-index: 700;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: flex-end;       /* sheet from bottom on mobile */
          justify-content: center;
          padding: 0;
          opacity: 0; pointer-events: none;
          transition: opacity .3s;
        }
        .mem-modal-bg.open {
          opacity: 1; pointer-events: all;
        }

        @media (min-width: 600px) {
          .mem-modal-bg {
            align-items: center;
            padding: 1rem;
          }
        }

        .mem-modal {
          background: #fff;
          width: 100%;
          max-width: 600px;
          border-radius: 28px 28px 0 0;
          overflow: hidden;
          box-shadow: 0 -4px 60px rgba(0,0,0,0.25);
          transform: translateY(40px);
          transition: transform .38s cubic-bezier(.22,1,.36,1);
          max-height: 92vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mem-modal-bg.open .mem-modal { transform: translateY(0); }

        @media (min-width: 600px) {
          .mem-modal {
            border-radius: 24px;
            max-height: 88vh;
            transform: scale(0.92) translateY(20px);
          }
          .mem-modal-bg.open .mem-modal { transform: scale(1) translateY(0); }
        }

        /* drag handle (mobile) */
        .mem-modal-handle {
          width: 44px; height: 4px;
          border-radius: 2px;
          background: #e0e0e0;
          margin: 14px auto 0;
        }
        @media (min-width: 600px) { .mem-modal-handle { display: none; } }

        .mem-modal-img {
          width: 100%;
          max-height: 320px;
          object-fit: cover;
          display: block;
        }
        .mem-modal-img-fallback {
          width: 100%; height: 220px;
          display: flex; align-items: center; justify-content: center;
        }
        .mem-modal-img-fallback svg {
          width: 56px; height: 56px;
          opacity: 0.22; fill: none; stroke: #fff;
        }

        .mem-modal-body { padding: 1.5rem 1.6rem 2rem; }
        .mem-modal-cat {
          display: inline-block;
          border-radius: 100px;
          padding: 0.25rem 0.75rem;
          font-size: 0.7rem; font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .mem-modal-title {
          font-size: 1.3rem; font-weight: 700;
          color: var(--ink); line-height: 1.25;
          margin-bottom: 0.3rem;
        }
        .mem-modal-date {
          font-size: 0.78rem; font-weight: 600;
          color: var(--ink-muted); margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.35rem;
        }
        .mem-modal-date svg {
          width: 13px; height: 13px;
          stroke: var(--teal); fill: none; flex-shrink: 0;
        }
        .mem-modal-desc {
          font-size: 0.9rem; color: var(--ink-mid);
          font-weight: 500; line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .mem-modal-close {
          display: flex; align-items: center; justify-content: center;
          width: 100%;
          padding: 0.7rem;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: var(--ink);
          cursor: pointer; transition: background .2s;
        }
        .mem-modal-close:hover { background: var(--border); }

        /* close X top-right */
        .mem-modal-x {
          position: absolute; top: 14px; right: 14px;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(0,0,0,0.35); backdrop-filter: blur(4px);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
          transition: background .2s;
        }
        .mem-modal-x:hover { background: rgba(0,0,0,0.55); }
        .mem-modal-x svg { width: 15px; height: 15px; stroke: #fff; fill: none; }

        .mem-modal-wrap { position: relative; }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="sec-head">
          <p className="sec-tag">Memories</p>
          <h2 className="sec-h2">Winning Moments &amp; Memories</h2>
          <p className="sec-lead">
            Achievements, celebrations, competitions, and unforgettable experiences.
          </p>
        </div>

        {/* Masonry grid — JS-driven columns */}
        <div className="mem-masonry">
          {columns.map((col, ci) => (
            <div className="mem-col" key={ci}>
              {col.map((mem, mi) => {
                const failed = imgErrors[mem.title];
                const cat = categoryColors[mem.category] ?? { bg: "rgba(10,123,92,0.85)", color: "#fff" };
                const grad = categoryGradient[mem.category] ?? "linear-gradient(135deg,#C2EAD9,#74C69D)";

                return (
                  <div
                    className="mem-card"
                    key={mi}
                    onClick={() => setSelected(mem)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(mem)}
                    aria-label={`View ${mem.title}`}
                  >
                    {failed ? (
                      <div className="mem-fallback" style={{ background: grad }}>
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                        </svg>
                        <span className="mem-fallback-label">{mem.category}</span>
                      </div>
                    ) : (
                      <img
                        className="mem-img"
                        src={mem.image}
                        alt={mem.title}
                        loading="lazy"
                        onError={() => setImgErrors(e => ({ ...e, [mem.title]: true }))}
                      />
                    )}

                    {/* Always-visible bottom info on touch, hover-only on desktop */}
                    <div className="mem-overlay">
                      <span
                        className="mem-badge"
                        style={{ background: cat.bg, color: cat.color }}
                      >
                        {mem.category}
                      </span>
                      <div className="mem-card-title">{mem.title}</div>
                      <div className="mem-card-date">{mem.date}</div>
                    </div>

                    {/* View icon top-right */}
                    <div className="mem-view-icon">
                      <svg viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL (bottom sheet on mobile, centred on desktop) ── */}
      <div
        className={`mem-modal-bg${selected ? " open" : ""}`}
        onClick={() => setSelected(null)}
      >
        {selected && (() => {
          const failed = imgErrors[selected.title];
          const cat = categoryColors[selected.category] ?? { bg: "rgba(10,123,92,0.85)", color: "#fff" };
          const grad = categoryGradient[selected.category] ?? "linear-gradient(135deg,#C2EAD9,#74C69D)";

          return (
            <div className="mem-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mem-modal-handle" />

              <div className="mem-modal-wrap">
                {/* X close */}
                <button className="mem-modal-x" onClick={() => setSelected(null)} aria-label="Close">
                  <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                {/* Image */}
                {failed ? (
                  <div className="mem-modal-img-fallback" style={{ background: grad }}>
                    <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                    </svg>
                  </div>
                ) : (
                  <img
                    className="mem-modal-img"
                    src={selected.image}
                    alt={selected.title}
                    onError={() => setImgErrors(e => ({ ...e, [selected.title]: true }))}
                  />
                )}
              </div>

              <div className="mem-modal-body">
                <span
                  className="mem-modal-cat"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  {selected.category}
                </span>

                <div className="mem-modal-title">{selected.title}</div>

                <div className="mem-modal-date">
                  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {selected.date}
                </div>

                <p className="mem-modal-desc">{selected.description}</p>

                <button className="mem-modal-close" onClick={() => setSelected(null)}>
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
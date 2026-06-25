"use client";
import { useState, useEffect, useRef } from "react";

type Memory = {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  span?: "tall" | "normal";
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
  Leadership:  { bg: "rgba(10,123,92,0.90)",  color: "#fff" },
  Academics:   { bg: "rgba(79,70,229,0.90)",  color: "#fff" },
  Competition: { bg: "rgba(180,117,23,0.90)", color: "#fff" },
  Cultural:    { bg: "rgba(190,18,60,0.90)",  color: "#fff" },
  Creativity:  { bg: "rgba(109,40,217,0.90)", color: "#fff" },
  Events:      { bg: "rgba(15,118,110,0.90)", color: "#fff" },
};

const categoryGradient: Record<string, string> = {
  Leadership:  "linear-gradient(135deg,#B7E4C7,#52B788)",
  Academics:   "linear-gradient(135deg,#C7D2FE,#818CF8)",
  Competition: "linear-gradient(135deg,#FDE68A,#F59E0B)",
  Cultural:    "linear-gradient(135deg,#FECDD3,#F43F5E)",
  Creativity:  "linear-gradient(135deg,#DDD6FE,#8B5CF6)",
  Events:      "linear-gradient(135deg,#99F6E4,#14B8A6)",
};

// Aspect ratios to simulate Pinterest heights before images load
const aspectMap: Record<string, string> = {
  tall:   "3/4",
  normal: "4/5",
};

export default function Memories() {
  const [selected, setSelected] = useState<Memory | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [cols, setCols] = useState(2); // default 2, safe for SSR
  const containerRef = useRef<HTMLDivElement>(null);

  // ResizeObserver — fires reliably on Android Chrome, no flickering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? window.innerWidth;
      setCols(w < 500 ? 2 : 3);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Distribute cards across columns
  const columns: Memory[][] = Array.from({ length: cols }, () => []);
  memories.forEach((m, i) => columns[i % cols].push(m));

  // Prevent body scroll when modal open — Android-safe version
  useEffect(() => {
    if (selected) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (top) window.scrollTo(0, -parseInt(top));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [selected]);

  // Escape key
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <section className="section section-alt" id="memories">
      <style>{`
        /* ── MASONRY ── */
        .mem-masonry {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .mem-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }

        /* ── CARD ── */
        .mem-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: #e4e4e4;
          /* GPU layer — prevents repaint jank on scroll */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          transition: transform .3s cubic-bezier(.22,1,.36,1),
                      box-shadow .3s cubic-bezier(.22,1,.36,1);
          -webkit-tap-highlight-color: transparent;
          box-shadow: 0 2px 10px rgba(0,0,0,0.09);
        }
        .mem-card:active {
          transform: scale(0.97) translateZ(0);
          -webkit-transform: scale(0.97) translateZ(0);
        }
        /* hover only on real pointer devices */
        @media (hover: hover) and (pointer: fine) {
          .mem-card:hover {
            transform: translateY(-4px) scale(1.012) translateZ(0);
            -webkit-transform: translateY(-4px) scale(1.012) translateZ(0);
            box-shadow: 0 14px 40px rgba(0,0,0,0.16);
          }
        }

        /* Image fills naturally — Pinterest style */
        .mem-img {
          width: 100%;
          height: auto;
          display: block;
          /* prevent layout shift while loading */
          min-height: 100px;
        }

        /* Fallback block when image missing */
        .mem-fallback {
          width: 100%;
          aspect-ratio: 3/4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .mem-fallback svg {
          width: 32px; height: 32px;
          opacity: 0.3;
          stroke: #fff;
          fill: none;
          stroke-width: 1.5px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .mem-fallback-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.05em;
        }

        /* Bottom gradient overlay — ALWAYS visible on touch, hover on desktop */
        .mem-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 55%, transparent 100%);
          padding: 28px 12px 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        /* desktop: fade in on hover; touch: always on */
        @media (hover: hover) and (pointer: fine) {
          .mem-overlay { opacity: 0; transition: opacity .28s; }
          .mem-card:hover .mem-overlay { opacity: 1; }
        }

        .mem-badge {
          align-self: flex-start;
          border-radius: 100px;
          padding: 0.18rem 0.55rem;
          font-size: 0.6rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          letter-spacing: 0.04em;
          /* no backdrop-filter — Android Chrome bug */
        }
        .mem-card-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 0.1rem;
        }
        .mem-card-date {
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        /* Eye icon top-right — hover devices only */
        .mem-view-icon {
          position: absolute;
          top: 10px; right: 10px;
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(0.75);
          transition: opacity .22s, transform .22s;
          pointer-events: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .mem-card:hover .mem-view-icon { opacity: 1; transform: scale(1); }
        }
        .mem-view-icon svg {
          width: 14px; height: 14px;
          stroke: #fff; fill: none;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ── MODAL BACKDROP ──
           NO backdrop-filter — blank on older Android Chrome.
           Use a semi-transparent dark bg instead.        */
        .mem-modal-bg {
          position: fixed;
          inset: 0;
          z-index: 700;
          background: rgba(0,0,0,0.80);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity .28s ease;
          /* Ensure it covers the entire viewport on Android */
          width: 100%;
          height: 100%;
        }
        .mem-modal-bg.open {
          opacity: 1;
          pointer-events: all;
        }
        @media (min-width: 600px) {
          .mem-modal-bg {
            align-items: center;
            padding: 1rem;
          }
        }

        /* ── MODAL SHEET ── */
        .mem-modal {
          background: #fff;
          width: 100%;
          max-width: 560px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          /* Use max-height with dvh fallback for Android address-bar */
          max-height: 88vh;
          max-height: 88dvh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          transform: translateY(48px);
          transition: transform .35s cubic-bezier(.22,1,.36,1);
          will-change: transform;
          box-shadow: 0 -4px 40px rgba(0,0,0,0.22);
        }
        .mem-modal-bg.open .mem-modal {
          transform: translateY(0);
        }
        @media (min-width: 600px) {
          .mem-modal {
            border-radius: 20px;
            max-height: 86vh;
            max-height: 86dvh;
            transform: translateY(20px) scale(0.96);
          }
          .mem-modal-bg.open .mem-modal {
            transform: translateY(0) scale(1);
          }
        }

        /* Drag handle */
        .mem-modal-handle {
          width: 40px; height: 4px;
          border-radius: 2px;
          background: #e0e0e0;
          margin: 12px auto 0;
        }
        @media (min-width: 600px) { .mem-modal-handle { display: none; } }

        .mem-modal-img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          display: block;
        }
        .mem-modal-img-fallback {
          width: 100%; height: 200px;
          display: flex; align-items: center; justify-content: center;
        }
        .mem-modal-img-fallback svg {
          width: 52px; height: 52px;
          opacity: 0.22; fill: none; stroke: #fff;
          stroke-width: 1.2px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .mem-modal-wrap { position: relative; }

        /* X close — solid bg, no backdrop-filter */
        .mem-modal-x {
          position: absolute;
          top: 12px; right: 12px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(0,0,0,0.50);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10;
          -webkit-tap-highlight-color: transparent;
          transition: background .2s;
        }
        .mem-modal-x:active { background: rgba(0,0,0,0.70); }
        @media (hover: hover) and (pointer: fine) {
          .mem-modal-x:hover { background: rgba(0,0,0,0.65); }
        }
        .mem-modal-x svg {
          width: 14px; height: 14px;
          stroke: #fff; fill: none;
          stroke-width: 2.5px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .mem-modal-body {
          padding: 1.3rem 1.4rem 2rem;
        }
        .mem-modal-cat {
          display: inline-block;
          border-radius: 100px;
          padding: 0.22rem 0.7rem;
          font-size: 0.68rem; font-weight: 700;
          margin-bottom: 0.7rem;
        }
        .mem-modal-title {
          font-size: 1.25rem; font-weight: 700;
          color: var(--ink); line-height: 1.25;
          margin-bottom: 0.3rem;
        }
        .mem-modal-date {
          font-size: 0.76rem; font-weight: 600;
          color: var(--ink-muted); margin-bottom: 0.9rem;
          display: flex; align-items: center; gap: 0.3rem;
        }
        .mem-modal-date svg {
          width: 13px; height: 13px;
          stroke: var(--teal); fill: none;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }
        .mem-modal-desc {
          font-size: 0.88rem; color: var(--ink-mid);
          font-weight: 500; line-height: 1.8;
          margin-bottom: 1.4rem;
        }
        .mem-modal-close {
          display: flex; align-items: center; justify-content: center;
          width: 100%;
          padding: 0.72rem;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.84rem; font-weight: 700; color: var(--ink);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background .2s;
        }
        .mem-modal-close:active { background: var(--border); }
        @media (hover: hover) and (pointer: fine) {
          .mem-modal-close:hover { background: var(--border); }
        }
      `}</style>

      <div className="container" ref={containerRef}>
        {/* Header */}
        <div className="sec-head">
          <p className="sec-tag">Memories</p>
          <h2 className="sec-h2">Winning Moments &amp; Memories</h2>
          <p className="sec-lead">
            Achievements, celebrations, competitions, and unforgettable experiences.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="mem-masonry">
          {columns.map((col, ci) => (
            <div className="mem-col" key={ci}>
              {col.map((mem, mi) => {
                const failed = imgErrors[mem.title];
                const cat = categoryColors[mem.category] ?? { bg: "rgba(10,123,92,0.90)", color: "#fff" };
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
                        <svg viewBox="0 0 24 24">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                          <line x1="4" y1="22" x2="4" y2="15"/>
                        </svg>
                        <span className="mem-fallback-label">{mem.category}</span>
                      </div>
                    ) : (
                      <img
                        className="mem-img"
                        src={mem.image}
                        alt={mem.title}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImgErrors(e => ({ ...e, [mem.title]: true }))}
                      />
                    )}

                    <div className="mem-overlay">
                      <span className="mem-badge" style={{ background: cat.bg, color: cat.color }}>
                        {mem.category}
                      </span>
                      <div className="mem-card-title">{mem.title}</div>
                      <div className="mem-card-date">{mem.date}</div>
                    </div>

                    <div className="mem-view-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div
        className={`mem-modal-bg${selected ? " open" : ""}`}
        onClick={() => setSelected(null)}
        role="dialog"
        aria-modal="true"
      >
        {selected && (() => {
          const failed = imgErrors[selected.title];
          const cat = categoryColors[selected.category] ?? { bg: "rgba(10,123,92,0.90)", color: "#fff" };
          const grad = categoryGradient[selected.category] ?? "linear-gradient(135deg,#C2EAD9,#74C69D)";

          return (
            <div className="mem-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mem-modal-handle" />

              <div className="mem-modal-wrap">
                <button
                  className="mem-modal-x"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>

                {failed ? (
                  <div className="mem-modal-img-fallback" style={{ background: grad }}>
                    <svg viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                      <line x1="4" y1="22" x2="4" y2="15"/>
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
                <span className="mem-modal-cat" style={{ background: cat.bg, color: cat.color }}>
                  {selected.category}
                </span>

                <div className="mem-modal-title">{selected.title}</div>

                <div className="mem-modal-date">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
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
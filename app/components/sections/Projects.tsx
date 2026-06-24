"use client";
import { useState } from "react";

const projects = [
  {
    title: "MittiSafar",
    subtitle: "Rural Tourism & Employment Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    image: "/projects/mittisafar.png",   // place your image here
    accent: "#2D6A4F",
    gradientFrom: "#B7E4C7",
    gradientTo: "#74C69D",
    description:
      "Connects travelers with rural hosts via OTP-secured booking, host registration, and integrated payments. Built to bridge the urban–rural gap and generate sustainable local employment.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    liveUrl: "",
    githubUrl: "https://github.com/",
    highlights: [
      "OTP-secured booking flow",
      "Host registration & approval system",
      "Payment integration",
      "Responsive across all devices",
    ],
  },
  {
    title: "Aakar Creatives",
    subtitle: "Online Gifting Website",
    category: "web",
    categoryLabel: "Web Dev",
    image: "/projects/aakar.png",
    accent: "#9D4EDD",
    gradientFrom: "#E0AAFF",
    gradientTo: "#C77DFF",
    description:
      "Responsive product catalog and inquiry system for a customized-gifting business. Features category filtering, product detail pages, and a WhatsApp inquiry flow.",
    tags: ["PHP", "HTML/CSS", "Bootstrap"],
    liveUrl: "",
    githubUrl: "https://github.com/",
    highlights: [
      "Category filter & search",
      "Product detail pages",
      "WhatsApp inquiry flow",
      "Mobile-first design",
    ],
  },
  {
    title: "Personal Portfolio",
    subtitle: "Developer Portfolio Website",
    category: "web",
    categoryLabel: "Web Dev",
    image: "/projects/portfolio.png",
    accent: "#0A7B5C",
    gradientFrom: "#C2EAD9",
    gradientTo: "#A8E6CF",
    description:
      "Custom-built responsive portfolio featuring project gallery, scroll animations, dark-section contrast, and a working contact form.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/",
    highlights: [
      "Scroll-reveal animations",
      "Project gallery with filters",
      "Working contact form",
      "Fully responsive",
    ],
  },
];

type Filter = "all" | "fullstack" | "web" | "ml";

const filters: { label: string; value: Filter }[] = [
  { label: "All Projects", value: "all" },
  { label: "Web Dev", value: "web" },
  { label: "Full-Stack", value: "fullstack" },
];

export default function Projects() {
  const [active, setActive] = useState<Filter>("all");
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const visible = projects.filter(
    (p) => active === "all" || p.category === active
  );

  return (
    <section className="section section-alt" id="projects">
      <style>{`
        /* ── FILTER BAR ── */
        .pf-bar {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .pf-btn {
          padding: 0.42rem 1.1rem;
          border-radius: var(--pill-radius);
          font-family: 'Quicksand', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          border: 1.5px solid var(--border);
          background: transparent; color: var(--ink-muted);
          cursor: pointer; transition: all .2s;
        }
        .pf-btn:hover { border-color: var(--teal); color: var(--teal); }
        .pf-btn.on { background: var(--teal); color: #fff; border-color: var(--teal); }

        /* ── GRID ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.4rem;
        }

        /* ── PROJECT CARD ── */
        .proj-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-xs);
          cursor: pointer;
          transition: all .35s var(--ease);
          display: flex; flex-direction: column;
        }
        .proj-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }

        /* Thumb */
        .proj-thumb {
          height: 200px;
          position: relative;
          overflow: hidden;
        }
        .proj-thumb-bg {
          position: absolute; inset: 0;
          transition: transform .5s var(--ease);
        }
        .proj-card:hover .proj-thumb-bg { transform: scale(1.06); }

        .proj-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          display: block;
        }
        .proj-thumb-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .proj-thumb-fallback svg {
          width: 56px; height: 56px;
          opacity: 0.22;
        }

        .proj-cat-pill {
          position: absolute; top: 12px; left: 12px; z-index: 2;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(6px);
          border-radius: var(--pill-radius);
          padding: 0.2rem 0.65rem;
          font-size: 0.68rem; font-weight: 700; color: var(--ink);
          box-shadow: var(--shadow-xs);
        }

        .proj-overlay {
          position: absolute; inset: 0; z-index: 3;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          transition: background .3s;
        }
        .proj-card:hover .proj-overlay { background: rgba(0,0,0,0.38); }
        .proj-view-btn {
          opacity: 0; transform: translateY(10px) scale(0.9);
          background: #fff; color: var(--teal);
          border-radius: var(--pill-radius);
          padding: 0.55rem 1.3rem;
          font-size: 0.8rem; font-weight: 700;
          display: flex; align-items: center; gap: 0.4rem;
          transition: all .3s var(--ease);
          box-shadow: var(--shadow-md);
        }
        .proj-card:hover .proj-view-btn { opacity: 1; transform: translateY(0) scale(1); }
        .proj-view-btn svg { width: 14px; height: 14px; stroke: var(--teal); }

        /* Body */
        .proj-body { padding: 1.3rem 1.5rem 1.5rem; flex: 1; display: flex; flex-direction: column; }
        .proj-body-title { font-size: 1rem; font-weight: 700; color: var(--ink); line-height: 1.3; }
        .proj-body-sub   { font-size: 0.75rem; font-weight: 600; color: var(--teal); margin-bottom: 0.55rem; }
        .proj-body-desc  { font-size: 0.82rem; color: var(--ink-muted); font-weight: 500; line-height: 1.65; flex: 1; margin-bottom: 1rem; }
        .proj-body-tags  { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .proj-tag {
          background: var(--bg); border: 1px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.18rem 0.6rem;
          font-size: 0.7rem; font-weight: 700; color: var(--ink-muted);
        }

        /* ── MODAL ── */
        .pmodal-bg {
          position: fixed; inset: 0; z-index: 600;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          opacity: 0; pointer-events: none;
          transition: opacity .3s;
        }
        .pmodal-bg.open { opacity: 1; pointer-events: all; }

        .pmodal {
          background: var(--white);
          border-radius: 24px;
          width: 100%; max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
          transform: scale(0.93) translateY(16px);
          transition: transform .35s var(--ease);
          position: relative;
        }
        .pmodal-bg.open .pmodal { transform: scale(1) translateY(0); }

        .pmodal-thumb {
          height: 240px; position: relative; overflow: hidden;
          border-radius: 24px 24px 0 0;
        }
        .pmodal-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
        }
        .pmodal-thumb-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .pmodal-thumb-fallback svg { width: 72px; height: 72px; opacity: 0.2; }

        .pmodal-close {
          position: sticky; top: 0; float: right;
          z-index: 10; margin: 1rem 1rem 0 0;
          width: 36px; height: 36px;
          border-radius: 50%; border: none;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: background .2s;
        }
        .pmodal-close:hover { background: var(--bg); }
        .pmodal-close svg { width: 16px; height: 16px; stroke: var(--ink); fill: none; }

        .pmodal-body { padding: 1.8rem 2rem 2rem; }
        .pmodal-cat { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); margin-bottom: 0.35rem; }
        .pmodal-title { font-size: 1.5rem; font-weight: 700; color: var(--ink); line-height: 1.2; margin-bottom: 0.2rem; }
        .pmodal-sub { font-size: 0.88rem; font-weight: 600; color: var(--ink-muted); margin-bottom: 1.2rem; }
        .pmodal-desc { font-size: 0.92rem; color: var(--ink-mid); font-weight: 500; line-height: 1.8; margin-bottom: 1.5rem; }

        .pmodal-section-label {
          font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--ink-muted); margin-bottom: 0.7rem;
        }
        .pmodal-highlights {
          display: flex; flex-direction: column; gap: 0.55rem;
          margin-bottom: 1.5rem;
        }
        .pmodal-hl {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.85rem; font-weight: 600; color: var(--ink-mid);
        }
        .pmodal-hl-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--teal); flex-shrink: 0;
        }

        .pmodal-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 1.8rem; }
        .pmodal-tag {
          background: var(--teal-pale); border: 1px solid var(--teal-mid);
          color: var(--teal); border-radius: var(--pill-radius);
          padding: 0.28rem 0.8rem; font-size: 0.76rem; font-weight: 700;
        }

        .pmodal-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .proj-grid { grid-template-columns: 1fr; }
          .pmodal-body { padding: 1.3rem; }
          .pmodal-title { font-size: 1.25rem; }
          .pmodal-thumb { height: 180px; }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="sec-head sec-head-row">
          <div>
            <p className="sec-tag">Selected Work</p>
            <h2 className="sec-h2">Projects</h2>
            <p className="sec-lead">Click any card to view full details.</p>
          </div>
          <a
            href="https://github.com/"
            className="view-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            All on GitHub
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Filters */}
        <div className="pf-bar">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`pf-btn${active === f.value ? " on" : ""}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="proj-grid">
          {visible.map((p, i) => {
            const imgFailed = imgErrors[p.title];
            return (
              <div className="proj-card" key={i} onClick={() => setSelected(p)}>
                {/* Thumb */}
                <div className="proj-thumb">
                  <div
                    className="proj-thumb-bg"
                    style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                  >
                    {!imgFailed ? (
                      <img
                        className="proj-thumb-img"
                        src={p.image}
                        alt={p.title}
                        onError={() => setImgErrors(e => ({ ...e, [p.title]: true }))}
                      />
                    ) : (
                      <div className="proj-thumb-fallback" style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <span className="proj-cat-pill">{p.categoryLabel}</span>

                  <div className="proj-overlay">
                    <span className="proj-view-btn">
                      View Details
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="proj-body">
                  <div className="proj-body-title">{p.title}</div>
                  <div className="proj-body-sub">{p.subtitle}</div>
                  <p className="proj-body-desc">{p.description}</p>
                  <div className="proj-body-tags">
                    {p.tags.map((t) => <span className="proj-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div
        className={`pmodal-bg${selected ? " open" : ""}`}
        onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
      >
        {selected && (
          <div className="pmodal">
            {/* Close */}
            <button className="pmodal-close" onClick={() => setSelected(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Thumb */}
            <div className="pmodal-thumb">
              {!imgErrors[selected.title] ? (
                <img
                  className="pmodal-thumb-img"
                  src={selected.image}
                  alt={selected.title}
                  onError={() => setImgErrors(e => ({ ...e, [selected.title]: true }))}
                />
              ) : (
                <div
                  className="pmodal-thumb-fallback"
                  style={{ background: `linear-gradient(135deg, ${selected.gradientFrom}, ${selected.gradientTo})` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke={selected.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
              )}
            </div>

            <div className="pmodal-body">
              <div className="pmodal-cat">{selected.categoryLabel}</div>
              <div className="pmodal-title">{selected.title}</div>
              <div className="pmodal-sub">{selected.subtitle}</div>
              <p className="pmodal-desc">{selected.description}</p>

              <div className="pmodal-section-label">Key Features</div>
              <div className="pmodal-highlights">
                {selected.highlights.map((h) => (
                  <div className="pmodal-hl" key={h}>
                    <span className="pmodal-hl-dot" />
                    {h}
                  </div>
                ))}
              </div>

              <div className="pmodal-section-label">Tech Stack</div>
              <div className="pmodal-tags">
                {selected.tags.map((t) => <span className="pmodal-tag" key={t}>{t}</span>)}
              </div>

              <div className="pmodal-actions">
                {selected.liveUrl && (
                  <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-teal btn-md">
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
                {selected.githubUrl && (
                  <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-md">
                    View on GitHub
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                )}
                <button className="btn btn-outline btn-md" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
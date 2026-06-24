"use client";
import { useState, useEffect } from "react";

type Award = {
  icon: React.ReactNode;
  title: string;
  org: string;
  year: string;
  description: string;
  photo: string; // path to award/event photo
};

const awards: Award[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
    title: "Bloggers Paradise — 1st Prize",
    org: "Inter-College Blogging Competition",
    year: "2024",
    description: "Won 1st place for creative and impactful content writing in the inter-college blogging competition.",
    photo: "/awards/bloggers-paradise.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    title: "Group Dance Competition — 1st Prize",
    org: "College Annual Function",
    year: "2024",
    description: "Secured 1st position as part of the college team, representing creativity and coordination during the Annual Function.",
    photo: "/awards/dance.jpg",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "Advertisement Making — 1st Runner-Up",
    org: "Inter-College Competition",
    year: "2024",
    description: "Achieved 1st Runner-Up by developing a creative and engaging advertisement campaign that stood out across colleges.",
    photo: "/awards/advertisement.jpg",
  },
];

export default function Awards() {
  const [selected, setSelected] = useState<Award | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section className="section section-dark" id="awards">
      <style>{`
        /* ── GRID ── */
        .aw-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.2rem;
        }

        /* ── CARD ── */
        .aw-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all .35s var(--ease);
          position: relative;
        }
        .aw-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        /* teal-gold top bar on hover */
        .aw-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--teal-light), var(--gold));
          transform: scaleX(0); transform-origin: left;
          transition: transform .4s var(--ease);
          z-index: 2;
        }
        .aw-card:hover::before { transform: scaleX(1); }

        /* ── PHOTO THUMB ── */
        .aw-thumb {
          height: 170px;
          position: relative;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .aw-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform .5s var(--ease);
        }
        .aw-card:hover .aw-thumb-img { transform: scale(1.06); }

        /* fallback */
        .aw-thumb-fallback {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(18,169,126,0.15), rgba(10,123,92,0.08));
        }
        .aw-thumb-fallback svg {
          width: 36px; height: 36px;
          stroke: rgba(255,255,255,0.2); fill: none;
        }
        .aw-thumb-fallback span {
          font-size: 0.68rem; font-weight: 700;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* hover overlay */
        .aw-thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          transition: background .3s;
          z-index: 1;
        }
        .aw-card:hover .aw-thumb-overlay { background: rgba(0,0,0,0.4); }
        .aw-view-pill {
          opacity: 0; transform: scale(0.85) translateY(6px);
          background: rgba(255,255,255,0.95);
          border-radius: var(--pill-radius);
          padding: 0.45rem 1rem;
          font-size: 0.75rem; font-weight: 700; color: var(--ink);
          display: flex; align-items: center; gap: 0.4rem;
          transition: all .28s var(--ease);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .aw-view-pill svg { width: 13px; height: 13px; stroke: var(--teal); fill: none; }
        .aw-card:hover .aw-view-pill { opacity: 1; transform: scale(1) translateY(0); }

        /* year pill on thumb */
        .aw-year-pill {
          position: absolute; top: 12px; right: 12px; z-index: 2;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
          border-radius: var(--pill-radius);
          padding: 0.2rem 0.6rem;
          font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.85);
        }

        /* ── CARD BODY ── */
        .aw-body { padding: 1.4rem 1.5rem 1.6rem; }

        .aw-ico-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .aw-ico {
          width: 42px; height: 42px; border-radius: 11px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .aw-ico svg { width: 20px; height: 20px; stroke: var(--teal-light); }

        .aw-title {
          font-size: 0.95rem; font-weight: 700;
          color: var(--white); line-height: 1.3;
        }
        .aw-org {
          font-size: 0.73rem; font-weight: 700;
          color: var(--teal-light); margin-top: 0.1rem;
        }

        .aw-desc {
          font-size: 0.8rem; color: rgba(255,255,255,0.5);
          font-weight: 500; line-height: 1.7; margin-top: 0.6rem;
        }

        /* ── MODAL ── */
        .aw-modal-bg {
          position: fixed; inset: 0; z-index: 700;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(12px);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 0;
          opacity: 0; pointer-events: none;
          transition: opacity .3s;
        }
        .aw-modal-bg.open { opacity: 1; pointer-events: all; }

        @media (min-width: 600px) {
          .aw-modal-bg { align-items: center; padding: 1.5rem; }
        }

        .aw-modal {
          background: var(--ink);
          border: 1px solid rgba(255,255,255,0.1);
          width: 100%; max-width: 680px;
          border-radius: 28px 28px 0 0;
          max-height: 92vh; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 -8px 60px rgba(0,0,0,0.5);
          transform: translateY(60px);
          transition: transform .38s cubic-bezier(.22,1,.36,1);
        }
        .aw-modal-bg.open .aw-modal { transform: translateY(0); }

        @media (min-width: 600px) {
          .aw-modal {
            border-radius: 24px;
            transform: scale(0.9) translateY(24px);
          }
          .aw-modal-bg.open .aw-modal { transform: scale(1) translateY(0); }
        }

        .aw-modal-handle {
          width: 40px; height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.15);
          margin: 14px auto 0;
        }
        @media (min-width: 600px) { .aw-modal-handle { display: none; } }

        /* modal photo */
        .aw-modal-photo-wrap {
          position: relative;
          margin: 1.2rem 1.5rem 0;
          border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .aw-modal-photo {
          width: 100%; display: block;
          max-height: 400px;
          object-fit: contain;
          background: rgba(0,0,0,0.2);
        }
        .aw-modal-photo-fallback {
          height: 200px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.6rem;
          background: linear-gradient(135deg, rgba(18,169,126,0.12), rgba(10,123,92,0.06));
        }
        .aw-modal-photo-fallback svg {
          width: 48px; height: 48px;
          stroke: rgba(255,255,255,0.2); fill: none;
        }
        .aw-modal-photo-fallback p {
          font-size: 0.8rem; color: rgba(255,255,255,0.3); font-weight: 500;
        }

        /* X close on photo */
        .aw-modal-x {
          position: absolute; top: 10px; right: 10px;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 5; transition: background .2s;
        }
        .aw-modal-x:hover { background: rgba(0,0,0,0.7); }
        .aw-modal-x svg { width: 14px; height: 14px; stroke: #fff; fill: none; }

        .aw-modal-body { padding: 1.4rem 1.5rem 2rem; }
        .aw-modal-ico-row {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem;
        }
        .aw-modal-ico {
          width: 48px; height: 48px; border-radius: 13px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .aw-modal-ico svg { width: 22px; height: 22px; stroke: var(--teal-light); }
        .aw-modal-title { font-size: 1.2rem; font-weight: 700; color: #fff; line-height: 1.25; }
        .aw-modal-org   { font-size: 0.75rem; font-weight: 700; color: var(--teal-light); margin-top: 0.1rem; }
        .aw-modal-year  { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.35); margin-top: 0.15rem; }
        .aw-modal-desc  { font-size: 0.9rem; color: rgba(255,255,255,0.55); font-weight: 500; line-height: 1.8; margin-bottom: 1.4rem; }

        .aw-modal-close {
          width: 100%; padding: 0.72rem;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.7);
          cursor: pointer; transition: background .2s;
        }
        .aw-modal-close:hover { background: rgba(255,255,255,0.1); }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .aw-grid { grid-template-columns: 1fr; }
          .aw-modal-body { padding: 1.2rem 1.2rem 1.8rem; }
          .aw-modal-photo-wrap { margin: 1rem 1.2rem 0; }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="sec-head">
          <p className="sec-tag">Recognition</p>
          <h2 className="sec-h2 light">Awards</h2>
          <p className="sec-lead light">Competitions and recognitions I'm proud of.</p>
        </div>

        {/* Grid */}
        <div className="aw-grid">
          {awards.map((award, i) => {
            const failed = photoErrors[award.title];
            return (
              <div
                key={i}
                className="aw-card"
                onClick={() => setSelected(award)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(award)}
                aria-label={`View ${award.title}`}
              >
                {/* Photo thumb */}
                <div className="aw-thumb">
                  {!failed ? (
                    <img
                      className="aw-thumb-img"
                      src={award.photo}
                      alt={award.title}
                      loading="lazy"
                      onError={() => setPhotoErrors(e => ({ ...e, [award.title]: true }))}
                    />
                  ) : (
                    <div className="aw-thumb-fallback">
                      <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                      </svg>
                      <span>Photo Coming Soon</span>
                    </div>
                  )}
                  <span className="aw-year-pill">{award.year}</span>
                  <div className="aw-thumb-overlay">
                    <span className="aw-view-pill">
                      <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      View Photo
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="aw-body">
                  <div className="aw-ico-row">
                    <div className="aw-ico">{award.icon}</div>
                    <div>
                      <div className="aw-title">{award.title}</div>
                      <div className="aw-org">{award.org}</div>
                    </div>
                  </div>
                  <p className="aw-desc">{award.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div
        className={`aw-modal-bg${selected ? " open" : ""}`}
        onClick={() => setSelected(null)}
      >
        {selected && (() => {
          const failed = photoErrors[selected.title];
          return (
            <div className="aw-modal" onClick={(e) => e.stopPropagation()}>
              <div className="aw-modal-handle" />

              {/* Photo */}
              <div className="aw-modal-photo-wrap">
                {!failed ? (
                  <>
                    <img
                      className="aw-modal-photo"
                      src={selected.photo}
                      alt={selected.title}
                      onError={() => setPhotoErrors(e => ({ ...e, [selected.title]: true }))}
                    />
                    <button className="aw-modal-x" onClick={() => setSelected(null)} aria-label="Close">
                      <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="aw-modal-photo-fallback">
                    <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
                    </svg>
                    <p>Photo not available yet</p>
                  </div>
                )}
              </div>

              <div className="aw-modal-body">
                <div className="aw-modal-ico-row">
                  <div className="aw-modal-ico">{selected.icon}</div>
                  <div>
                    <div className="aw-modal-title">{selected.title}</div>
                    <div className="aw-modal-org">{selected.org}</div>
                    <div className="aw-modal-year">{selected.year}</div>
                  </div>
                </div>
                <p className="aw-modal-desc">{selected.description}</p>
                <button className="aw-modal-close" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
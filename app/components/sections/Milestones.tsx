"use client";
import { useState, useEffect, useRef } from "react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type MilestoneCategory = "achievement" | "award" | "volunteering";

type Milestone = {
  icon: React.ReactNode;
  colorClass: "teal" | "gold" | "indigo" | "rose" | "violet";
  category: MilestoneCategory;
  title: string;
  org: string;
  year: string;
  description: string;
  images: string[]; // supports 1 or many — certificates, trophies, photos
};

// ─── DATA — edit / extend freely ─────────────────────────────────────────────

const milestones: Milestone[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    colorClass: "gold",
    category: "achievement",
    title: "Best Leader Award",
    org: "Trendsetters Marketing Club",
    year: "2025",
    description:
      "Recognized for outstanding leadership, team management, and contribution to club activities.",
    images: [
      "/milestones/best-leader-certificate.jpg",
      "/milestones/best-leader-trophy.jpg",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    colorClass: "teal",
    category: "achievement",
    title: "Academic Excellence Award",
    org: "College Academic Committee",
    year: "2024",
    description:
      "Awarded for exceptional academic performance and securing top ranks during the 2023–24 academic year.",
    images: [
      "/milestones/academic-excellence-sem-3.jpg",
      "/milestones/academic-excellence-sem-4.jpg",
      "/milestones/academic-excellence-sem-5.jpg",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
        <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
      </svg>
    ),
    colorClass: "indigo",
    category: "award",
    title: "Bloggers Paradise — 1st Prize",
    org: "Inter-College Blogging Competition",
    year: "2024",
    description:
      "Won 1st Prize for creative writing and content strategy in the inter-college blogging competition.",
    images: [
      "/milestones/bloggers-certificate.jpg",
      "/milestones/bloggers-trophy.jpg",
      "/milestones/bloggers-team.jpg",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    colorClass: "rose",
    category: "award",
    title: "Advertisement Competition — 1st Runner-Up",
    org: "Inter-College Competition",
    year: "2024",
    description:
      "Achieved 1st Runner-Up in the Advertisement Making Competition, showcasing creativity and strategic communication.",
    images: [
      "/milestones/advertisement-certificate.jpg",
      "/milestones/advertisement-trophy.jpg",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
    colorClass: "gold",
    category: "award",
    title: "Group Dance Competition — 1st Prize",
    org: "College Annual Function",
    year: "2024",
    description:
      "Secured 1st position as part of the college team, representing creativity and coordination.",
    images: [
      "/milestones/dance-trophy.jpg",
      "/milestones/dance-team.jpg",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    colorClass: "violet",
    category: "volunteering",
    title: "NSS Volunteer & Camp Coordinator",
    org: "National Service Scheme",
    year: "2023–25",
    description:
      "Actively volunteered in community drives, blood donation camps, and environmental awareness programs over two academic years.",
    images: [
      "/milestones/nss-camp.jpg",
      "/milestones/nss-certificate.jpg",
    ],
  },
];

// ─── PALETTE ──────────────────────────────────────────────────────────────────

const palette = {
  teal:   { bg: "rgba(18,169,126,0.15)",  icon: "#12A97E", border: "rgba(18,169,126,0.35)", bar: "#12A97E" },
  gold:   { bg: "rgba(212,134,10,0.15)",  icon: "#D4860A", border: "rgba(212,134,10,0.35)", bar: "#F5A623" },
  indigo: { bg: "rgba(99,102,241,0.15)",  icon: "#818CF8", border: "rgba(99,102,241,0.35)", bar: "#6366F1" },
  rose:   { bg: "rgba(225,29,72,0.15)",   icon: "#FB7185", border: "rgba(225,29,72,0.35)",  bar: "#E11D48" },
  violet: { bg: "rgba(139,92,246,0.15)",  icon: "#A78BFA", border: "rgba(139,92,246,0.35)", bar: "#8B5CF6" },
};

const categoryLabel: Record<MilestoneCategory, string> = {
  achievement: "Achievement",
  award: "Award",
  volunteering: "Volunteering",
};

// ─── IMAGE SLIDER (inside modal) ─────────────────────────────────────────────

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const failed = errors[idx];

  return (
    <div className="ms-slider">
      <div className="ms-slider-main">
        {!failed ? (
          <img
            key={idx}
            src={images[idx]}
            alt={`${title} — image ${idx + 1}`}
            className="ms-slider-img"
            onError={() => setErrors((e) => ({ ...e, [idx]: true }))}
          />
        ) : (
          <div className="ms-slider-fallback">
            <svg viewBox="0 0 24 24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" stroke="rgba(255,255,255,0.2)" fill="none" width="48" height="48">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <p>Image not available yet</p>
          </div>
        )}
        {images.length > 1 && (
          <>
            <button className="ms-arr ms-arr-l" onClick={prev} aria-label="Previous image">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="ms-arr ms-arr-r" onClick={next} aria-label="Next image">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <div className="ms-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`ms-dot${i === idx ? " active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="ms-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`ms-thumb-btn${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`View image ${i + 1}`}
            >
              {!errors[i] ? (
                <img
                  src={src}
                  alt=""
                  className="ms-thumb-img"
                  onError={() => setErrors((e) => ({ ...e, [i]: true }))}
                />
              ) : (
                <div className="ms-thumb-fallback">
                  <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgba(255,255,255,0.25)" fill="none" width="16" height="16">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CARD IMAGE THUMBS (on card) ──────────────────────────────────────────────

function CardThumbs({ images, colorBar }: { images: string[]; colorBar: string }) {
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const show = images.slice(0, 3);
  const extra = images.length - 3;

  return (
    <div className="ms-card-thumbs">
      {show.map((src, i) => (
        <div key={i} className="ms-card-thumb-wrap">
          {!errors[i] ? (
            <img
              src={src}
              alt=""
              className="ms-card-thumb-img"
              loading="lazy"
              onError={() => setErrors((e) => ({ ...e, [i]: true }))}
            />
          ) : (
            <div className="ms-card-thumb-fallback" style={{ borderColor: colorBar }}>
              <svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgba(255,255,255,0.2)" fill="none" width="18" height="18">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          {i === 2 && extra > 0 && (
            <div className="ms-card-thumb-more">+{extra + 1}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Milestones() {
  const [selected, setSelected] = useState<Milestone | null>(null);
  const [filter, setFilter] = useState<MilestoneCategory | "all">("all");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = filter === "all" ? milestones : milestones.filter((m) => m.category === filter);

  return (
    <section className="section section-dark" id="milestones">
      <style>{`
        /* ── FILTER TABS ── */
        .ms-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        .ms-filter-btn {
          padding: 0.4rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.5);
          font-family: 'Quicksand', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all .22s ease;
          letter-spacing: 0.01em;
        }
        .ms-filter-btn:hover {
          border-color: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
        }
        .ms-filter-btn.active {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
        }

        /* ── GRID ── */
        .ms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.2rem;
        }

        /* ── CARD ── */
        .ms-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all .32s cubic-bezier(.22,1,.36,1);
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .ms-card:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.18);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }
        .ms-card-bar {
          height: 3px;
          width: 100%;
          flex-shrink: 0;
        }

        /* ── CARD BODY ── */
        .ms-card-body {
          padding: 1.4rem 1.5rem 1.2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .ms-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .ms-card-ico {
          width: 44px; height: 44px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ms-card-ico svg { width: 21px; height: 21px; }

        .ms-card-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
        }
        .ms-card-cat {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          white-space: nowrap;
        }
        .ms-card-year {
          font-size: 0.68rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
        }

        .ms-card-title {
          font-size: 0.97rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          margin: 0;
        }
        .ms-card-org {
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 0.15rem;
        }
        .ms-card-desc {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.48);
          font-weight: 500;
          line-height: 1.7;
          margin: 0;
        }

        /* ── CARD THUMB STRIP ── */
        .ms-card-thumbs {
          display: flex;
          gap: 0.5rem;
          padding: 0 1.5rem 1.4rem;
        }
        .ms-card-thumb-wrap {
          flex: 1;
          height: 72px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .ms-card-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform .4s ease;
        }
        .ms-card:hover .ms-card-thumb-img { transform: scale(1.06); }
        .ms-card-thumb-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
        }
        .ms-card-thumb-more {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.82rem; font-weight: 700; color: #fff;
        }

        /* ── VIEW OVERLAY ── */
        .ms-card-view-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0);
          display: flex; align-items: center; justify-content: center;
          transition: background .28s;
          pointer-events: none;
          border-radius: 20px;
        }
        .ms-card:hover .ms-card-view-overlay { background: rgba(0,0,0,0.12); }
        .ms-card-view-pill {
          opacity: 0; transform: scale(0.85) translateY(6px);
          background: rgba(255,255,255,0.95);
          border-radius: 999px;
          padding: 0.42rem 1rem;
          font-size: 0.73rem; font-weight: 700; color: #111;
          display: flex; align-items: center; gap: 0.4rem;
          transition: all .25s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          white-space: nowrap;
        }
        .ms-card-view-pill svg { flex-shrink: 0; }
        .ms-card:hover .ms-card-view-pill { opacity: 1; transform: scale(1) translateY(0); }

        /* ── MODAL BACKDROP ── */
        .ms-modal-bg {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0;
          opacity: 0; pointer-events: none;
          transition: opacity .3s;
        }
        .ms-modal-bg.open { opacity: 1; pointer-events: all; }

        @media (min-width: 600px) {
          .ms-modal-bg { align-items: center; padding: 1.5rem; }
        }

        /* ── MODAL ── */
        .ms-modal {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          width: 100%; max-width: 680px;
          border-radius: 28px 28px 0 0;
          max-height: 92vh; overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 -8px 60px rgba(0,0,0,0.5);
          transform: translateY(60px);
          transition: transform .38s cubic-bezier(.22,1,.36,1);
        }
        .ms-modal-bg.open .ms-modal { transform: translateY(0); }

        @media (min-width: 600px) {
          .ms-modal { border-radius: 24px; transform: scale(0.9) translateY(24px); }
          .ms-modal-bg.open .ms-modal { transform: scale(1) translateY(0); }
        }

        .ms-modal-handle {
          width: 40px; height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.15);
          margin: 14px auto 0;
        }
        @media (min-width: 600px) { .ms-modal-handle { display: none; } }

        /* ── SLIDER ── */
        .ms-slider { margin: 1.2rem 1.5rem 0; }

        .ms-slider-main {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          height: 320px;
        }
        @media (max-width: 480px) { .ms-slider-main { height: 220px; } }

        .ms-slider-img {
          width: 100%; height: 100%;
          object-fit: contain;
          display: block;
          background: rgba(0,0,0,0.2);
        }
        .ms-slider-fallback {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.7rem;
        }
        .ms-slider-fallback p {
          font-size: 0.8rem; color: rgba(255,255,255,0.3); font-weight: 500;
        }

        /* arrow buttons */
        .ms-arr {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s; z-index: 5;
        }
        .ms-arr:hover { background: rgba(0,0,0,0.7); }
        .ms-arr-l { left: 10px; }
        .ms-arr-r { right: 10px; }

        /* dot indicators */
        .ms-dots {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 5px; z-index: 5;
        }
        .ms-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none; padding: 0; cursor: pointer;
          transition: background .2s, transform .2s;
        }
        .ms-dot.active { background: #fff; transform: scale(1.3); }

        /* X close on slider */
        .ms-modal-x {
          position: absolute; top: 10px; right: 10px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s;
        }
        .ms-modal-x:hover { background: rgba(0,0,0,0.7); }
        .ms-modal-x svg { display: block; }

        /* thumbnail strip */
        .ms-thumbs {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.6rem;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: none;
        }
        .ms-thumbs::-webkit-scrollbar { display: none; }
        .ms-thumb-btn {
          flex-shrink: 0;
          width: 64px; height: 48px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          padding: 0; cursor: pointer;
          transition: border-color .2s, opacity .2s;
          opacity: 0.5;
          background: rgba(255,255,255,0.04);
        }
        .ms-thumb-btn.active { border-color: rgba(255,255,255,0.7); opacity: 1; }
        .ms-thumb-btn:hover { opacity: 0.85; }
        .ms-thumb-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ms-thumb-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }

        /* ── MODAL BODY ── */
        .ms-modal-body { padding: 1.4rem 1.5rem 2rem; }
        .ms-modal-top {
          display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem;
        }
        .ms-modal-ico {
          width: 48px; height: 48px; border-radius: 13px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ms-modal-ico svg { width: 23px; height: 23px; }
        .ms-modal-title { font-size: 1.18rem; font-weight: 700; color: #fff; line-height: 1.25; }
        .ms-modal-org   { font-size: 0.74rem; font-weight: 700; margin-top: 0.1rem; }
        .ms-modal-meta  {
          display: flex; gap: 0.5rem; margin-top: 0.25rem; flex-wrap: wrap;
        }
        .ms-modal-year {
          font-size: 0.68rem; font-weight: 700;
          color: rgba(255,255,255,0.35);
        }
        .ms-modal-cat {
          font-size: 0.65rem; font-weight: 700;
          padding: 0.18rem 0.55rem; border-radius: 999px;
          border: 1px solid; text-transform: uppercase; letter-spacing: 0.07em;
        }
        .ms-modal-desc {
          font-size: 0.9rem; color: rgba(255,255,255,0.52);
          font-weight: 500; line-height: 1.8; margin-bottom: 1.4rem;
        }
        .ms-modal-img-count {
          font-size: 0.72rem; font-weight: 700;
          color: rgba(255,255,255,0.3); margin-bottom: 0.8rem;
        }
        .ms-modal-close {
          width: 100%; padding: 0.72rem;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.65);
          cursor: pointer; transition: background .2s;
        }
        .ms-modal-close:hover { background: rgba(255,255,255,0.1); }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .ms-grid { grid-template-columns: 1fr; }
          .ms-modal-body { padding: 1.2rem 1.2rem 1.8rem; }
          .ms-slider { margin: 1rem 1.2rem 0; }
        }
        @media (max-width: 380px) {
          .ms-card-body { padding: 1.2rem 1.2rem 1rem; }
          .ms-card-thumbs { padding: 0 1.2rem 1.2rem; }
        }
      `}</style>

      <div className="container">
        {/* Section header */}
        <div className="sec-head">
          <p className="sec-tag">Journey</p>
          <h2 className="sec-h2 light">Milestones</h2>
          <p className="sec-lead light">
            Achievements, awards, and causes I've been part of along the way.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="ms-filters" role="group" aria-label="Filter milestones by category">
          {(["all", "achievement", "award", "volunteering"] as const).map((cat) => (
            <button
              key={cat}
              className={`ms-filter-btn${filter === cat ? " active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? "All" : categoryLabel[cat] + "s"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="ms-grid">
          {filtered.map((item, i) => {
            const p = palette[item.colorClass];
            return (
              <div
                key={i}
                className="ms-card"
                onClick={() => setSelected(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(item)}
                aria-label={`View details for ${item.title}`}
              >
                {/* Colored top bar */}
                <div className="ms-card-bar" style={{ background: p.bar }} />

                <div className="ms-card-body">
                  {/* Top row: icon + badges */}
                  <div className="ms-card-top">
                    <div className="ms-card-ico" style={{ background: p.bg }}>
                      <div style={{ color: p.icon }}>{item.icon}</div>
                    </div>
                    <div className="ms-card-badges">
                      <span
                        className="ms-card-cat"
                        style={{ background: p.bg, color: p.icon, borderColor: p.border }}
                      >
                        {categoryLabel[item.category]}
                      </span>
                      <span className="ms-card-year">{item.year}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div>
                    <p className="ms-card-title">{item.title}</p>
                    <p className="ms-card-org" style={{ color: p.icon }}>{item.org}</p>
                  </div>
                  <p className="ms-card-desc">{item.description}</p>
                </div>

                {/* Thumbnail strip */}
                <CardThumbs images={item.images} colorBar={p.bar} />

                {/* Hover overlay */}
                <div className="ms-card-view-overlay">
                  <span className="ms-card-view-pill">
                    <svg viewBox="0 0 24 24" fill="none" stroke={p.icon} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    View Details
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <div
        className={`ms-modal-bg${selected ? " open" : ""}`}
        onClick={() => setSelected(null)}
        role="dialog"
        aria-modal="true"
        aria-label={selected?.title}
      >
        {selected && (() => {
          const p = palette[selected.colorClass];
          return (
            <div
              className="ms-modal"
              ref={modalRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ms-modal-handle" />

              {/* Image slider + close button */}
              <div style={{ position: "relative" }}>
                <ImageSlider images={selected.images} title={selected.title} />
                <button
                  className="ms-modal-x"
                  style={{ top: "calc(1.2rem + 10px)", right: "calc(1.5rem + 10px)" }}
                  onClick={() => setSelected(null)}
                  aria-label="Close modal"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="ms-modal-body">
                {selected.images.length > 1 && (
                  <p className="ms-modal-img-count">{selected.images.length} images — use arrows or thumbnails to browse</p>
                )}

                <div className="ms-modal-top">
                  <div className="ms-modal-ico" style={{ background: p.bg }}>
                    <div style={{ color: p.icon }}>{selected.icon}</div>
                  </div>
                  <div>
                    <div className="ms-modal-title">{selected.title}</div>
                    <div className="ms-modal-org" style={{ color: p.icon }}>{selected.org}</div>
                    <div className="ms-modal-meta">
                      <span className="ms-modal-year">{selected.year}</span>
                      <span
                        className="ms-modal-cat"
                        style={{ background: p.bg, color: p.icon, borderColor: p.border }}
                      >
                        {categoryLabel[selected.category]}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="ms-modal-desc">{selected.description}</p>

                <button className="ms-modal-close" onClick={() => setSelected(null)}>
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
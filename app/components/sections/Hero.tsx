"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const photoRef = useRef<HTMLImageElement>(null);

  // Show photo if it loads; keep letter fallback otherwise
  useEffect(() => {
    const img = photoRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      img.style.display = "block";
    } else {
      img.onload = () => {
        img.style.display = "block";
      };
    }
  }, []);

  return (
    <>
      <style>{`
        /* ── HERO SHELL ── */
        .hero-v2 {
          background: linear-gradient(135deg, #EBF5F1 0%, #F4F6F8 55%, #EBF5F1 100%);
          padding: 0 5vw;
          overflow: hidden;
          position: relative;
        }

        /* ambient background blobs */
        .hero-v2::before {
          content: '';
          position: absolute;
          top: -120px; right: -120px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(18,169,126,0.10) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-v2::after {
          content: '';
          position: absolute;
          bottom: -80px; left: -60px;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(10,123,92,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── INNER GRID ── */
        .hero-v2-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 3rem;
          align-items: center;
          min-height: 92vh;
          padding: 80px 0 0;
          position: relative;
          z-index: 1;
        }

        /* ── LEFT: TEXT ── */
        .hero-v2-text {
          padding-bottom: 80px;
        }

        .hero-v2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.38rem 1rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--teal);
          margin-bottom: 1.6rem;
          box-shadow: var(--shadow-xs);
          letter-spacing: 0.02em;
        }
        .hero-v2-eyebrow .dot-ring {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 3px rgba(10,123,92,0.18);
          animation: pulseRing 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulseRing {
          0%,100% { box-shadow: 0 0 0 3px rgba(10,123,92,0.18); }
          50%      { box-shadow: 0 0 0 6px rgba(10,123,92,0.08); }
        }

        .hero-v2-h1 {
          font-size: clamp(2.4rem, 4.2vw, 3.7rem);
          font-weight: 700;
          line-height: 1.10;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .hero-v2-h1 em {
          color: var(--teal);
          font-style: normal;
          position: relative;
        }
        /* subtle underline accent on em */
        .hero-v2-h1 em::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--teal), var(--teal-light));
          border-radius: 2px;
          opacity: 0.35;
        }

        .hero-v2-sub {
          font-size: 1rem;
          color: var(--ink-muted);
          font-weight: 500;
          margin-bottom: 2.2rem;
          max-width: 460px;
          line-height: 1.75;
        }

        .hero-v2-btns {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2.8rem;
        }

        /* stack strip */
        .hero-stack-strip {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-stack-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--ink-muted);
          white-space: nowrap;
        }
        .hero-stack-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .stack-pill {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: var(--pill-radius);
          padding: 0.28rem 0.78rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--ink-mid);
          box-shadow: var(--shadow-xs);
          transition: border-color .2s, color .2s;
        }
        .stack-pill:hover {
          border-color: var(--teal);
          color: var(--teal);
        }

        /* ── RIGHT: PHOTO COLUMN ── */
        .hero-v2-visual {
          position: relative;
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Photo frame */
        .hero-photo-frame {
          position: relative;
          width: 320px;
          height: 380px;
          margin: 0 auto;
        }

        /* decorative bracket lines */
        .hero-photo-frame::before,
        .hero-photo-frame::after {
          content: '';
          position: absolute;
          width: 40px; height: 40px;
          border-color: var(--teal);
          border-style: solid;
          z-index: 2;
        }
        .hero-photo-frame::before {
          top: -10px; left: -10px;
          border-width: 3px 0 0 3px;
          border-radius: 6px 0 0 0;
        }
        .hero-photo-frame::after {
          bottom: -10px; right: -10px;
          border-width: 0 3px 3px 0;
          border-radius: 0 0 6px 0;
        }

        .hero-photo-inner {
          width: 100%; height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(160deg, var(--teal-mid) 0%, #A8E6CF 100%);
          position: relative;
          box-shadow: var(--shadow-lg);
        }

        /* Fallback letter shown when image absent */
        .hero-photo-letter {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 7rem;
          font-weight: 700;
          color: var(--teal);
          opacity: 0.25;
          user-select: none;
        }

        /* The actual photo — shown via JS; no bg, no border-radius needed */
        .hero-photo-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: none;          /* shown by JS when loaded */
          background: transparent;
        }

        /* decorative dot-grid */
        .hero-dot-grid {
          position: absolute;
          bottom: -24px; right: -28px;
          width: 80px; height: 80px;
          background-image: radial-gradient(circle, rgba(10,123,92,0.25) 1.5px, transparent 1.5px);
          background-size: 10px 10px;
          z-index: 0;
          pointer-events: none;
        }

        /* ── FLOATING CHIPS ── */
        .chip-v2 {
          position: absolute;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0.65rem 1rem;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
          z-index: 5;
        }
        .chip-v2 .ci { font-size: 1.15rem; }
        .chip-v2 .cs { font-size: 0.66rem; font-weight: 600; color: var(--ink-muted); }

        .chip-v2.cv1 { top: 30px; left: -50px; animation: chipFloat 4s ease-in-out infinite; }
        .chip-v2.cv2 { top: 48%; right: -44px; animation: chipFloat 4s ease-in-out infinite; animation-delay: -1.5s; }
        .chip-v2.cv3 { bottom: 48px; left: -36px; animation: chipFloat 4s ease-in-out infinite; animation-delay: -2.8s; }

        @keyframes chipFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }

        /* ── STAT BAND ── */
        .stat-band-v2 {
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 0 5vw;
        }
        .stat-band-v2-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-v2 {
          padding: 1.5rem 1rem;
          text-align: center;
          border-right: 1px solid var(--border);
          transition: background .2s;
          position: relative;
        }
        .stat-v2:last-child { border-right: none; }
        .stat-v2:hover { background: var(--teal-pale); }
        .stat-v2:hover .stat-v2-num { color: var(--teal-light); }
        .stat-v2-num {
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--teal);
          line-height: 1;
          transition: color .2s;
        }
        .stat-v2-lbl {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--ink-muted);
          margin-top: 0.3rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hero-v2-inner {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 60px 0 40px;
            gap: 2rem;
          }
          .hero-v2-text { padding-bottom: 0; order: 2; }

          /* Show visual, centre it, shrink the frame */
          .hero-v2-visual {
            display: flex;
            order: 1;
            justify-content: center;
            padding-top: 1rem;
          }
          .hero-photo-frame {
            width: 200px;
            height: 240px;
          }

          /* Hide chips on tablet — they overflow at this size */
          .chip-v2 { display: none; }

          .stat-band-v2-inner { grid-template-columns: repeat(2, 1fr); }
          .stat-v2:nth-child(2) { border-right: none; }
          .stat-v2:nth-child(3) { border-top: 1px solid var(--border); }
          .stat-v2:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
        }

        @media (max-width: 600px) {
          .hero-v2 { padding: 0 4vw; }
          .hero-v2-h1 { font-size: 2.15rem; }
          .hero-v2-sub { font-size: 0.93rem; }
          .hero-photo-frame { width: 160px; height: 196px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .chip-v2, .dot-ring { animation: none !important; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <header className="hero-v2" id="home">
        <div className="hero-v2-inner">

          {/* LEFT */}
          <div className="hero-v2-text">
            <div className="hero-v2-eyebrow">
              <span className="dot-ring" />
              Open to Internship &amp; Full-Time Roles
            </div>

            <h1 className="hero-v2-h1">
              MCA student crafting<br />
              <em>full-stack</em> &amp; <em>ML-powered</em><br />
              software
            </h1>

            <p className="hero-v2-sub">
              Final-year MCA student at GLS University, specialising in
              Python, PHP / Django, and applied machine learning. I build
              clean, scalable web applications and data-driven tools — and
              I'm actively looking for my first Software Developer role.
            </p>

            <div className="hero-v2-btns">
              <a href="#projects" className="btn btn-teal btn-lg">
                View Projects
              </a>
              <a href="/resume.pdf" className="btn btn-outline btn-lg" download>
                Download Résumé ↓
              </a>
            </div>

            <div className="hero-stack-strip">
              <span className="hero-stack-label">Comfortable with:</span>
              <div className="hero-stack-pills">
                {["Python", "PHP", "Django", "MySQL", "JavaScript", "ML"].map(t => (
                  <span className="stack-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-v2-visual">
            <div className="hero-photo-frame">
              <div className="hero-photo-inner">
                <span className="hero-photo-letter">A</span>
                <img
                  ref={photoRef}
                  src="/profile.jpeg"
                  alt="Amit Ghoyal"
                  className="hero-photo-img"
                />
              </div>
              <div className="hero-dot-grid" />
            </div>

            {/* Floating chips */}
            <div className="chip-v2 cv1">
              <span className="ci">🎓</span>
              <span>
                <div>MCA Final Year</div>
                <div className="cs">GLS University</div>
              </span>
            </div>

            <div className="chip-v2 cv2">
              <span className="ci">💻</span>
              <span>
                <div>2+ Projects</div>
                <div className="cs">Web · Full-Stack</div>
              </span>
            </div>

            <div className="chip-v2 cv3">
              <span className="ci">⭐</span>
              <span>
                <div>CGPA 9.25 / 10</div>
                <div className="cs">Academic Excellence</div>
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* ─── STAT BAND ─── */}
      <div className="stat-band-v2">
        <div className="stat-band-v2-inner">
          {[
            { num: "2+",   lbl: "Projects Built" },
            { num: "9.25", lbl: "MCA CGPA" },
            { num: "5+",   lbl: "Awards & Recognitions" },
            { num: "3",    lbl: "Languages Known" },
          ].map(s => (
            <div className="stat-v2" key={s.lbl}>
              <div className="stat-v2-num">{s.num}</div>
              <div className="stat-v2-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
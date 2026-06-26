"use client";

import { useState, useCallback } from "react";
import { Mail, Phone, MapPin, Copy, Check, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ── Data ─────────────────────────────────────────────────────────────────── */

const INFO = {
  name:     "Amit Ghoyal",
  role:     "Full-Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  email:    "amittghoyal@gmail.com",
  phone:    "+91 9510360227",
  linkedin: { label: "amit-ghoyal", href: "https://www.linkedin.com/in/amit-ghoyal-136858393/" },
  github:   { label: "amitghoyal",  href: "https://github.com/amitghoyal" },
};

/* ── Toast hook ───────────────────────────────────────────────────────────── */

type Toast = { id: number; message: string };

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  return { toasts, show };
}

/* ── Copy helper ──────────────────────────────────────────────────────────── */

function useCopy(showToast: (msg: string) => void) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(
    (text: string, label: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(label);
        showToast(`${label} copied`);
        setTimeout(() => setCopied(null), 2000);
      });
    },
    [showToast]
  );

  return { copied, copy };
}

/* ── Component ────────────────────────────────────────────────────────────── */

export default function Contact() {
  const { toasts, show } = useToast();
  const { copied, copy } = useCopy(show);

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        /* Reset */
        .cs-section *, .cs-section *::before, .cs-section *::after { box-sizing: border-box; }

        /* Section */
        .cs-section {
          padding: 6rem 1.25rem 5rem;
          width: 100%;
        }
        .cs-container {
          max-width: 760px;
          margin: 0 auto;
        }

        /* Header */
        .cs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #0c6b4e;
          background: #d1fae5;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 1.1rem;
        }
        .cs-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          animation: cs-blink 2s ease-in-out infinite;
        }
        @keyframes cs-blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .cs-headline {
          font-size: clamp(30px, 5.5vw, 44px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.025em;
          color: #0f172a;
          margin: 0 0 .75rem;
        }
        .cs-lead {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 440px;
          margin: 0 0 2.5rem;
        }

        /* Card */
        .cs-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          overflow: hidden;
        }

        /* Identity strip */
        .cs-identity {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 2rem 2rem 1.75rem;
          border-bottom: 1px solid #f1f5f9;
          flex-wrap: wrap;
        }
        .cs-avatar {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border: 2px solid #6ee7b7;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 700;
          color: #065f46;
          flex-shrink: 0;
          letter-spacing: .01em;
          position: relative;
        }
        .cs-avatar-badge {
          position: absolute;
          bottom: 1px; right: 1px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #fff;
        }
        .cs-id-name {
          font-size: 21px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 2px;
          letter-spacing: -.015em;
        }
        .cs-id-role {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 6px;
          font-weight: 500;
        }
        .cs-id-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }
        .cs-loc {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #94a3b8;
        }
        .cs-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #065f46;
          background: #d1fae5;
          padding: 3px 10px 3px 8px;
          border-radius: 100px;
        }

        /* Grid of tiles */
        .cs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: #f1f5f9;
          border-bottom: 1px solid #f1f5f9;
        }
        .cs-tile {
          background: #ffffff;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background .12s;
        }
        .cs-tile:hover { background: #fafafa; }
        .cs-tile-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          display: flex; align-items: center; justify-content: center;
          color: #475569;
          flex-shrink: 0;
        }
        .cs-tile-body { flex: 1; min-width: 0; }
        .cs-tile-label {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: #94a3b8;
          margin-bottom: 3px;
        }
        .cs-tile-value {
          font-size: 14px;
          font-weight: 500;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cs-tile-value a {
          color: #0f172a;
          text-decoration: none;
        }
        .cs-tile-value a:hover { color: #059669; }

        /* Copy button */
        .cs-copy {
          flex-shrink: 0;
          width: 30px; height: 30px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #94a3b8;
          transition: all .13s;
          padding: 0;
        }
        .cs-copy:hover { background: #f1f5f9; color: #334155; border-color: #cbd5e1; }
        .cs-copy.done { color: #059669; border-color: #6ee7b7; background: #d1fae5; }

        /* CTA footer */
        .cs-footer {
          padding: 1.5rem 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .cs-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          background: #0f172a;
          color: #fff;
          border-radius: 12px;
          font-size: 14px; font-weight: 600;
          text-decoration: none;
          border: none; cursor: pointer;
          transition: background .15s, transform .1s;
          letter-spacing: -.01em;
        }
        .cs-btn-primary:hover { background: #1e293b; transform: translateY(-1px); }
        .cs-btn-primary:active { transform: translateY(0); }

        .cs-btn-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 11px 18px;
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px; font-weight: 500;
          text-decoration: none;
          transition: background .12s, border-color .12s, transform .1s;
          letter-spacing: -.01em;
        }
        .cs-btn-ghost:hover { background: #f8fafc; border-color: #cbd5e1; transform: translateY(-1px); }
        .cs-btn-ghost:active { transform: translateY(0); }

        /* ── Toast portal ── */
        .cs-toast-portal {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 9999;
          pointer-events: none;
        }
        .cs-toast {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: #fff;
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 13.5px;
          font-weight: 500;
          white-space: nowrap;
          animation: cs-toast-in .2s cubic-bezier(.34,1.56,.64,1) forwards;
          letter-spacing: -.01em;
        }
        .cs-toast-icon {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #10b981;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @keyframes cs-toast-in {
          from { opacity: 0; transform: translateY(10px) scale(.92); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .cs-section { padding: 4rem 1rem 3.5rem; }
          .cs-identity { padding: 1.5rem 1.25rem; gap: 1rem; }
          .cs-avatar { width: 56px; height: 56px; font-size: 19px; }
          .cs-id-name { font-size: 18px; }
          .cs-grid { grid-template-columns: 1fr; }
          .cs-tile { padding: 1rem 1.25rem; }
          .cs-tile-value { font-size: 13.5px; }
          .cs-footer { padding: 1.25rem 1.25rem; }
          .cs-btn-primary, .cs-btn-ghost { flex: 1; justify-content: center; padding: 12px 14px; }
        }
        @media (max-width: 380px) {
          .cs-headline { font-size: 26px; }
          .cs-tile-value { font-size: 12.5px; }
        }
      `}</style>

      {/* ── Toast layer ── */}
      <div className="cs-toast-portal" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className="cs-toast" role="status">
            <span className="cs-toast-icon">
              <Check size={11} strokeWidth={3} aria-hidden="true" />
            </span>
            {t.message}
          </div>
        ))}
      </div>

      {/* ── Section ── */}
      <section className="cs-section" id="contact">
        <div className="cs-container">

          {/* Header */}
          <div className="cs-eyebrow">
            <span className="cs-eyebrow-dot" aria-hidden="true" />
            Get in touch
          </div>
          <h2 className="cs-headline">Let's build something<br />together</h2>
          <p className="cs-lead">
            Have a role in mind, or just want to say hi?
            My inbox is always open.
          </p>

          {/* Card */}
          <div className="cs-card">

            {/* Identity */}
            <div className="cs-identity">
              <div className="cs-avatar" aria-hidden="true">
                AG
                <span className="cs-avatar-badge" />
              </div>
              <div>
                <p className="cs-id-name">{INFO.name}</p>
                <p className="cs-id-role">{INFO.role}</p>
                <div className="cs-id-meta">
                  <span className="cs-loc">
                    <MapPin size={13} aria-hidden="true" />
                    {INFO.location}
                  </span>
                  <span className="cs-status">
                    <span className="cs-eyebrow-dot" aria-hidden="true" />
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="cs-grid">

              {/* Email */}
              <div className="cs-tile">
                <div className="cs-tile-icon"><Mail size={17} aria-hidden="true" /></div>
                <div className="cs-tile-body">
                  <div className="cs-tile-label">Email</div>
                  <div className="cs-tile-value">
                    <a href={`mailto:${INFO.email}`}>{INFO.email}</a>
                  </div>
                </div>
                <button
                  type="button"
                  className={`cs-copy${copied === "Email" ? " done" : ""}`}
                  onClick={() => copy(INFO.email, "Email")}
                  aria-label="Copy email address"
                >
                  {copied === "Email"
                    ? <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    : <Copy size={13} aria-hidden="true" />
                  }
                </button>
              </div>

              {/* Phone */}
              <div className="cs-tile">
                <div className="cs-tile-icon"><Phone size={17} aria-hidden="true" /></div>
                <div className="cs-tile-body">
                  <div className="cs-tile-label">Phone</div>
                  <div className="cs-tile-value">
                    <a href={`tel:+919510360227`}>{INFO.phone}</a>
                  </div>
                </div>
                <button
                  type="button"
                  className={`cs-copy${copied === "Phone" ? " done" : ""}`}
                  onClick={() => copy(INFO.phone, "Phone")}
                  aria-label="Copy phone number"
                >
                  {copied === "Phone"
                    ? <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    : <Copy size={13} aria-hidden="true" />
                  }
                </button>
              </div>

              {/* LinkedIn */}
              <div className="cs-tile">
                <div className="cs-tile-icon"><FaLinkedin size={17} aria-hidden="true" /></div>
                <div className="cs-tile-body">
                  <div className="cs-tile-label">LinkedIn</div>
                  <div className="cs-tile-value">
                    <a href={INFO.linkedin.href} target="_blank" rel="noopener noreferrer">
                      {INFO.linkedin.label}
                    </a>
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="cs-tile">
                <div className="cs-tile-icon"><FaGithub size={17} aria-hidden="true" /></div>
                <div className="cs-tile-body">
                  <div className="cs-tile-label">GitHub</div>
                  <div className="cs-tile-value">
                    <a href={INFO.github.href} target="_blank" rel="noopener noreferrer">
                      {INFO.github.label}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA footer */}
            <div className="cs-footer">
              <a className="cs-btn-primary" href={`mailto:${INFO.email}`}>
                <Mail size={15} aria-hidden="true" />
                Send an email
              </a>
              <a
                className="cs-btn-ghost"
                href={INFO.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={15} aria-hidden="true" />
                LinkedIn
                <ExternalLink size={11} aria-hidden="true" />
              </a>
              <a
                className="cs-btn-ghost"
                href={INFO.github.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={15} aria-hidden="true" />
                GitHub
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
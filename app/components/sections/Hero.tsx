export default function Hero() {
  return (
    <>
      <header className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              Available for Internship & Full-Time Roles
            </div>

            <h1 className="hero-h1">
              MCA student building <em>full-stack</em> &{" "}
              <em>ML-powered</em> software
            </h1>

            <p className="hero-sub">
              Final-year Master of Computer Applications student at GLS
              University, specializing in Python, PHP/Django, and applied
              machine learning. I build clean, scalable web applications and
              data-driven tools — and I'm looking for my first full-time
              Software Developer role.
            </p>

            <div className="hero-btns">
              <a href="#projects" className="btn btn-teal btn-lg">
                View My Projects
              </a>

              <a
                href="/resume.pdf"
                className="btn btn-outline btn-lg"
                download
              >
                Download Résumé
              </a>
            </div>

            <div className="hero-trusted">
              Comfortable across:
              <div className="trusted-logos">
                <span className="trusted-logo">Python</span>
                <span className="trusted-logo">PHP</span>
                <span className="trusted-logo">Django</span>
                <span className="trusted-logo">MySQL</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-img-wrap">
              <div className="hero-avatar-circle">
                <span className="hero-avatar-letter">A</span>

                {/* Later we'll replace with your photo */}
                {/* <img
                  src="/profile.jpg"
                  alt="Amit Ghoyal"
                  className="hero-avatar-photo"
                /> */}
              </div>
            </div>

            <div className="float-chip fc1">
              <span className="chip-icon">🎓</span>
              <span>
                <div>MCA Final Year</div>
                <div className="chip-sub">GLS University</div>
              </span>
            </div>

            <div className="float-chip fc2">
              <span className="chip-icon">💻</span>
              <span>
                <div>2+ Projects</div>
                <div className="chip-sub">Web · Full-Stack</div>
              </span>
            </div>

            <div className="float-chip fc3">
              <span className="chip-icon">⭐</span>
              <span>
                <div>CGPA 9.25/10</div>
                <div className="chip-sub">
                  Academic Excellence
                </div>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="stat-band">
        <div className="stat-band-inner">
          <div className="stat-item">
            <div className="stat-num">2+</div>
            <div className="stat-lbl">Projects Built</div>
          </div>

          <div className="stat-item">
            <div className="stat-num">9.25</div>
            <div className="stat-lbl">MCA CGPA</div>
          </div>

          <div className="stat-item">
            <div className="stat-num">5+</div>
            <div className="stat-lbl">
              Awards & Recognitions
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-num">3</div>
            <div className="stat-lbl">Languages Known</div>
          </div>
        </div>
      </div>
    </>
  );
}
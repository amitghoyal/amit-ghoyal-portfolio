export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Academic Journey</p>
          <h2 className="sec-h2">Education & Qualifications</h2>
          <p className="sec-lead">
            From schooling to my final year of MCA.
          </p>
        </div>

        <div className="timeline-wrap">

          {/* MCA */}
          <div className="tl-item sr-l up">
            <div className="tl-card">
              <div className="tl-year">2025 – Current</div>

              <div className="tl-degree">
                Master of Computer Applications (MCA)
              </div>

              <div className="tl-inst">
                GLS University, Ahmedabad
              </div>

              <p className="tl-desc">
                Specializing in software engineering, database systems,
                and machine learning. Coursework includes advanced
                programming, DBMS, and applied data science.
              </p>

              <span className="tl-badge">
                CGPA: 9.25/10
              </span>
            </div>
          </div>

          {/* BCA */}
          <div className="tl-item alt sr-l d1 up">
            <div className="tl-card">
              <div className="tl-year">2022 – 2025</div>

              <div className="tl-degree">
                Bachelor of Computer Applications (BCA)
              </div>

              <div className="tl-inst">
                Veer Narmad South Gujarat University, Surat
              </div>

              <p className="tl-desc">
                Built a strong foundation in programming,
                data structures, and database management,
                while completing several academic mini-projects.
              </p>

              <span className="tl-badge gold">
                CGPA: 8.12/10
              </span>
            </div>
          </div>

          {/* XII */}
          <div className="tl-item sr-l d2 up">
            <div className="tl-card">
              <div className="tl-year">2022</div>

              <div className="tl-degree">
                Senior Secondary (XII) — Commerce
              </div>

              <div className="tl-inst">
                Sarswati Vidyalaya, Surat (GSHEB)
              </div>

              <p className="tl-desc">
                Completed higher secondary education with a focus
                on commerce and computer applications.
              </p>

              <span className="tl-badge">
                XX%
              </span>
            </div>
          </div>

          {/* X */}
          <div className="tl-item alt sr-l d3 up">
            <div className="tl-card">
              <div className="tl-year">2020</div>

              <div className="tl-degree">
                Secondary (X)
              </div>

              <div className="tl-inst">
                Suman High School No. 2, Surat
              </div>

              <p className="tl-desc">
                Completed secondary schooling with consistent
                academic performance.
              </p>

              <span className="tl-badge gold">
                XX%
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
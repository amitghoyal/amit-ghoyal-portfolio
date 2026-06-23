const projects = [
  {
    title: "MittiSafar — Rural Tourism & Employment Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack",
    emoji: "🌾",
    description:
      "Connects travelers with rural hosts via OTP-secured booking, host registration, and integrated payments.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    delay: "",
  },
  {
    title: "Aakar Creatives — Online Gifting Website",
    category: "web",
    categoryLabel: "Web Dev",
    emoji: "🎁",
    description:
      "Responsive product catalog and inquiry system for a customized-gifting business.",
    tags: ["PHP", "HTML/CSS", "Bootstrap"],
    delay: "d1",
  },
  {
    title: "Personal Portfolio Website",
    category: "web",
    categoryLabel: "Web Dev",
    emoji: "🌐",
    description:
      "Custom-built responsive portfolio with project gallery and animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    delay: "d2",
  },
];

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <div className="sec-head sec-head-row">
          <div>
            <p className="sec-tag">Selected Work</p>

            <h2 className="sec-h2">Projects</h2>

            <p className="sec-lead">
              Click any card for details. Filter by type below.
            </p>
          </div>

          <a
            href="https://github.com/"
            className="view-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            All Projects on GitHub →
          </a>
        </div>

        <div className="work-filters">
          <button className="wf-btn on">All</button>
          <button className="wf-btn">Web Dev</button>
          <button className="wf-btn">Full-Stack</button>
        </div>

        <div className="work-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`work-card sr up ${project.delay}`}
            >
              <div className="wc-thumb">
                <div className={`wc-thumb-bg cat-${project.category}`}></div>

                <span className="wc-emoji">
                  {project.emoji}
                </span>

                <span className="wc-cat">
                  {project.categoryLabel}
                </span>

                <div className="wc-hover-overlay">
                  <span className="wc-view">
                    View Details →
                  </span>
                </div>
              </div>

              <div className="wc-body">
                <h3 className="wc-title">
                  {project.title}
                </h3>

                <p className="wc-desc">
                  {project.description}
                </p>

                <div className="wc-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="wc-tag"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
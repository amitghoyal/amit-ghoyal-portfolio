const highlights = [
  {
    icon: "🎓",
    title: "MCA Final Year",
    subtitle: "GLS University",
  },
  {
    icon: "⭐",
    title: "CGPA 9.25",
    subtitle: "Academic Excellence",
  },
  {
    icon: "💻",
    title: "Full Stack Developer",
    subtitle: "Python • PHP • Django",
  },
  {
    icon: "🏆",
    title: "5+ Awards",
    subtitle: "Leadership & Competitions",
  },
];

const skills = [
  "Python",
  "PHP",
  "Java",
  "C/C++",
  "Django",
  "JavaScript",
  "MySQL",
  "MongoDB",
  "Bootstrap",
  "REST APIs",
  "Git",
  "GitHub",
  "Linux",
  "AWS",
  "Power BI",
  "Scikit-Learn",
];

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">

        <div className="sec-head">
          <p className="sec-tag">Who I Am</p>
          <h2 className="sec-h2">About Me</h2>
          <p className="sec-lead">
            A passionate MCA student building software solutions and preparing
            for a career in technology.
          </p>
        </div>

        <div className="about-modern">

          {/* Left Side */}
          <div className="about-profile">

            <div className="profile-card">
              <div className="profile-avatar">
                A
              </div>

              <h3>Amit Ghoyal</h3>

              <p>MCA Final Year Student</p>

              <span>GLS University</span>
            </div>

            <div className="highlight-grid">
              {highlights.map((item, index) => (
                <div className="highlight-card" key={index}>
                  <div className="highlight-icon">
                    {item.icon}
                  </div>

                  <h4>{item.title}</h4>

                  <p>{item.subtitle}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side */}
          <div className="about-content">

            <p>
              I'm Amit Ghoyal, a final-year MCA student at GLS University,
              Ahmedabad, with a strong foundation in programming,
              database management, and machine learning.
            </p>

            <p>
              My experience spans web development, backend engineering,
              relational database design, and applied machine learning.
              I enjoy building software that solves real-world problems and
              delivers a great user experience.
            </p>

            <p>
              Currently seeking Software Developer opportunities where I can
              contribute, learn from experienced engineers, and build scalable
              products.
            </p>

            <div className="skill-section">
              <h3>Technical Skills</h3>

              <div className="about-skills">
                {skills.map((skill) => (
                  <span className="skill-pill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
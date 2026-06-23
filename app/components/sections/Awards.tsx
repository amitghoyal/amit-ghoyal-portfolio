import {
  Trophy,
  Music4,
  Medal,
} from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "Bloggers Paradise Competition — 1st Prize",
    org: "Inter-College Blogging Competition",
    year: "2024",
    description:
      "Won 1st place for creative and impactful content writing.",
    delay: "",
  },
  {
    icon: Music4,
    title: "College Group Dance Competition — 1st Prize",
    org: "College Annual Function",
    year: "2024",
    description:
      "Secured 1st position as part of the college team during the Annual Function.",
    delay: "d1",
  },
  {
    icon: Medal,
    title: "Advertisement Making Competition — 1st Runner-Up",
    org: "Inter-College Competition",
    year: "2024",
    description:
      "Achieved 1st Runner-Up position by developing a creative and engaging advertisement campaign.",
    delay: "d2",
  },
];

export default function Awards() {
  return (
    <section
      className="section section-dark"
      id="awards"
    >
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">
            Recognition
          </p>

          <h2 className="sec-h2 light">
            Awards
          </h2>

          <p className="sec-lead light">
            Competitions and recognitions I'm proud of.
          </p>
        </div>

        <div className="awards-grid">
          {awards.map((award, index) => {
            const Icon = award.icon;

            return (
              <div
                key={index}
                className={`award-card sr up ${award.delay}`}
              >
                <div className="award-icon-wrap">
                  <Icon size={24} />
                </div>

                <div className="award-title">
                  {award.title}
                </div>

                <div className="award-org">
                  {award.org}
                </div>

                <div className="award-year">
                  {award.year}
                </div>

                <p className="award-desc">
                  {award.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
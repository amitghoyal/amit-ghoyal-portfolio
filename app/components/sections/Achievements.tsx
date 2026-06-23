import {
  Crown,
  GraduationCap,
  Users,
} from "lucide-react";

const achievements = [
  {
    icon: Crown,
    className: "t",
    title: "Best Leader Award",
    description:
      "Recognized for outstanding leadership, team management, and contribution to club activities and events — Trendsetters Marketing Club, 2025.",
    delay: "",
  },
  {
    icon: GraduationCap,
    className: "g",
    title: "Academic Excellence Award",
    description:
      "Awarded for exceptional academic performance and securing top ranks during the 2023–24 academic year.",
    delay: "d1",
  },
  {
    icon: Users,
    className: "i",
    title: "Team Collaboration & Soft Skills",
    description:
      "Problem-Solving · Team Collaboration · Communication · Time Management · Adaptability · Analytical Thinking.",
    delay: "d2",
  },
];

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Milestones</p>

          <h2 className="sec-h2">
            Achievements & Extra-Curricular
          </h2>

          <p className="sec-lead">
            Things I've completed, contributed to,
            or earned along the way.
          </p>
        </div>

        <div className="ach-grid">
          {achievements.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`ach-card sr up ${item.delay}`}
              >
                <div className={`ach-ico ${item.className}`}>
                  <Icon size={22} />
                </div>

                <div className="ach-body">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
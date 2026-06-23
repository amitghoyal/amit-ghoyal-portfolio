"use client";

import { useState } from "react";

type Memory = {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
};

const memories: Memory[] = [
  {
    title: "Best Leader Award",
    date: "2025",
    category: "Leadership",
    image: "/memories/leader-award.jpg",
    description:
      "Received Best Leader Award for outstanding leadership, team management, and contribution to club activities.",
  },
  {
    title: "Academic Excellence Award",
    date: "2024",
    category: "Academics",
    image: "/memories/academic-award.jpg",
    description:
      "Recognized for excellent academic performance and securing top ranks.",
  },
  {
    title: "Bloggers Paradise Winner",
    date: "2024",
    category: "Competition",
    image: "/memories/blogging.jpg",
    description:
      "Won 1st Prize in the Inter-College Bloggers Paradise Competition.",
  },
  {
    title: "Group Dance Competition",
    date: "2024",
    category: "Cultural",
    image: "/memories/dance.jpg",
    description:
      "Secured 1st Position in Group Dance Competition during Annual Function.",
  },
  {
    title: "Advertisement Competition",
    date: "2024",
    category: "Creativity",
    image: "/memories/advertisement.jpg",
    description:
      "Achieved 1st Runner-Up in Advertisement Making Competition.",
  },
  {
    title: "College Event",
    date: "2024",
    category: "Events",
    image: "/memories/event.jpg",
    description:
      "Participated in various college events and leadership activities.",
  },
];

export default function Memories() {
  const [selected, setSelected] = useState<Memory | null>(null);

  return (
    <section className="section section-alt" id="memories">
      <div className="container">
        <div className="sec-head">
          <p className="sec-tag">Memories</p>

          <h2 className="sec-h2">
            Winning Moments & Memories
          </h2>

          <p className="sec-lead">
            A collection of achievements, celebrations,
            competitions, and unforgettable experiences.
          </p>
        </div>

        <div className="memory-masonry">
          {memories.map((memory, index) => (
            <div
              key={index}
              className="memory-card"
              onClick={() => setSelected(memory)}
            >
              <img
                src={memory.image}
                alt={memory.title}
              />

              <div className="memory-overlay">
                <span className="memory-badge">
                  {memory.category}
                </span>

                <h3>{memory.title}</h3>

                <p>{memory.date}</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div
            className="memory-modal"
            onClick={() => setSelected(null)}
          >
            <div
              className="memory-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="memory-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              <img
                src={selected.image}
                alt={selected.title}
              />

              <div className="memory-info">
                <h3>{selected.title}</h3>

                <span>{selected.date}</span>

                <p>{selected.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
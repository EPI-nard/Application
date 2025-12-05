"use client";

import { useMemo, useState } from "react";
import { quests, levelFromXp } from "../data/nirdData";

const categories = [
  "All",
  "Exploration",
  "Linux",
  "Pedagogie",
  "Communautaire",
  "Technique",
  "Materiel",
] as const;
const difficulties = ["All", "Starter", "Intermediaire", "Expert"] as const;

type Category = (typeof categories)[number];
type Difficulty = (typeof difficulties)[number];

export default function QuestsPage() {
  const [category, setCategory] = useState<Category>("All");
  const [difficulty, setDifficulty] = useState<Difficulty>("All");

  const filtered = useMemo(() => {
    return quests.filter((quest) => {
      const matchCat = category === "All" || quest.category === category;
      const matchDiff = difficulty === "All" || quest.difficulty === difficulty;
      return matchCat && matchDiff;
    });
  }, [category, difficulty]);

  const totalXp = filtered.reduce((sum, q) => sum + q.xp, 0);

  return (
    <div>
      <div className="section-title">
        <span className="eyebrow">XP & niveaux</span>
        <h1>Quetes NIRD gamifiees</h1>
      </div>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="filters">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficulty(diff)}
            className={difficulty === diff ? "active" : ""}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="highlight">
        <div className="card">
          <div className="badge">XP en vue</div>
          <strong>{totalXp} XP</strong>
          <div className="muted">Quêtes sélectionnées</div>
        </div>
        <div className="card">
          <div className="badge">Niveau estimé</div>
          <strong>Niveau {levelFromXp(totalXp)}</strong>
          <div className="muted">120 / 240 / 400 XP</div>
        </div>
      </div>

      <div className="quest-board">
        {filtered.map((quest) => (
          <div key={quest.id} className="card quest-card">
            <div className="quest-meta">
              <span className="badge">{quest.category}</span>
              <span className="tag">XP {quest.xp}</span>
              <span className="tag">{quest.difficulty}</span>
            </div>
            <h3>{quest.title}</h3>
            <p className="muted">{quest.summary}</p>
            <div className="quest-meta">
              {quest.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <ol className="quest-steps">
              {quest.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="divider"></div>
            <div className="badge" id="reward">
              Récompense : {quest.reward}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

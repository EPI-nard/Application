"use client";

import Link from "next/link";
import {
  journey,
  pillars,
  quests,
  resources,
  levelFromXp,
} from "./data/nirdData";
import { useState } from "react";

export default function HomePage() {
  const totalXp = quests.reduce((sum, quest) => sum + quest.xp, 0);
  const [expandedPillars, setExpandedPillars] = useState<string[]>([]);

  const togglePillar = (title: string) => {
    setExpandedPillars((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div>
      <section className="hero">
        <div className="section-title">
          <h1>NIRD Quest : XP, quêtes et missions libres</h1>
        </div>
        <p className="muted">
          Basé sur les contenus officiels NIRD : numérique Libre, Inclusif,
          Responsable, Durable. Quêtes gamifiées pour passer de la mobilisation
          à l'intégration (Linux + réemploi) et faire grandir la communauté.
        </p>
        <div className="hero-actions">
          <Link className="cta" href="/quests">
            Lancer les quêtes
          </Link>
          <Link className="cta secondary" href="/missions">
            Voir les missions
          </Link>
          <Link className="cta secondary" href="/learn">
            Comprendre la démarche
          </Link>
        </div>
        <div className="highlight">
          <div className="card">
            <div className="badge">XP total</div>
            <strong>{totalXp} XP</strong>
            <div className="muted">Cumulé des quêtes publiées</div>
          </div>
          <div className="card">
            <div className="badge">Niveaux</div>
            <strong>1 → {levelFromXp(totalXp)}</strong>
            <div className="muted">Calculé auto : 120 / 240 / 400 XP</div>
          </div>
          <div className="card">
            <div className="badge">Socle</div>
            <strong>Linux + Réemploi</strong>
            <div className="muted">Levier principal de la démarche NIRD</div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="section-title">
          <span className="eyebrow">Valeurs</span>
          <h2>Les trois piliers</h2>
        </div>
        {/* <div className='grid'> */}
        {pillars.map((pillar) => {
          const isExpanded = expandedPillars.includes(pillar.title);
          return (
            <div
              key={pillar.title}
              className="card pillar-card"
              onClick={(e) => {
                e.stopPropagation();
                togglePillar(pillar.title);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="badge">{pillar.title}</div>
              {isExpanded && (
                <>
                  <p>{pillar.description}</p>
                  <ul className="pillar-actions">
                    {pillar.actions.map((action) => (
                      <li key={action} className="muted">
                        {action}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="expand-indicator">{isExpanded ? "−" : "+"}</div>
            </div>
          );
        })}
        {/* </div> */}
      </section>

      <section className="journey">
        <div className="section-title">
          <span className="eyebrow">Jalons officiels</span>
          <h2>Mobilisation - Expérimentation - Intégration</h2>
        </div>
        <div className="timeline">
          {journey.map((step) => (
            <div key={step.title} className="timeline-step card">
              <div className="tag">{step.phase}</div>
              <h3>{step.title}</h3>
              <p className="muted">{step.description}</p>
              <ul>
                {step.outcomes.map((outcome) => (
                  <li key={outcome} className="muted">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="resources">
        <div className="section-title">
          <span className="eyebrow">Ressources NIRD</span>
          <h2>Liens officiels</h2>
        </div>
        <div className="grid">
          {resources.map((resource) => (
            <a
              key={resource.label}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="card resource-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="badge">{resource.label}</div>
              <p>{resource.text}</p>
              <span style={{ color: "var(--accent-2)", marginTop: "auto" }}>
                Ouvrir le lien →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

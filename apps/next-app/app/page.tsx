"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  journey,
  pillars,
  quests,
  resources,
  levelFromXp,
} from "./data/nirdData";
import IntroAnimation from "./IntroAnimation"; // 👈 ICI

export default function HomePage() {
  const totalXp = quests.reduce((sum, quest) => sum + quest.xp, 0);
  const [expandedPillars, setExpandedPillars] = useState<string[]>([]);

  const [clickStep, setClickStep] = useState(0); // 0 = normal, 1-4 = coins
  const [showModal, setShowModal] = useState(false);

  const logicQuestions = [
    "Si un escargot court plus vite qu'un TGV, que dois-tu arrêter de boire ?",
    "Combien de bits faut-il pour stocker une bêtise infinie ?",
    "Si 42 est la réponse, quelle était déjà la question ?",
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  const [netQuestionPhase, setNetQuestionPhase] = useState(false);
  const [netAnswer, setNetAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const NUIT_INFO_START_YEAR = 2007;

  const togglePillar = (title: string) => {
    setExpandedPillars((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const goldbergStyle: React.CSSProperties = {};
  if (clickStep === 1) {
    Object.assign(goldbergStyle, {
      position: "fixed",
      top: "16px",
      left: "16px",
    });
  } else if (clickStep === 2) {
    Object.assign(goldbergStyle, {
      position: "fixed",
      top: "16px",
      right: "16px",
    });
  } else if (clickStep === 3) {
    Object.assign(goldbergStyle, {
      position: "fixed",
      bottom: "16px",
      left: "16px",
    });
  } else if (clickStep === 4) {
    Object.assign(goldbergStyle, {
      position: "fixed",
      bottom: "16px",
      right: "16px",
    });
  }

  const handleGoldbergClick = () => {
    if (clickStep < 4) {
      setClickStep((prev) => prev + 1);
      return;
    }
    if (!showModal) {
      setShowModal(true);
    }
  };

  const handleLogicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnswer("");
    setErrorMessage("");

    if (questionIndex < logicQuestions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setNetQuestionPhase(true);
    }
  };

  const handleNetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = netAnswer.trim();
    if (trimmed === NUIT_INFO_START_YEAR.toString()) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    } else {
      setErrorMessage(
        "Pas tout à fait… vérifie bien : la Nuit de l'Info existe en France depuis 2007. 😉"
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IntroAnimation />

      <div>
        <section className="hero">
          <div className="section-title">
            <button
              id="goldberg"
              style={goldbergStyle}
              onClick={handleGoldbergClick}
            >
              NIRD
            </button>
            <h1> Quest : XP, quêtes et missions libres</h1>
          </div>
          <p className="muted">
            Basé sur les contenus officiels NIRD : numérique Libre, Inclusif,
            Responsable, Durable. Quêtes gamifiées pour passer de la mobilisation
            à l&apos;intégration (Linux + réemploi) et faire grandir la
            communauté.
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

        {showModal && (
          <div className="goldberg-overlay" onClick={closeModal}>
            <div
              className="goldberg-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {!netQuestionPhase ? (
                <>
                  <h3>Machine de Rube Goldberg NIRD 🤡</h3>
                  <p className="muted">{logicQuestions[questionIndex]}</p>
                  <form onSubmit={handleLogicSubmit}>
                    <input
                      className="goldberg-input"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Réponds n'importe quoi, ça ira très bien."
                    />
                    <div className="goldberg-actions">
                      <button
                        type="submit"
                        className="cta secondary"
                        style={{ padding: "8px 14px", fontSize: 14 }}
                      >
                        Valider cette grande réflexion
                      </button>
                    </div>
                  </form>
                  <p className="goldberg-helper">
                    Progrès : {questionIndex + 1} / {logicQuestions.length}
                  </p>
                </>
              ) : (
                <>
                  <h3>Étape finale (totalement gratuite)</h3>
                  <p>
                    Maintenant, va chercher sur le net :{" "}
                    <strong>
                      « Depuis quand a lieu la Nuit de l&apos;Info en France ? »
                    </strong>
                  </p>
                  <p className="muted">
                    Quand tu as trouvé, tape juste l&apos;année ci-dessous.
                  </p>
                  <form onSubmit={handleNetSubmit}>
                    <input
                      className="goldberg-input"
                      value={netAnswer}
                      onChange={(e) => setNetAnswer(e.target.value)}
                      placeholder="Indice : c'est avant 2010…"
                    />
                    <div className="goldberg-actions">
                      <button
                        type="submit"
                        className="cta"
                        style={{ padding: "8px 14px", fontSize: 14 }}
                      >
                        C&apos;est bon, je l&apos;ai !
                      </button>
                      <button
                        type="button"
                        className="cta secondary"
                        style={{ padding: "8px 14px", fontSize: 14 }}
                        onClick={closeModal}
                      >
                        Abandonner
                      </button>
                    </div>
                  </form>
                  {errorMessage && (
                    <p className="goldberg-helper" style={{ color: "#f97316" }}>
                      {errorMessage}
                    </p>
                  )}
                  <p className="goldberg-helper">
                    Pour info : la Nuit de l&apos;Info existe en France depuis{" "}
                    <strong>{NUIT_INFO_START_YEAR}</strong>. Tu vas
                    bientôt comprendre pourquoi tout ça n&apos;avait aucun sens…
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        <section className="pillars">
          <div className="section-title">
            <span className="eyebrow">Valeurs</span>
            <h2>Les trois piliers</h2>
          </div>
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
                <div className="expand-indicator">
                  {isExpanded ? "−" : "+"}
                </div>
              </div>
            );
          })}
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
    </>
  );
}

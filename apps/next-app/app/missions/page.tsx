import { missions, resources } from "../data/nirdData";

export default function MissionsPage() {
  return (
    <div>
      <div className="section-title">
        <span className="eyebrow">Contributions</span>
        <h1>Missions communautaires</h1>
      </div>
      <p className="muted">
        Idées d'actions à mener dans / hors de la communauté, présentées comme
        des missions à impact. Basé sur les invites officielles du site NIRD
        (reconditionner, rejoindre Tchap, partager des témoignages).
      </p>

      <div className="grid">
        {missions.map((mission) => (
          <div key={mission.title} className="card">
            <div className="quest-meta">
              <span className="badge">{mission.impact}</span>
              {mission.link ? (
                <a
                  className="tag"
                  href={mission.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ressource
                </a>
              ) : null}
            </div>
            <h3>{mission.title}</h3>
            <p className="muted">{mission.description}</p>
            <ul>
              {mission.checklist.map((item) => (
                <li key={item} className="muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider"></div>
      <div className="resources">
        <div className="section-title">
          <span className="eyebrow">Soutiens</span>
          <h2>Rester en lien</h2>
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
                Ouvrir →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

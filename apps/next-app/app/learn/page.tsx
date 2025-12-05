import { pillars, journey } from "../data/nirdData";

export default function LearnPage() {
  return (
    <div>
      <div className="section-title">
        <span className="eyebrow">Explications pedagogiques</span>
        <h1>Pourquoi la demarche NIRD</h1>
      </div>
      <p className="muted">
        S'appuyer sur la fin du support Windows 10 pour faire un choix de
        souverainete : Linux comme socle libre, pour un numerique Inclusif,
        Responsable et Durable dans les etablissements scolaires. Contenus réels
        du site NIRD.
      </p>

      <div className="grid">
        <div className="card">
          <div className="badge">Origine</div>
          <h3>Un collectif enseignant</h3>
          <p className="muted">
            Initiative spontanee issue de la forge des communs numeriques
            educatifs. Objectif : reduire la dependance, embarquer les
            collectifs avec un sentiment d urgence.
          </p>
        </div>
        <div className="card">
          <div className="badge">Socle</div>
          <h3>Choix Linux</h3>
          <p className="muted">
            Adoption graduee d un OS libre (PrimTux ou distribution signee NIRD)
            pour reequiper le parc, ouvrir le champ pedagogique et maitriser les
            couts.
          </p>
        </div>
        <div className="card">
          <div className="badge">Impact</div>
          <h3>Reconditionnement</h3>
          <p className="muted">
            Lutte contre l obsolescence via des projets eleves : reemploi du
            parc, livraison a des ecoles voisines, diffusion des savoir-faire.
          </p>
        </div>
      </div>

      <div className="divider"></div>
      <div className="section-title">
        <span className="eyebrow">Piliers</span>
        <h2>Inclusion . Responsabilite . Durabilite</h2>
      </div>
      <div className="grid">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="card">
            <h3>{pillar.title}</h3>
            <p className="muted">{pillar.description}</p>
            <ul>
              {pillar.actions.map((action) => (
                <li key={action} className="muted">
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider"></div>
      <div className="section-title">
        <span className="eyebrow">Jalons</span>
        <h2>Construire la trajectoire</h2>
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
      <div className="divider"></div>
    </div>
  );
}

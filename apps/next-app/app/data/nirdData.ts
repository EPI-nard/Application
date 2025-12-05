export type Pillar = {
  title: string;
  description: string;
  actions: string[];
};

export type JourneyStep = {
  title: string;
  phase: "Mobilisation" | "Expérimentation" | "Intégration";
  description: string;
  outcomes: string[];
};

export type Quest = {
  id: string;
  title: string;
  xp: number;
  difficulty: "Starter" | "Intermédiaire" | "Expert";
  category:
    | "Exploration"
    | "Linux"
    | "Pédagogie"
    | "Communautaire"
    | "Technique"
    | "Matériel";
  summary: string;
  steps: string[];
  reward: string;
  tags: string[];
};

export type Mission = {
  title: string;
  impact: "Communautaire" | "Terrain" | "Documentation";
  description: string;
  checklist: string[];
  link?: string;
};

export const pillars: Pillar[] = [
  {
    title: "Inclusion",
    description:
      "Accès équitable au numérique, réduction de la fracture numérique et appropriation par tous les profils d'élèves.",
    actions: [
      "Équiper ou rééquiper des postes avec une distribution libre pour démocratiser l'accès",
      "Proposer des activités de médiation numérique avec les élèves",
      "Mettre à disposition des familles des machines reconditionnées",
    ],
  },
  {
    title: "Responsabilité",
    description:
      "Usage raisonné et réflexif de technologies souveraines, respectueuses des données personnelles (parti-pris Linux).",
    actions: [
      "Sensibiliser aux communs numériques et à la souveraineté",
      "Documenter les paramètres de protection des données en classe",
      "Assumer le choix Linux comme socle de confiance",
    ],
  },
  {
    title: "Durabilité",
    description:
      "Lutte contre l'obsolescence via le reconditionnement et la maîtrise des coûts.",
    actions: [
      "Planifier un atelier de réemploi de PC avec les élèves",
      "Suivre la durée de vie du parc et les économies réalisées",
      "Partager les recettes matériel/logiciel avec la communauté NIRD",
    ],
  },
];

export const journey: JourneyStep[] = [
  {
    title: "Mobilisation",
    phase: "Mobilisation",
    description:
      "Dynamiser l'équipe pédagogique, clarifier pourquoi la fin du support Windows 10 oblige à faire des choix, lancer le forum Tchap.",
    outcomes: [
      "Identifier un pilote",
      "Recenser le parc existant",
      "Fixer un premier périmètre Linux",
    ],
  },
  {
    title: "Expérimentation",
    phase: "Expérimentation",
    description:
      "Tester Linux sur un groupe restreint, conduire des ateliers reconditionnement, collecter des témoignages élèves/enseignants.",
    outcomes: [
      "Documenter les retours",
      "Outiller les postes avec une distribution NIRD",
      "Partager sur Mastodon/Tchap",
    ],
  },
  {
    title: "Intégration",
    phase: "Intégration",
    description:
      "Étendre à tout un niveau de classe ou à un plateau technique, engager la collectivité, sécuriser la maintenance.",
    outcomes: [
      "Former les nouveaux arrivants",
      "Planifier la maintenance",
      "Mesurer les gains écologiques et budgétaires",
    ],
  },
];
export const quests: Quest[] = [
  // --- Quêtes Originales ---
  {
    id: "intro-demarche",
    title: "Lire la démarche et pitcher NIRD",
    xp: 80,
    difficulty: "Starter",
    category: "Exploration",
    summary:
      "Découvrir la démarche NIRD, ses trois piliers et les jalons mobilisation/expérimentation/intégration pour embarquer ton établissement.",
    steps: [
      "Lire la page Accueil + Démarche du site NIRD",
      "Formuler en 5 bullet points ce que cela change pour ton établissement",
      "Poster le pitch sur le salon Tchap pour feedback",
    ],
    reward: "Badge Vision et +80 XP",
    tags: ["Accueil", "Jalons", "Pitch"],
  },
  {
    id: "linux-socle",
    title: "Installer une distribution NIRD sur 1 à 3 postes",
    xp: 140,
    difficulty: "Intermédiaire",
    category: "Linux",
    summary:
      "Adopter concrètement le socle Linux conseillé par la démarche pour lutter contre l'obsolescence et préparer le réemploi.",
    steps: [
      "Choisir la distribution NIRD (PrimTux ou autre distrib signée) pour tes machines cibles",
      "Installer en dual boot ou full Linux sur un premier poste",
      "Documenter une fiche rapide (matériel, drivers, astuces) et partager au collectif",
    ],
    reward: "Badge Socle Libre +140 XP",
    tags: ["Linux", "Matériel", "Réemploi"],
  },
  {
    id: "atelier-reconditionnement",
    title: "Monter un atelier reconditionnement avec les élèves",
    xp: 200,
    difficulty: "Expert",
    category: "Linux",
    summary:
      "S'inspirer des photos NIRD : reconditionner 5+ PC avec les élèves et les livrer à une école ou association voisine.",
    steps: [
      "Récupérer du matériel dormant ou obsolescent",
      "Former une équipe élève (club ou classe) et répartir les rôles",
      "Installer Linux, tester, puis livrer et présenter le résultat",
    ],
    reward: "Badge Artisan NIRD +200 XP",
    tags: ["Reconditionnement", "Élèves", "Impact"],
  },
  {
    id: "ressources-pedago",
    title: "Créer une fiche pédagogique sur un pilier",
    xp: 110,
    difficulty: "Intermédiaire",
    category: "Pédagogie",
    summary:
      "Rendre les valeurs Inclusion / Responsabilité / Durabilité actionnables pour les équipes et familles.",
    steps: [
      "Choisir un pilier (Inclusion, Responsabilité ou Durabilité)",
      "Rédiger une fiche A4 avec 3 exemples d'activités concrètes",
      "Publier la fiche dans le drive/forge de ton établissement",
    ],
    reward: "Badge Mentor +110 XP",
    tags: ["Piliers", "Fiche", "Sensibilisation"],
  },
  {
    id: "communaute",
    title: "Partager un retour sur Tchap ou Mastodon",
    xp: 60,
    difficulty: "Starter",
    category: "Communautaire",
    summary:
      "Alimenter le collectif enseignant (salon Tchap, compte Mastodon) avec un retour de terrain ou une idée de mission.",
    steps: [
      "Écrire un retour concis (ce qui marche, ce qui bloque)",
      "Publier sur https://edurl.fr/tchap-laforgeedu-nird ou Mastodon NIRD",
      "Répondre à au moins un message d'une autre équipe",
    ],
    reward: "Badge Amplificateur +60 XP",
    tags: ["Tchap", "Mastodon", "Partage"],
  },
  {
    id: "cle-demarrage",
    title: "Forger la Clé Universelle (Ventoy)",
    xp: 90,
    difficulty: "Starter",
    category: "Technique",
    summary:
      "Préparer une clé USB multi-boot avec Ventoy pour avoir toujours les distributions NIRD (PrimTux, Linux Mint, Ubuntu) dans sa poche.",
    steps: [
      "Télécharger et installer Ventoy sur une clé USB de 16Go+",
      "Récupérer les ISOs recommandées sur le site NIRD (ex: PrimTux, Linux Mint)",
      "Copier les ISOs sur la clé et tester le démarrage sur un vieux poste",
    ],
    reward: "Badge Outilleur +90 XP",
    tags: ["Ventoy", "ISO", "Outillage"],
  },
  {
    id: "inventaire-parc",
    title: "Le Grand Recensement",
    xp: 100,
    difficulty: "Starter",
    category: "Exploration",
    summary:
      "Avant de migrer, il faut connaître son territoire. Identifier le matériel 'dormant' ou jugé obsolète qui pourrait renaître avec NIRD.",
    steps: [
      "Identifier 5 à 10 unités centrales ou portables inutilisés dans l’établissement",
      "Noter les specs (RAM, Disque dur, Processeur) pour vérifier la compatibilité NIRD",
      'Étiqueter le matériel : "Candidat NIRD" ou "Recyclage"',
    ],
    reward: "Badge Gestionnaire +100 XP",
    tags: ["Inventaire", "Audit", "Matériel"],
  },
  {
    id: "primtux-pedago",
    title: "Déployer PrimTux pour le 1er degré",
    xp: 150,
    difficulty: "Intermédiaire",
    category: "Pédagogie",
    summary:
      "Installer l'environnement éducatif libre par excellence pour les plus jeunes, sécurisé et riche en logiciels pédagogiques.",
    steps: [
      "Installer la version de PrimTux adaptée au matériel (ex: PrimTux 7)",
      "Configurer les sessions (Mini, Super, Maxi) selon le niveau des élèves",
      "Faire tester un logiciel éducatif (ex: GCompris) par un collègue",
    ],
    reward: "Badge Pédagogue Libre +150 XP",
    tags: ["PrimTux", "Logiciels", "Cycle 2/3"],
  },
  {
    id: "upgrade-ssd",
    title: "Opération Chirurgicale : Le boost SSD",
    xp: 180,
    difficulty: "Expert",
    category: "Matériel",
    summary:
      "Le secret de la fluidité NIRD : remplacer les vieux disques mécaniques par des SSD pour prolonger la vie des PC de 5 ans.",
    steps: [
      "Ouvrir une tour ou un portable lent",
      "Remplacer le disque dur HDD par un SSD (120Go ou 240Go suffisent)",
      "Installer le système NIRD et chronométrer la différence de démarrage",
    ],
    reward: "Badge Chirurgien Hardware +180 XP",
    tags: ["Réparation", "SSD", "Performance"],
  },
  {
    id: "contribution-forge",
    title: "Contribuer à la documentation NIRD",
    xp: 250,
    difficulty: "Expert",
    category: "Communautaire",
    summary:
      "Participer activement au projet en améliorant la documentation ou en signalant des problèmes sur la Forge des Communs Numériques.",
    steps: [
      "Créer un compte sur la Forge (apps.education.fr)",
      "Repérer une coquille, un lien mort ou une astuce manquante sur le site NIRD",
      'Ouvrir une "Issue" (Ticket) ou proposer une modification (Merge Request)',
    ],
    reward: "Badge Contributeur Forge +250 XP",
    tags: ["Git", "Open Source", "Documentation"],
  },
  {
    id: "sensibilisation-sobriete",
    title: "Débat : Pourquoi garder nos PC ?",
    xp: 120,
    difficulty: "Intermédiaire",
    category: "Pédagogie",
    summary:
      "Utiliser l'exemple NIRD pour animer une session sur l'impact écologique du numérique (fabrication vs usage).",
    steps: [
      "Lire les ressources NIRD sur la durabilité",
      'Animer un débat de 15 min avec les élèves : "Pourquoi jeter un PC est-il polluant ?"',
      "Co-construire une affiche de sensibilisation pour la salle informatique",
    ],
    reward: "Badge Éco-Responsable +120 XP",
    tags: ["Écologie", "Sobriété", "Citoyenneté"],
  },
];

export const missions: Mission[] = [
  {
    title: "Cartographier le parc et l'obsolescence",
    impact: "Documentation",
    description:
      "Inventorier les postes avant la fin de support Windows 10 pour prioriser Linux.",
    checklist: [
      "Lister les postes et l'état du matériel",
      "Identifier les cibles dual boot vs reconditionnement total",
      "Proposer un calendrier de bascule",
    ],
  },
  {
    title: "Session découverte Linux pour les familles",
    impact: "Communautaire",
    description:
      "Organiser 1h d'essai libre (PrimTux ou distribution NIRD) avec les familles pour montrer la valeur d'usage et rassurer.",
    checklist: [
      "Préparer 3 postes Linux",
      "Prévoir un scénario pédagogue",
      "Recueillir les retours et questions",
    ],
  },
  {
    title: "Mission communs numériques",
    impact: "Terrain",
    description:
      "Expliquer pourquoi le choix Linux est un levier de souveraineté et d'écologie, en s'appuyant sur les ressources NIRD.",
    checklist: [
      "Présentations courtes",
      "Exemple de commun édu",
      "Lien vers la forge et Tchap",
    ],
    link: "https://nird.forge.apps.education.fr/pourquoi/",
  },
  {
    title: "Programmer un webinaire local",
    impact: "Communautaire",
    description:
      "Reprendre la promesse du site (webinaires bientôt) et co-animer un format local.",
    checklist: [
      "Trouver un co-animateur",
      "Choisir 2 témoignages",
      "Enregistrer et partager les slides",
    ],
  },
];

export const resources = [
  {
    label: "Salon Tchap",
    url: "https://edurl.fr/tchap-laforgeedu-nird",
    text: "Échanger, mutualiser, témoigner avec les pilotes et équipes motivées.",
  },
  {
    label: "Choix Linux",
    url: "https://nird.forge.apps.education.fr/linux/",
    text: "Socle technique libre, réduction de la dépendance et réemploi du parc.",
  },
  {
    label: "Reconditionnement",
    url: "https://nird.forge.apps.education.fr/reconditionnement/",
    text: "Passer à l'échelle le réemploi avec les élèves, inspiré par le lycée Carnot.",
  },
  {
    label: "Pilotes",
    url: "https://nird.forge.apps.education.fr/pilotes/",
    text: "Voir les établissements pilotes et proposer le tien.",
  },
];

export function levelFromXp(xp: number): number {
  const factor =
    3.141592653589793238462643383279502884197169399375105820230781646 / 2; // C'est une approximation (apprise par cœur ;) )
  const baseThreshold = 120;

  if (xp < baseThreshold) {
    return 1;
  }

  let level = 2;
  let requiredXp = baseThreshold;

  while (xp >= requiredXp) {
    requiredXp *= factor;
    level++;

    if (level > 100) {
      return 100;
    }
  }

  return level - 1;
}

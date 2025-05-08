import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const jobs = {
    offers: [
      {
        id: 1,
        title: "Ingénieur en cybersécurité",
        company: "Sonatrach",
        location: "Alger",
        salary: "120 000 - 150 000 DZD/mois",
        experience: "0-2 ans",
        description:
          "Nous recherchons un ingénieur en cybersécurité pour rejoindre notre équipe. Vous serez responsable de la sécurisation de nos infrastructures et de la mise en place de solutions de protection.",
        skills: ["Cybersécurité", "SIEM", "Pentest"],
        contractType: {
          text: "CDI",
          color: "green",
        },
      },
      {
        id: 2,
        title: "Data Scientist",
        company: "Djezzy",
        location: "Alger",
        salary: "130 000 - 160 000 DZD/mois",
        experience: "0-2 ans",
        description:
          "Rejoignez notre équipe d'analyse de données pour développer des modèles prédictifs et extraire des insights à partir de nos données clients et réseau.",
        skills: ["Python", "Machine Learning", "Big Data"],
        contractType: {
          text: "CDI",
          color: "green",
        },
      },
      {
        id: 3,
        title: "Développeur Full Stack",
        company: "Ooredoo",
        location: "Oran",
        salary: "110 000 - 140 000 DZD/mois",
        experience: "0-2 ans",
        description:
          "Développement d'applications web et mobiles pour nos services clients. Vous travaillerez sur des projets innovants avec des technologies modernes.",
        skills: ["React", "Node.js", "MongoDB"],
        contractType: {
          text: "CDD - 1 an",
          color: "blue",
        },
      },
      {
        id: 4,
        title: "Ingénieur DevSecOps",
        company: "Algérie Télécom",
        location: "Constantine",
        salary: "125 000 - 155 000 DZD/mois",
        experience: "0-3 ans",
        description:
          "Intégration des pratiques de sécurité dans notre pipeline CI/CD. Vous serez responsable d'automatiser les tests de sécurité et d'améliorer nos processus de déploiement.",
        skills: ["Docker", "Kubernetes", "CI/CD"],
        contractType: {
          text: "CDI",
          color: "green",
        },
      },
    ],
    theses: [
      {
        id: 1,
        title: "Détection d'intrusion basée sur l'apprentissage profond",
        supervisor: "Dr. BERBAGUE Chemseddine",
        institution: "ESTIN",
        field: "Cybersécurité",
        description:
          "Ce sujet de thèse vise à développer de nouvelles approches de détection d'intrusion dans les réseaux informatiques en utilisant des techniques d'apprentissage profond. L'objectif est d'améliorer la précision et la rapidité de détection des attaques tout en réduisant les faux positifs.",
        keywords: ["Deep Learning", "IDS", "Sécurité réseau", "Analyse de trafic"],
      },
      {
        id: 2,
        title: "Analyse de malwares par techniques d'IA",
        supervisor: "Dr. ALKAMA Lynda",
        institution: "ESTIN",
        field: "Cybersécurité",
        description:
          "Cette thèse propose d'explorer l'utilisation de l'intelligence artificielle pour l'analyse automatique de malwares. Les techniques d'apprentissage automatique seront utilisées pour classifier et prédire le comportement des logiciels malveillants.",
        keywords: ["Malware", "Intelligence artificielle", "Classification", "Reverse engineering"],
      },
      {
        id: 3,
        title: "Optimisation des modèles de deep learning pour l'IoT",
        supervisor: "Dr. AZOUAOU Faical",
        institution: "ESTIN",
        field: "IA et Data Science",
        description:
          "Ce sujet de recherche se concentre sur l'optimisation des modèles d'apprentissage profond pour les déployer sur des appareils IoT à ressources limitées. L'objectif est de réduire la taille et la complexité des modèles tout en maintenant leurs performances.",
        keywords: ["IoT", "Deep Learning", "Optimisation", "Edge Computing"],
      },
    ],
    projects: [
      {
        id: 1,
        title: "Sécurité des infrastructures critiques",
        supervisor: "Dr. BERBAGUE Chemseddine",
        collaboration: "Sonatrach",
        status: {
          text: "En cours",
          color: "purple",
        },
        description:
          "Ce projet de recherche vise à développer des solutions de sécurité pour les infrastructures critiques du secteur énergétique. Il comprend l'analyse des menaces, la modélisation des attaques et la conception de mécanismes de protection adaptés.",
        opportunities: [
          "Stages de fin d'études",
          "Projets de master",
          "Participation à des publications scientifiques",
        ],
      },
      {
        id: 2,
        title: "Analyse de données massives pour la détection de fraudes",
        supervisor: "Dr. ALKAMA Lynda",
        collaboration: "Algérie Télécom",
        status: {
          text: "En cours",
          color: "purple",
        },
        description:
          "Ce projet explore l'utilisation de techniques d'analyse de données massives pour détecter les fraudes dans les services de télécommunication. Il implique le développement d'algorithmes d'apprentissage automatique pour identifier les comportements suspects.",
        opportunities: ["Stages de fin d'études", "Projets de master", "Bourses de recherche"],
      },
      {
        id: 3,
        title: "Développement d'une plateforme d'apprentissage en ligne sécurisée",
        supervisor: "Dr. AZOUAOU Faical",
        collaboration: "Projet interne ESTIN",
        status: {
          text: "Nouveau",
          color: "green",
        },
        description:
          "Ce projet vise à développer une plateforme d'apprentissage en ligne sécurisée pour l'ESTIN. Il comprend la conception de l'architecture, le développement des fonctionnalités et l'implémentation de mesures de sécurité avancées.",
        opportunities: ["Projets de fin d'études", "Stages internes", "Développement de compétences pratiques"],
      },
    ],
  }

  return NextResponse.json(jobs)
}

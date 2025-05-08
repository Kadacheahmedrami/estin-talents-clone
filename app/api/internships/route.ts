import { NextResponse } from "next/server"

export async function GET() {
  // Simulating a delay to show loading states
  await new Promise((resolve) => setTimeout(resolve, 500))

  const internships = {
    offers: [
      {
        id: 1,
        title: "Analyste en cybersécurité",
        company: "Sonatrach",
        location: "Alger",
        duration: "6 mois",
        compensation: "30 000 DZD/mois",
        description:
          "Stage de fin d'études pour participer à l'analyse des vulnérabilités et à la mise en place de solutions de sécurité pour les infrastructures critiques.",
        badge: {
          text: "Nouveau",
          color: "green",
        },
      },
      {
        id: 2,
        title: "Pentester junior",
        company: "Algérie Télécom",
        location: "Constantine",
        duration: "5 mois",
        compensation: "25 000 DZD/mois",
        description:
          "Réalisation de tests d'intrusion sur les applications web et mobiles de l'entreprise. Identification des vulnérabilités et proposition de solutions.",
        badge: {
          text: "Populaire",
          color: "blue",
        },
      },
      {
        id: 3,
        title: "Développeur sécurité",
        company: "Djezzy",
        location: "Alger",
        duration: "6 mois",
        compensation: "28 000 DZD/mois",
        description:
          "Développement d'outils de sécurité internes et intégration de bonnes pratiques de sécurité dans le cycle de développement des applications.",
        badge: null,
      },
      {
        id: 4,
        title: "Analyste SOC",
        company: "Ooredoo",
        location: "Oran",
        duration: "6 mois",
        compensation: "30 000 DZD/mois",
        description:
          "Surveillance et analyse des alertes de sécurité au sein du centre opérationnel de sécurité. Participation à la détection et à la réponse aux incidents.",
        badge: null,
      },
    ],
    applications: [
      {
        id: 1,
        title: "Analyste en cybersécurité",
        company: "Sonatrach",
        location: "Alger",
        applicationDate: "10 avril 2024",
        startDate: "1 juin 2024",
        endDate: "30 novembre 2024",
        status: {
          text: "Acceptée",
          color: "green",
        },
      },
      {
        id: 2,
        title: "Pentester junior",
        company: "Algérie Télécom",
        location: "Constantine",
        applicationDate: "15 avril 2024",
        startDate: "1 juillet 2024",
        endDate: "30 novembre 2024",
        status: {
          text: "En attente",
          color: "yellow",
        },
      },
      {
        id: 3,
        title: "Ingénieur sécurité réseau",
        company: "Mobilis",
        location: "Alger",
        applicationDate: "5 mars 2024",
        responseDate: "20 mars 2024",
        reason: "Profil ne correspondant pas aux besoins",
        status: {
          text: "Refusée",
          color: "red",
        },
      },
    ],
    documents: [
      {
        id: 1,
        title: "Guide du stage de fin d'études",
        type: "PDF",
        size: "1.2 MB",
        description: "Guide complet expliquant le déroulement du stage, les attentes et les livrables.",
        url: "#",
      },
      {
        id: 2,
        title: "Modèle de convention de stage",
        type: "DOCX",
        size: "0.5 MB",
        description: "Document à remplir et à faire signer par l'entreprise d'accueil et l'école.",
        url: "#",
      },
      {
        id: 3,
        title: "Modèle de rapport de stage",
        type: "DOCX",
        size: "0.8 MB",
        description: "Template pour la rédaction du rapport de stage avec consignes et exemples.",
        url: "#",
      },
      {
        id: 4,
        title: "Grille d'évaluation",
        type: "PDF",
        size: "0.3 MB",
        description: "Critères d'évaluation utilisés par les encadrants pour noter le stage.",
        url: "#",
      },
    ],
    calendar: [
      {
        id: 1,
        date: "15 février",
        title: "Ouverture des candidatures",
        description: "Début de la publication des offres de stage",
      },
      {
        id: 2,
        date: "30 avril",
        title: "Clôture des candidatures",
        description: "Date limite pour postuler aux offres",
      },
      {
        id: 3,
        date: "1 juin",
        title: "Début des stages",
        description: "Début de la période de stage",
      },
      {
        id: 4,
        date: "15 novembre",
        title: "Remise des rapports",
        description: "Date limite pour soumettre le rapport de stage",
      },
      {
        id: 5,
        date: "1-15 décembre",
        title: "Soutenances",
        description: "Période des présentations orales",
      },
    ],
  }

  return NextResponse.json(internships)
}

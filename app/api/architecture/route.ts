import { NextResponse } from "next/server"

export async function GET() {
  const architectureData = {
    image: "/images/architecture-etudes.png",
    sections: [
      {
        title: "Cycle préparatoire (2 ans)",
        description:
          "Le cycle préparatoire s'étend sur deux années (4 semestres) et permet aux étudiants d'acquérir les bases fondamentales en informatique, mathématiques et sciences de l'ingénieur. À l'issue de ce cycle, les étudiants passent un concours pour accéder au cycle ingénieur.",
        items: ["1ère année CP : Cours + TD/TP + Stage ouvrier", "2ème année CP : Cours + TD/TP"],
      },
      {
        title: "Cycle ingénieur (3 ans)",
        description:
          "Le cycle ingénieur s'étend sur trois années (6 semestres) et comprend un tronc commun suivi d'une spécialisation. Les étudiants choisissent leur spécialisation en fonction de leurs résultats et de leurs préférences.",
        items: [
          "1ère année (socle commun) : Cours + Stage en entreprise",
          "2ème année + première mi-3ème année (spécialisation) : Cours spécialisés en Intelligence artificielle et data science ou Cybersécurité",
          "Fin de 3ème année (spécialisation) : Projet de fin d'études",
        ],
      },
    ],
    specializations: [
      {
        title: "Intelligence artificielle et data science",
        description:
          "Cette spécialisation forme des ingénieurs experts en intelligence artificielle, machine learning, traitement de données massives et analyse prédictive.",
      },
      {
        title: "Cybersécurité",
        description:
          "Cette spécialisation forme des ingénieurs experts en sécurité informatique, cryptographie, protection des infrastructures et audit de sécurité.",
      },
    ],
  }

  return NextResponse.json(architectureData)
}

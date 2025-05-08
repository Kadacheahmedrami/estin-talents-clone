import { NextResponse } from "next/server"

export async function GET() {
  const homeData = {
    about: {
      title: "À propos de l'ESTIN",
      description:
        "L'École Supérieure en Sciences et Technologies de l'Informatique et du Numérique (ESTIN) est un établissement d'enseignement supérieur dédié à la formation d'ingénieurs hautement qualifiés dans les domaines de l'informatique et du numérique.",
      buttonText: "Découvrir nos programmes",
      buttonLink: "/programmes",
    },
    talents: {
      title: "ESTIN Talents",
      description:
        "ESTIN Talents est une plateforme dédiée aux étudiants, enseignants et partenaires de l'ESTIN. Elle permet de suivre les compétences développées, consulter les programmes et faciliter les échanges entre tous les acteurs de l'écosystème ESTIN.",
      buttonText: "Se connecter",
      buttonLink: "/connexion",
    },
    specializations: [
      {
        title: "Intelligence artificielle et data science",
        description: "Formation avancée en IA, machine learning, traitement de données massives et analyse prédictive.",
        icon: "brain-circuit",
      },
      {
        title: "Cybersécurité",
        description:
          "Formation spécialisée en sécurité des systèmes d'information, cryptographie, et protection des infrastructures numériques.",
        icon: "shield-lock",
      },
    ],
    stats: {
      students: 850,
      professors: 65,
      partners: 42,
      graduationRate: 98,
    },
  }

  return NextResponse.json(homeData)
}
